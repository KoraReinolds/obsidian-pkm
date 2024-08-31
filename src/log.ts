import type { AEntity } from './entities/entity'
import { rubik } from './rubikMemo'
import type { TExtendedApp } from './types'

const log = async (app: TExtendedApp, params: string) => {
  rubik(app)
  const pkm =
    app.plugins?.plugins['obsidian-daily-first-pkm']
  if (!pkm) throw new Error('Pkm plugin is required')
  const instance = pkm.getInstance(params) as AEntity
  const log = await instance.log(instance)
  return log
}

export default log
