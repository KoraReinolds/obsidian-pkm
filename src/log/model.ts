import type PKMPlugin from '@/main'
import type { TExtendedApp } from '@/types'

export abstract class ALog<T> {
  folderPath: string

  constructor(app: TExtendedApp, folderPath: string) {
    const pkm =
      app.plugins?.plugins['obsidian-daily-first-pkm']
    if (!pkm) throw new Error('Pkm plugin is required')

    this.pkm = pkm
    this.app = app
    this.folderPath = folderPath
  }

  pkm: PKMPlugin
  app: TExtendedApp
  abstract display(): Promise<string>
  abstract parse(data: string): Promise<T>
}
