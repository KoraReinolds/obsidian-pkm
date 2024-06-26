import type { App } from 'obsidian'
import { modules } from './entities/model'

const log = (app: App, params: string) => {
  const Entity = modules[params]
  const instance = new Entity()
  return instance.log(app)
}

export default log
