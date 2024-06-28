import { Plugin, TFile, TFolder } from 'obsidian'
import type { TExtendedApp } from './types'

export default class PKMPlugin extends Plugin {
  extendedApp: TExtendedApp = this.app
  tp: any

  isFile(file: any): file is TFile {
    return file instanceof TFile
  }

  isFolder(file: any): file is TFolder {
    return file instanceof TFolder
  }

  async prompt(
    promptTitle: string,
    f: (promptValue: string) => string
  ): Promise<string> {
    return await f(
      await this.tp.templater.current_functions_object.system.prompt(
        promptTitle
      )
    )
  }

  async getFileByPath(path: string): Promise<TFile> {
    const file = this.app.vault.getAbstractFileByPath(path)
    if (this.isFile(file)) return file
    throw new Error('Get folder instead file')
  }

  async suggestFileByPath(path: string): Promise<TFile> {
    const file = this.app.vault.getAbstractFileByPath(path)
    if (this.isFolder(file)) {
      const files = file.children.filter((f) =>
        this.isFile(f)
      )
      files.sort((a, b) => b.stat.mtime - a.stat.mtime)
      return await this.tp.templater.current_functions_object.system.suggester(
        (file: TFile) => file.name,
        files
      )
    } else {
      throw new Error('Path must be folder')
    }
  }

  async onload() {
    console.log(this)
    this.tp =
      this.extendedApp.plugins?.plugins[
        'templater-obsidian'
      ]
  }
}
