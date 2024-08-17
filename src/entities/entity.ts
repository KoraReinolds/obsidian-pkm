import type { IEntity } from './types'
import { ELog } from '@/log/types'
import PKMPlugin from '@/main'
import type { TExtendedApp } from '@/types'

export abstract class AEntity implements IEntity {
  abstract token: string
  abstract logStructure: Record<string, ELog>
  abstract logData: Map<ELog, string>
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
    const log = `${'>'.repeat(n * 2)} (log:: ${this.token} ${values.join(' ')})\n`
    return log
  }

  async log(
    entity: AEntity,
    n: number = 1
  ): Promise<string> {
    const values = []
    for await (const type of Object.values(
      this.logStructure
    )) {
      const data =
        await this.pkm.LogMap[type].display(entity)
      values.push(data)
      this.logData.set(type, data)
    }
    const log = `${'>'.repeat(n * 2)} (log:: ${this.token} ${values.join(' ')})\n`
    return log
  }

  async parse(entity: AEntity, log: string) {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(this.logStructure).map(
          async ([key, type]) => {
            return [
              key,
              await this.pkm.LogMap[type].parse(entity, log)
            ]
          }
        )
      )
    )
  }

  filterLogs(logs: string[]): string[] {
    return logs.filter((log) => {
      const token = log.slice(0, log.indexOf(' '))
      return token === this.token
    })
  }

  async parseLogs(entity: AEntity, logs: string[]) {
    return await Promise.all(
      this.filterLogs(logs).map((log) =>
        this.parse(entity, log)
      )
    )
  }
}
