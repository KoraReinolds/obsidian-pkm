import type { TFile } from 'obsidian'
import { ALog } from './model'
import type { AEntity } from '@/entities/entity'

export class LinkLog extends ALog {
  async parse(
    entity: AEntity,
    data: string
  ): Promise<TFile> {
    if (!entity.folderPath)
      throw new Error(
        'FolderPath not provided for display link'
      )
    const linkRegex = /\[\[([^\]]+)\]\]/
    const fileName = data.match(linkRegex)?.[0].slice(2, -2)
    const linkMatch = data.match(linkRegex)
    if (linkMatch) {
      return await this.pkm.getFileByPath(
        `${entity.folderPath}/${fileName}.md`
      )
    }

    throw new Error("Can't parse link at " + data)
  }

  displayWithParams(params: string): string {
    return `[[${params}]]`
  }

  async display(entity: AEntity): Promise<string> {
    if (!entity.folderPath)
      throw new Error(
        'FolderPath not provided for display link'
      )
    return `[[${(await this.pkm.suggestFileByPath(entity.folderPath)).basename}]]`
  }
}
