import type { TFile } from 'obsidian'
import { ALog } from './model'

export class LinkLog extends ALog<{ file: TFile }> {
  async parse(data: string): Promise<{ file: TFile }> {
    const linkRegex = /\[\[(.*?)\]\]/g
    const fileName = data.match(linkRegex)?.[0].slice(2, -2)
    if (!fileName) throw new Error('Wrong link format')
    return {
      file: await this.pkm.getFileByPath(
        `${this.folderPath}/${fileName}.md`
      )
    }
  }
  async display(): Promise<string> {
    return `[[${(await this.pkm.suggestFileByPath(this.folderPath)).basename}]]`
  }
}
