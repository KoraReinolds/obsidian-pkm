import { Plugin } from 'obsidian'
import type { TExtendedApp } from './types'

export default class PKMPlugin extends Plugin {
  extendedApp: TExtendedApp = this.app

  async onload() {}
}
