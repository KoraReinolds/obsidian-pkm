import {
  ELog,
  type TLinkLog,
  type TSizeLog
} from '@/log/types'
import { AEntity } from './entity'

export type TProductData = {
  [ELog.link]: TLinkLog
  [ELog.size]: TSizeLog
}

export class Product extends AEntity {
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
    return super.log(1, this.folderPath)
  }

  async parse(log: string): Promise<TProductData> {
    return await super.parse(log, this.folderPath)
  }

  async parseLogs(logs: string[]): Promise<TProductData[]> {
    return await super.parseLogs(logs, this.folderPath)
  }
}
