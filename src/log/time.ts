import { ALog } from './model'
import type { TTimeLog } from './types'

export class TimeLog extends ALog {
  async parse(data: string): Promise<TTimeLog> {
    const timeRegex = /#time\/(\d{2})\/(\d{2})/
    const timeMatch = data.match(timeRegex)
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
