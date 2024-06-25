import type { App } from 'obsidian'
import { modules } from './entities'

const log = (app: App, params: string) => {
  const Entity = modules[params]
  const instance = new Entity()
  return instance.log([])
}

export default log
