import { SizeLog } from './size'
import { TimeLog } from './time'

export enum ELog {
  time = 'time',
  size = 'size'
}

export const LogMap = {
  [ELog.time]: TimeLog,
  [ELog.size]: SizeLog
}
