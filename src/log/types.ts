import { LinkLog } from './link'
import { SizeLog } from './size'
import { TimeLog } from './time'

export enum ELog {
  time = 'time',
  size = 'size',
  link = 'link'
}

export const LogMap = {
  [ELog.time]: TimeLog,
  [ELog.size]: SizeLog,
  [ELog.link]: LinkLog
}
