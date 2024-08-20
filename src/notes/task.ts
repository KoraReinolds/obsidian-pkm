import type { TExtendedApp } from '@/types'
import type { TTimeLog } from '@/log/types'

const taskNote = async (app: TExtendedApp, dv: any) => {
  const pkm =
    app.plugins?.plugins['obsidian-daily-first-pkm']
  if (!pkm) throw new Error('Pkm plugin is required')

  const calculateTimeDifference = (
    time1: TTimeLog,
    time2: TTimeLog
  ) => {
    const totalMinutes1 = time1.hh * 60 + time1.mm
    const totalMinutes2 = time2.hh * 60 + time2.mm

    const difference = Math.abs(
      totalMinutes2 - totalMinutes1
    )

    return difference
  }

  const entity = pkm.work.instance

  const logs = [...(await dv.pages('"Journal/Daily"'))]

  const logData = (
    await Promise.all(
      logs
        .filter((data) => !!data.log)
        .map(async (data) => ({
          name: data.file.name,
          logs: await entity.parseLogs(
            entity,
            Array.isArray(data.log) ? data.log : [data.log]
          )
        }))
    )
  )
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

  Object.entries(
    logData
      .filter((data) => {
        return data.link.basename === file.basename
      })
      .groupBy((data) => data.status)
  ).forEach(([status, data]) => {
    console.log(data)
    const rows: any[] = []
    dv.el('h2', status)
    const timeStart = totalTime

    data.forEach((item) => {
      rows.push([
        convertMinutesToHHMM(
          item.timeStart.hh * 60 + item.timeStart.mm
        ),
        convertMinutesToHHMM(
          item.timeEnd.hh * 60 + item.timeEnd.mm
        ),
        `[[${item.name}]]`
      ])

      totalTime += calculateTimeDifference(
        item.timeStart,
        item.timeEnd
      )
    })
    dv.table(['time-start', 'time-end', 'day'], rows)
    dv.el(
      'h3',
      `${status} time: ${convertMinutesToHHMM(totalTime - timeStart)}`
    )
  })
  dv.el(
    'h2',
    `TOTAL time: ${convertMinutesToHHMM(totalTime)}`
  )
}

export { taskNote }
