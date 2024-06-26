import type PKMPlugin from '@/main'
import type { TExtendedApp } from '@/types'

export abstract class ALog<T> {
  constructor(app: TExtendedApp) {
    const pkm =
      app.plugins?.plugins['obsidian-daily-first-pkm']
    if (!pkm) throw new Error('Pkm plugin is required')

    this.pkm = pkm
    this.app = app
  }

  pkm: PKMPlugin
  app: TExtendedApp
  abstract display(): Promise<string>
  abstract parse(data: string): Promise<T>
}
