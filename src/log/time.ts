import { ALog } from './model'

export class TimeLog extends ALog<{
  hh: number
  mm: number
}> {
  async parse(
    data: string
  ): Promise<{ hh: number; mm: number }> {
    const splitted = data.split('/')
    return await { hh: +splitted[1], mm: +splitted[2] }
  }
  async display(): Promise<string> {
    const templateFile =
      this.app.vault.getAbstractFileByPath(
        'Templates/Time.md'
      )
    const activeFile = this.app.workspace.getActiveFile()
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
