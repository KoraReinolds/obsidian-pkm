import {
  Editor,
  Plugin,
  TFile,
  TFolder,
  type CachedMetadata
} from 'obsidian'
import type { TExtendedApp } from './types'
import { Shop, ShopAdd, ShopCancel } from './entities/shop'
import type { IEntity } from './entities/types'
import { ELog, type TTimeLog } from './log/types'
import { EndTimeLog, TimeLog } from './log/time'
import { SizeLog } from './log/size'
import { LinkLog } from './log/link'
import { Product } from './entities/product'
import weeklyNote from './notes/weekly'
import { taskNote } from './notes/task'
import { Work } from './entities/work'
import { StatusLog } from './log/status'
import type { AEntity } from './entities/entity'

const patternNames: [string, string, number][] = [
  ['Абстрактная фабрика', 'Abstract factory', 1],
  ['Адаптер', 'Adapter', 2],
  ['Декоратор', 'Decorator', 2],
  ['Заместитель', 'Proxy', 2],
  ['Итератор', 'Iterator', 3],
  ['Команда', 'Command', 3],
  ['Компановщик', 'Compositor', 2],
  ['Легковес', 'Flyweight', 2],
  ['Мост', 'Bridge', 2],
  ['Наблюдатель', 'Watcher', 3],
  ['Одиночка', 'Singleton', 1],
  ['Посетитель', 'Visitor', 3],
  ['Посредник', 'Mediator', 3],
  ['Прототип', 'Prototype', 1],
  ['Снимок', 'Memento', 3],
  ['Состояние', 'State', 3],
  ['Стратегия', 'Strategy', 3],
  ['Строитель', 'Builder', 1],
  ['Фабричный метод', 'Factory method', 1],
  ['Фасад', 'Facade', 2],
  ['Цепочка обязанностей', 'Chain of responsibility', 3],
  ['Шаблонный метод', 'Template method', 3]
]

const patternTypes = [
  'Порождающий',
  'Структурный',
  'Поведенческий'
]

export default class PKMPlugin extends Plugin {
  extendedApp: TExtendedApp = this.app
  tp: any
  dv: any
  tpm: any

  shop = {
    instance: new Shop(this.extendedApp),
    getSizesFromLogs: async (
      entity: AEntity,
      logs: string[]
    ) => {
      const logData = await entity.parseLogs(entity, logs)

      const sizes: Record<string, number> = {}
      logData.reduce((res, data) => {
        const fileName = data.link.basename
        const size = data.size
        res[fileName]
          ? (res[fileName] += +size)
          : (res[fileName] = +size)
        return res
      }, sizes)

      return sizes
    }
  }

  shopRemove = {
    instance: new ShopCancel(this.extendedApp)
  }

  shopAdd = {
    instance: new ShopAdd(this.extendedApp)
  }

  product = {
    instance: new Product(this.extendedApp)
  }

  work = {
    instance: new Work(this.extendedApp)
  }

  notes = {
    weekly: weeklyNote,
    task: taskNote
  }

  date = {
    getCurrentTime(): TTimeLog {
      const now = new Date()
      const hh = +now.getHours().toString().padStart(2, '0')
      const mm = +now
        .getMinutes()
        .toString()
        .padStart(2, '0')

      return { hh, mm }
    },

    dayFormatFromWeek: (tp: any, date: string) => {
      return tp.date.now(
        'YYYY-MM-DD',
        0,
        date,
        'YYYY-[W]ww'
      )
    },

    weekFormatFromDay: (tp: any, date: string) => {
      return tp.date.now(
        'YYYY-[W]ww',
        0,
        date,
        'YYYY-MM-DD'
      )
    },

    getWeekData: async (app: TExtendedApp) => {
      const pkm =
        app.plugins?.plugins['obsidian-daily-first-pkm']
      if (!pkm) throw new Error('Pkm plugin is required')
      const tp = pkm.tp.templater.current_functions_object
      const activeFile = await pkm.getActiveFile()
      const date = activeFile.basename

      return await new Promise((res, rej) => {
        try {
          const fileWeekDate = this.date.dayFormatFromWeek(
            tp,
            date
          )
          const moment = tp.date.now('YYYY-MM-DD')
          const offset =
            (+new Date(fileWeekDate) - +new Date(moment)) /
            1000 /
            24 /
            60 /
            60

          const currentWeekDate = tp.date.now(
            'YYYY-[W]ww',
            offset
          )
          const prevWeekDate = tp.date.now(
            'YYYY-[W]ww',
            -7 + offset
          )
          const nextWeekDate = tp.date.now(
            'YYYY-[W]ww',
            7 + offset
          )
          const monthStart = tp.date.now('YYYY-MM', offset)

          res({
            offset,
            currentWeekDate,
            fileWeekDate,
            moment,
            prevWeekDate,
            nextWeekDate,
            monthStart
          })
        } catch {
          rej('Data format error')
        }
      })
    }
  }

  getInstance(type: string): IEntity {
    if (type === 'shop') return this.shop.instance
    else if (type === 'work') return this.work.instance
    else if (type === 'shop-remove')
      return this.shopRemove.instance
    else if (type === 'shop-add')
      return this.shopAdd.instance
    else if (type === 'product')
      return this.product.instance
    throw new Error('Unexpected entity type')
  }

  LogMap = {
    [ELog.time]: new TimeLog(this.extendedApp),
    [ELog.timeStart]: new TimeLog(this.extendedApp),
    [ELog.timeEnd]: new EndTimeLog(this.extendedApp),
    [ELog.size]: new SizeLog(this.extendedApp),
    [ELog.link]: new LinkLog(this.extendedApp),
    [ELog.status]: new StatusLog(this.extendedApp)
  }

  tokenToClass: Record<string, IEntity> = {
    [`🛒`]: this.shop.instance,
    [`🛒❌`]: this.shopRemove.instance,
    [`🛒✅`]: this.shopAdd.instance,
    [`🍔`]: this.product.instance,
    [`⚡`]: this.work.instance
  }

  getNow(): string {
    return this.tpm.date.now(
      'dddd, MMMM Do YYYY, h:mm:ss a'
    )
  }

  async getMetadataKey(key: string, file?: TFile) {
    const metaeditApi =
      this.extendedApp.plugins?.plugins['metaedit'].api
    if (!metaeditApi) return
    const { getPropertyValue } = metaeditApi

    const activeFile = file || (await this.getActiveFile())
    return getPropertyValue(key, activeFile)
  }

  async cretateMetadataKey(
    key: string,
    value: string,
    file?: TFile
  ) {
    const metaeditApi =
      this.extendedApp.plugins?.plugins['metaedit'].api
    if (!metaeditApi) return
    const { createYamlProperty } = metaeditApi

    const activeFile = file || (await this.getActiveFile())
    return createYamlProperty(key, value, activeFile.path)
  }

  async updateMetadata(
    key: string,
    value: string,
    file?: TFile
  ) {
    const metaeditApi =
      this.extendedApp.plugins?.plugins['metaedit'].api
    if (!metaeditApi) return
    const { update } = metaeditApi
    const activeFile = file || (await this.getActiveFile())
    if (await this.getMetadataKey(key, activeFile)) {
      update(key, value, activeFile.path)
    } else {
      await this.cretateMetadataKey(key, value, activeFile)
    }
  }

  isFile(file: any): file is TFile {
    return file instanceof TFile
  }

  isFolder(file: any): file is TFolder {
    return file instanceof TFolder
  }

  async prompt(
    promptTitle: string,
    f: (promptValue: string) => string
  ): Promise<string> {
    return await f(
      await this.tp.templater.current_functions_object.system.prompt(
        promptTitle
      )
    )
  }

  async getActiveFile(): Promise<TFile> {
    const activeFile = this.app.workspace.getActiveFile()
    if (!activeFile)
      throw new Error('Active file not found')
    return activeFile
  }

  async getFileByPath(path: string): Promise<TFile | null> {
    const file = this.app.vault.getAbstractFileByPath(
      this.getFileName(path)
    )
    if (this.isFile(file)) return file
    return null
  }

  async getFolderByPath(
    path: string
  ): Promise<TFolder | null> {
    const folder =
      this.app.vault.getAbstractFileByPath(path)
    if (this.isFolder(folder)) return folder
    return null
  }

  async suggestFileByPath(path: string): Promise<TFile> {
    const file = await this.getFolderByPath(path)
    if (this.isFolder(file)) {
      const files = file.children.filter((f) =>
        this.isFile(f)
      )
      files.sort((a, b) => b.stat.mtime - a.stat.mtime)
      return await this.tp.templater.current_functions_object.system.suggester(
        (file: TFile) => file.name,
        files
      )
    } else {
      throw new Error('Path must be folder')
    }
  }

  getBoudariesOfBlock(data: {
    editor: Editor
    cache: CachedMetadata
    name: string
  }) {
    const doc = data.editor.getDoc()
    const section = data.cache.sections?.find((section) => {
      const line = section.position.start.line
      return doc
        .getLine(line)
        .toLowerCase()
        .endsWith(data.name)
    })

    return section?.position
  }

  getCache(file: TFile) {
    return this.app.metadataCache.getFileCache(file)
  }

  getFileName(path: string) {
    return path.endsWith('.md') ? path : `${path}.md`
  }

  async createNewLeaf(path: string) {
    // Create a new leaf in a new split direction (e.g., right split)
    const leaf = this.app.workspace.getLeaf('tab')

    const file = await this.getFileByPath(path)

    if (file && leaf) {
      await leaf.openFile(file)
    }
  }

  getEditorForFile(file: TFile) {
    const leaves =
      this.app.workspace.getLeavesOfType('markdown')

    for (const leaf of leaves) {
      const view = leaf.view

      if (view.file.path === file.path) {
        const editor = view.editor
        return editor
      }
    }

    return null
  }

  async openFileByBaseName(path: string) {
    const file = await this.getFileName(path)
    if (file) {
      const workspace = this.app.workspace
      const currentLeaf = workspace.activeLeaf
      if (currentLeaf) {
        await currentLeaf.openFile(file)
      } else {
        throw new Error('No active pane found')
      }
    } else {
      throw new Error(`File "${path}" not found`)
    }
  }

  async onload() {
    this.dv = this.extendedApp.plugins?.plugins.dataview.api
    this.tp =
      this.extendedApp.plugins?.plugins[
        'templater-obsidian'
      ]
    this.tpm = this.tp.templater.current_functions_object
  }
}
