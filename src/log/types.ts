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
  hh: number
  mm: number
}

export type TSizeLog = {
  size: number
}

export type TLinkLog = {
  file: TFile
}

export enum ELog {
  time = 'time',
  size = 'size',
  link = 'link'
}
