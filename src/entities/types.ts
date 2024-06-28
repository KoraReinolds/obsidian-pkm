import type { ELog } from '@/log/types'
import type { TExtendedApp } from '@/types'

export interface IEntity {
  token: string
  folderPath: string
  logStructure: ELog[]
  log(app: TExtendedApp): Promise<string>
}

export interface IEntityParams {
  token: string
  folderPath: string
  logStructure: ELog[]
}
