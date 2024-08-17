import type { TExtendedApp } from '@/types'
import type { TFile } from 'obsidian'

const taskNote = async (app: TExtendedApp, dv: any) => {
  const regex =
    /⚡ \[\[(.+?)\]\] (#status\/\S+)(( #time\/\S+)+)/

  const files = dv
    .pages('"Journal/Daily"')
    .groupBy(({ file }: { file: TFile }) => file.name)

  function calculateTimeDifference(tag1, tag2) {
    function parseTag(tag) {
      if (!tag) return { hours: 0, minutes: 0 }
      const [hours, minutes] = tag
        .split('/')
        .slice(1)
        .map(Number)
      return { hours, minutes }
    }

    const time1 = parseTag(tag1)
    const time2 = parseTag(tag2)

    const totalMinutes1 = time1.hours * 60 + time1.minutes
    const totalMinutes2 = time2.hours * 60 + time2.minutes

    const difference = Math.abs(
      totalMinutes2 - totalMinutes1
    )

    return difference
  }

  function convertMinutesToHHMM(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const fileName = dv.currentFilePath.split('/')[1]
  const totalTime = 0
  console.log(
    files.map((file: any) => [
      file.key,
      [...file.rows.log].filter((t) => t[0] === `⚡`)
      // .map((log) => log.match(regex).slice(1, 4))
      // .filter(([name]) => name + '.md' === fileName)
    ])
  )
  //   .filter(([name, logs]) => logs.length)
  //   .forEach(([date, logs]) => {
  //     const rows = []
  //     dv.el('h2', date)
  //     const timeStart = totalTime
  //     logs.forEach(([_, status, time]) => {
  //       let [tagStart, tagEnd] = time.split(' ').slice(1)
  //       if (!tagEnd) tagEnd = tagStart
  //       rows.push([status, tagStart, tagEnd])
  //       totalTime += calculateTimeDifference(
  //         tagStart,
  //         tagEnd
  //       )
  //     })
  //     dv.table(['status', 'time-start', 'time-end'], rows)
  //     dv.el(
  //       'h3',
  //       convertMinutesToHHMM(totalTime - timeStart)
  //     )
  //   })
  // dv.el('h2', convertMinutesToHHMM(totalTime))
}

export { taskNote }
