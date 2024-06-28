import { ALog } from './model'

export class LinkLog extends ALog {
  async display(): Promise<string> {
    return `[[${(await this.pkm.suggestFileByPath('Food')).basename}]]`
  }
}
