import type { App } from 'obsidian'

export abstract class ALog {
  abstract display(app: App): Promise<string>
}
