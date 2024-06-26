import { TimeLog } from './time'

export enum ELog {
  time = 'time'
}

export const LogMap = {
  [ELog.time]: TimeLog
}
