import {
  ELog,
  type TLinkLog,
  type TSizeLog,
  type TTimeLog
} from '@/log/types'
import { AEntity } from './entity'

export type TShopData = {
  [ELog.time]: TTimeLog
  [ELog.link]: TLinkLog
  [ELog.size]: TSizeLog
}

export class Shop extends AEntity {
  token = `🛒`
  logStructure = {
    time: ELog.time,
    size: ELog.size,
    link: ELog.link
  }
  folderPath = 'Food'

  async log(): Promise<string> {
    return super.log(1, this.folderPath)
  }

  async parse(log: string): Promise<TShopData> {
    return await super.parse(log, this.folderPath)
  }

  async parseLogs(logs: string[]): Promise<TShopData[]> {
    return await super.parseLogs(logs, this.folderPath)
  }
}
