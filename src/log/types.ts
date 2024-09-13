import type PKMPlugin from '@/main'
import { LinkLog } from './link'
import { SizeLog } from './size'
import { TimeLog } from './time'
import type { TExtendedApp } from '@/types'
import type { TFile } from 'obsidian'

export interface ILog<T> {
  folderPath: string
  pkm: PKMPlugin
  app: TExtendedApp
  display(): Promise<string>
  parse(data: string): Promise<T>
}

export type TTimeLog = {
  end: {
    hh: number
    mm: number
  }
  start: {
    hh: number
    mm: number
  }
}

export type TSizeLog = number

export type TLinkLog = TFile

export type TStatusLog =
  | 'todo'
  | 'planning'
  | 'progress'
  | 'review'
  | 'done'

export enum ELog {
  status = 'status',
  size = 'size',
  link = 'link',
  time = 'time'
}
