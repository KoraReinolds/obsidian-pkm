import {
  ELog,
  type TLinkLog,
  type TSizeLog,
  type TTimeLog
} from '@/log/types'
import { AEntity } from './entity'
import type { ALog } from '@/log/model'

export type TShopData = {
  [ELog.time]: TTimeLog
  [ELog.link]: TLinkLog
  [ELog.size]: TSizeLog
}

export class Shop extends AEntity {
  logData: Map<ELog, string> = new Map()
  token = `🛒`
  logStructure = {
    time: ELog.time,
    size: ELog.size,
    link: ELog.link
  }
  folderPath = 'Food'

  async log(): Promise<string> {
    return super.log(this, 1)
  }

  async parse(
    entity: AEntity,
    log: string
  ): Promise<TShopData> {
    return await super.parse(entity, log)
  }

  async parseLogs(
    entity: AEntity,
    logs: string[]
  ): Promise<TShopData[]> {
    return await super.parseLogs(entity, logs)
  }

  logWithParams(
    params: [TTimeLog, number, string]
  ): string {
    return super.logWithParams(params)
  }
}

export class ShopCancel extends Shop {
  token = `🛒❌`
}

export class ShopAdd extends Shop {
  token = `🛒✅`
}
