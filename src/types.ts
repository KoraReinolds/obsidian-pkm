import type { App } from 'obsidian'

export type TPlugins = {
  'templater-obsidian': any
}

export type TExtendedApp = App &
  Partial<{
    plugins: {
      plugins: TPlugins
    }
  }>
