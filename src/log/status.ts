import type { TFile } from 'obsidian'
import { ALog } from './model'
import type { AEntity } from '@/entities/entity'
import { ELog } from './types'

export class StatusLog extends ALog {
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

    const data = entity.logData.get(ELog.link)
    if (!data)
      throw new Error("Can't get link data from entity")

    const task = await this.parse(entity, data)

    const cache = this.app.metadataCache.getFileCache(task)

    if (!cache)
      throw new Error(
        "Can't get file cache in status logger"
      )

    const status = cache.frontmatter?.status

    /*
    const statusesIcons = {
      TODO: 📌,
      PLANNING: 📅,
      PROGRESS: 🔄,
      REVIEW: 🧐,
      RETRO: 🕰️,
      DONE: ✅
    }
    */

    const statuses = [
      'TODO',
      'PLANNING',
      'PROGRESS',
      'REVIEW',
      'RETRO',
      'DONE'
    ]
    const statusIndex = statuses.findIndex(
      (s) => s === status
    )

    const showedStatuses = statuses.slice(statusIndex)

    if (!showedStatuses.length)
      throw new Error('No statuses')

    const newStatus =
      await this.pkm.tp.templater.current_functions_object.system.suggester(
        (item: any) => item,
        showedStatuses
      )

    const statusTag = `#status/${newStatus}`

    if (this.pkm.extendedApp.plugins) {
      const { update } =
        this.pkm.extendedApp.plugins.plugins['metaedit'].api
      await update('status', newStatus, task.path)
    }

    return `${statusTag}`
  }
}
