import type { App } from 'obsidian'
import type PKMPlugin from './main'

export type TPlugins = {
  'templater-obsidian': any
  'obsidian-daily-first-pkm': PKMPlugin
}

export type TExtendedApp = App &
  Partial<{
    plugins: {
      plugins: TPlugins
    }
  }>
