import { ALog } from './model'
import type { TTimeLog } from './types'
import type { AEntity } from '@/entities/entity'

export class TimeLog extends ALog {
  _timeRegex = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/

  async parse(
    entity: AEntity,
    data: string
  ): Promise<TTimeLog> {
    const timeMatch = data.match(this._timeRegex)
    if (timeMatch)
      return {
        start: {
          hh: parseInt(timeMatch[1]),
          mm: parseInt(timeMatch[2])
        },
        end: {
          hh: parseInt(timeMatch[3]),
          mm: parseInt(timeMatch[4])
        }
      }
    throw new Error("Can't parse time at " + data)
  }

  displayWithParams(params: TTimeLog): string {
    return `${params.start.hh}:${params.start.mm} - ${params.end.hh}:${params.end.mm}`
  }

  async display(): Promise<string> {
    const currentTime = new Date()
    const formattedTime = currentTime.toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )
    const time = formattedTime.slice(0, 5)
    return `${time} - ${time}`
    // const templateFile =
    //   this.app.vault.getAbstractFileByPath(
    //     'Templates/Time.md'
    //   )
    // const activeFile = await this.pkm.getActiveFile()
    // const config =
    //   this.pkm.tp.templater.create_running_config(
    //     templateFile,
    //     activeFile,
    //     0
    //   )
    // return await this.pkm.tp.templater.read_and_parse_template(
    //   config
    // )
  }
}
