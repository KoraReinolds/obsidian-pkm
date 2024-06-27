import { ELog } from '@/log/types'
import { AEntity } from './entity'

export class Shop extends AEntity {
  constructor() {
    super({
      token: `🛒`,
      logStructure: [ELog.time, ELog.size]
    })
  }
}
