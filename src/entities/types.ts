import type { ELog } from '@/log/types'

export interface IEntity {
  token: string
  folderPath: string
  logStructure: Record<string, ELog>
  log(n?: number, folderPath?: string): Promise<string>
  parse(log: string, folderPath?: string): Promise<any>
}

export interface IEntityParams {
  token: string
  folderPath: string
  logStructure: ELog[]
}
