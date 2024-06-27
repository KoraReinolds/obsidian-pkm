import { ALog } from './model'

export class TimeLog extends ALog {
  async display(): Promise<string> {
    const templateFile = app.vault.getAbstractFileByPath(
      'Templates/Time.md'
    )
    const activeFile = app.workspace.getActiveFile()
    const config = this.tp.templater.create_running_config(
      templateFile,
      activeFile,
      0
    )
    return await this.tp.templater.read_and_parse_template(
      config
    )
  }
}
