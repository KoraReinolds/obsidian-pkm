import { ALog } from './model'
import type { TTimeLog } from './types'
import type { AEntity } from '@/entities/entity'

export class TimeLog extends ALog {
  _timeRegex = /#time\/(\d{2})\/(\d{2})/

  async parse(
    entity: AEntity,
    data: string
  ): Promise<TTimeLog> {
    const timeMatch = data.match(this._timeRegex)
    if (timeMatch)
      return {
        hh: parseInt(timeMatch[1]),
        mm: parseInt(timeMatch[2])
      }
    throw new Error("Can't parse time at " + data)
  }

  displayWithParams(params: TTimeLog): string {
    return `#time/${params.hh}/${params.mm}`
  }

  async display(): Promise<string> {
    const templateFile =
      this.app.vault.getAbstractFileByPath(
        'Templates/Time.md'
      )
    const activeFile = await this.pkm.getActiveFile()
    const config =
      this.pkm.tp.templater.create_running_config(
        templateFile,
        activeFile,
        0
      )
    return await this.pkm.tp.templater.read_and_parse_template(
      config
    )
  }
}

export class EndTimeLog extends TimeLog {
  _timeRegex = /#time\/(\d{2})\/(\d{2})(?!.*#time\/)/
}
