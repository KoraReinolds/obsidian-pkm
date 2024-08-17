import type { AEntity } from '@/entities/entity'
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

  abstract display(entity: AEntity): Promise<string>
  abstract displayWithParams(params: any): string
  abstract parse(
    entity: AEntity,
    data: string
  ): Promise<any>
}
