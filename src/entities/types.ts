import type { ELog } from '@/log/types'
import type { AEntity } from './entity'

export interface IEntity {
  token: string
  folderPath: string
  logStructure: Record<string, ELog>
  logData: Map<ELog, string>
  log(entity: AEntity, n?: number): Promise<string>
  logWithParams(params: any[], n?: number): string
  parse(entity: AEntity, log: string): Promise<any>
  parseLogs(entity: AEntity, log: string[]): Promise<any[]>
  filterLogs(logs: string[]): string[]
}

export interface IEntityParams {
  token: string
  folderPath: string
  logStructure: ELog[]
}
