import type { IEntity } from './types'
import { ELog } from '@/log/types'
import PKMPlugin from '@/main'
import type { TExtendedApp } from '@/types'

export abstract class AEntity implements IEntity {
  abstract token: string
  abstract logStructure: Record<string, ELog>
  abstract folderPath: string
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

  logWithParams(params: any[], n: number = 1): string {
    const values = Object.values(this.logStructure).map(
      (type, index) => {
        const d = params[index] as never
        return this.pkm.LogMap[type].displayWithParams(d)
      }
    )
    const log = `${'>'.repeat(n * 2)} (log:: ${this.token}${values.join(' ')})`
    return log
  }

  async log(
    n: number = 1,
    folderPath?: string
  ): Promise<string> {
    const values = await Promise.all(
      Object.values(this.logStructure).map(
        (type) =>
          new Promise((res) =>
            res(this.pkm.LogMap[type].display(folderPath))
          )
      )
    )
    const log = `${'>'.repeat(n * 2)} (log:: ${this.token}${values.join(' ')})`
    return log
  }

  async parse(log: string, folderPath?: string) {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(this.logStructure).map(
          async ([key, type]) => {
            return [
              key,
              await this.pkm.LogMap[type].parse(
                log,
                folderPath
              )
            ]
          }
        )
      )
    )
  }

  async parseLogs(logs: string[], folderPath?: string) {
    return await Promise.all(
      logs
        .filter((log) => {
          const token = log.slice(0, log.indexOf(' '))
          return token === this.token
        })
        .map((log) => this.parse(log, folderPath))
    )
  }
}
