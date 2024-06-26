import type { TExtendedApp } from '@/types'
import { ALog } from './model'

export class TimeLog extends ALog {
  async display(app: TExtendedApp): Promise<string> {
    const templateFile = app.vault.getAbstractFileByPath(
      'Templates/Time.md'
    )
    const activeFile = app.workspace.getActiveFile()
    const tp = app.plugins?.plugins['templater-obsidian']
    const config = tp.templater.create_running_config(
      templateFile,
      activeFile,
      0
    )
    return await tp.templater.read_and_parse_template(
      config
    )
  }
}
