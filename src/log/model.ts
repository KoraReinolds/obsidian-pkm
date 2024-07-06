import type PKMPlugin from '@/main'
import type { TExtendedApp } from '@/types'

export abstract class ALog {
  app: TExtendedApp
  public get pkm(): PKMPlugin {
    const pkm =
      this.app.plugins?.plugins['obsidian-daily-first-pkm']
    if (!pkm) throw new Error('Pkm plugin is required')
    return pkm
  }

  constructor(app: TExtendedApp) {
    this.app = app
  }

  abstract display(folderPath?: string): Promise<string>
  abstract parse(
    data: string,
    folderPath?: string
  ): Promise<any>
}
