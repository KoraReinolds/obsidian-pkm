import {
  ELog,
  type TLinkLog,
  type TSizeLog
} from '@/log/types'
import { AEntity } from './entity'
import type { ALog } from '@/log/model'

export type TProductData = {
  [ELog.link]: TLinkLog
  [ELog.size]: TSizeLog
}

export class Product extends AEntity {
  logData: Map<ELog, string> = new Map()
  token = `🍔`
  logStructure = {
    link: ELog.link,
    size: ELog.size
  }
  folderPath = 'Food'

  logWithParams(params: [string, number]): string {
    return super.logWithParams(params)
  }

  async log(): Promise<string> {
    return super.log(this, 1)
  }

  async parse(
    entity: AEntity,
    log: string
  ): Promise<TProductData> {
    return await super.parse(this, log)
  }

  async parseLogs(
    entity: AEntity,
    logs: string[]
  ): Promise<TProductData[]> {
    return await super.parseLogs(this, logs)
  }
}
