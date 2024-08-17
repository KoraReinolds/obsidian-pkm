import {
  ELog,
  type TLinkLog,
  type TStatusLog,
  type TTimeLog
} from '@/log/types'
import { AEntity } from './entity'
import type { ALog } from '@/log/model'

export type TWorkData = {
  [ELog.link]: TLinkLog
  [ELog.status]: TStatusLog
  [ELog.time_start]: TTimeLog
  [ELog.time_end]: TTimeLog
}

export class Work extends AEntity {
  logData: Map<ELog, string> = new Map()
  token = `⚡`
  logStructure = {
    link: ELog.link,
    status: ELog.status,
    timeStart: ELog.time_start,
    timeEnd: ELog.time_end
  }

  folderPath = 'Tasks'

  async log(): Promise<string> {
    return super.log(this, 1)
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
    return await super.parseLogs(this, logs)
  }

  logWithParams(
    params: [TTimeLog, number, string]
  ): string {
    return super.logWithParams(params)
  }
}
