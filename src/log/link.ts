import type { TFile } from 'obsidian'
import { ALog } from './model'

export class LinkLog extends ALog {
  async parse(
    data: string,
    folderPath?: string
  ): Promise<TFile> {
    if (!folderPath)
      throw new Error(
        'FolderPath not provided for display link'
      )
    const linkRegex = /\[\[([^\]]+)\]\]/
    const fileName = data.match(linkRegex)?.[0].slice(2, -2)
    const linkMatch = data.match(linkRegex)
    if (linkMatch) {
      return await this.pkm.getFileByPath(
        `${folderPath}/${fileName}.md`
      )
    }

    throw new Error("Can't parse link at " + data)
  }

  displayWithParams(params: string): string {
    return `[[${params}]]`
  }

  async display(folderPath?: string): Promise<string> {
    if (!folderPath)
      throw new Error(
        'FolderPath not provided for display link'
      )
    return `[[${(await this.pkm.suggestFileByPath(folderPath)).basename}]]`
  }
}
