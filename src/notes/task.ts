import type { TExtendedApp } from '@/types'
import type { TTimeLog } from '@/log/types'
import type { TWorkData } from '@/entities/work'

const taskNote = async (app: TExtendedApp, dv: any) => {
  const pkm =
    app.plugins?.plugins['obsidian-daily-first-pkm']
  if (!pkm) throw new Error('Pkm plugin is required')

  const calculateTimeDifference = (time: TTimeLog) => {
    const totalMinutes1 = time.start.hh * 60 + time.start.mm
    const totalMinutes2 = time.end.hh * 60 + time.end.mm

    const difference = Math.abs(
      totalMinutes2 - totalMinutes1
    )

    return difference
  }

  const entity = pkm.work.instance

  const extractLogBlock = (
    content: string
  ): string | null => {
    const logRegex =
      />\[! log\]- Log([\s\S]*?)(?=>\[!|\z)/gm // ищет блок Log до следующего блока или до конца файла
    const match = logRegex.exec(content)

    if (match) {
      return match[1].trim() // возвращает содержимое блока Log
    }

    return null
  }

  const extractLogEntries = (
    logBlock: string
  ): string[] => {
    const logEntries = logBlock
      .split('\n')
      .filter((line) => line.trim().startsWith('>>'))

    return logEntries.map((entry) =>
      entry.replace(/^>>\s*/, '').trim()
    )
  }

  const currentFile = await pkm.getActiveFile()

  const content: { name: string; logs: TWorkData[] }[] = []

  for await (const file of dv.pages('"Journal/Daily"')
    .file) {
    const f = await pkm.getFileByPath(file.path)
    if (f) {
      const c = await app.vault.read(f)
      const block = extractLogBlock(c)
      if (!block) return
      const logs = extractLogEntries(block)
      content.push({
        name: f.basename,
        logs: await entity.parseLogs(entity, logs)
      })
    }
  }

  const logData = content
    .map((data) => {
      return data.logs.map((logData) => ({
        ...logData,
        name: data.name
      }))
    })
    .flat()
    .filter((data) => data.link)

  const convertMinutesToHHMM = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const file = await pkm.getActiveFile()

  let totalTime = 0

  const statuses: Record<
    string,
    (TWorkData & { name: string })[]
  > = {}
  Object.values(
    logData.filter((data) => {
      return data.link.basename === file.basename
    })
  ).forEach((data) => {
    if (statuses[data.status])
      statuses[data.status].push(data)
    else statuses[data.status] = [data]
  })
  Object.entries(statuses).forEach(([status, data]) => {
    const rows: any[] = []
    dv.el('h2', status)
    const time = totalTime
    data.forEach((item) => {
      console.log(item)
      rows.push([
        convertMinutesToHHMM(
          item.time.start.hh * 60 + item.time.start.mm
        ),
        convertMinutesToHHMM(
          item.time.end.hh * 60 + item.time.end.mm
        ),
        `[[${item.name}]]`
      ])
      totalTime += calculateTimeDifference(item.time)
    })
    dv.table(['time-start', 'time-end', 'day'], rows)
    dv.el(
      'h3',
      `${status} time: ${convertMinutesToHHMM(totalTime - time)}`
    )
  })
  dv.el(
    'h2',
    `TOTAL time: ${convertMinutesToHHMM(totalTime)}`
  )
}

export { taskNote }
