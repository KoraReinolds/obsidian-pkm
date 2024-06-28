import { ALog } from './model'

export class TimeLog extends ALog {
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
