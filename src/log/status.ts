import { ALog } from './model'
import type { AEntity } from '@/entities/entity'
import { ELog } from './types'

export class StatusLog extends ALog {
  async parse(
    entity: AEntity,
    data: string
  ): Promise<string> {
    if (!entity.folderPath)
      throw new Error(
        'FolderPath not provided for display status'
      )
    const statusRegex = /#status\/(\w+)/
    const status = data.match(statusRegex)?.[1]
    if (status) {
      return status
    }

    throw new Error("Can't parse status at " + data)
  }

  displayWithParams(params: string): string {
    return `[[${params}]]`
  }

  async display(entity: AEntity): Promise<string> {
    if (!entity.folderPath)
      throw new Error(
        'FolderPath not provided for display status'
      )

    const data = entity.logData.get(ELog.link)
    const dataLogger = this.pkm.LogMap[ELog.link]
    if (!data)
      throw new Error("Can't get status data from entity")

    const task = await dataLogger.parse(entity, data)

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
