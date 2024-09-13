import {
  ELog,
  type TLinkLog,
  type TStatusLog,
  type TTimeLog
} from '@/log/types'
import { AEntity } from './entity'
import type { ALog } from '@/log/model'

export type TWorkData = {
  [ELog.time]: TTimeLog
  [ELog.link]: TLinkLog
  [ELog.status]: TStatusLog
}

export class Work extends AEntity {
  logData: Map<ELog, string> = new Map()
  token = `⚡`
  logStructure = {
    time: ELog.time,
    link: ELog.link,
    status: ELog.status
  }

  folderPath = 'Tasks'

  async log(): Promise<string> {
    const log = await super.log(this, 1)
    console.log(123, await this.parse(this, log))
    return log
  }

  async parse(
    entity: AEntity,
    log: string
  ): Promise<TWorkData> {
    return await super.parse(this, log)
  }

  async parseLogs(
    entity: AEntity,
    logs: string[]
  ): Promise<TWorkData[]> {
    // if (logs[0] && !logs[0].startsWith('(')) debugger
    return await super.parseLogs(this, logs)
  }

  logWithParams(
    params: [TTimeLog, number, string]
  ): string {
    return super.logWithParams(params)
  }
}
