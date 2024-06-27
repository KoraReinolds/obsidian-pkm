import type { TExtendedApp } from '@/types'

export abstract class ALog {
  constructor(app: TExtendedApp) {
    this.tp = app.plugins?.plugins['templater-obsidian']
    this.app = app
  }

  tp: any
  app: TExtendedApp
  abstract display(): Promise<string>

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
}
