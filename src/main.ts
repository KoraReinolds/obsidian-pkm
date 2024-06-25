import { App, Plugin } from 'obsidian'

type TPlugins = {
  'templater-obsidian': any
}

export default class PKMPlugin extends Plugin {
  extendedApp: App &
    Partial<{
      plugins: {
        plugins: TPlugins
      }
    }> = this.app

  async onload() {}
}
