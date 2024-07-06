import {
  ELog,
  type TLinkLog,
  type TSizeLog,
  type TTimeLog
} from '@/log/types'
import { AEntity } from './entity'

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

  async parse(log: string): Promise<{
    [ELog.time]: TTimeLog
    [ELog.link]: TLinkLog
    [ELog.size]: TSizeLog
  }> {
    return await super.parse(log, this.folderPath)
  }
}
