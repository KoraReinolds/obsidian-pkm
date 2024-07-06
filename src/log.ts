import type { TExtendedApp } from './types'

const log = async (app: TExtendedApp, params: string) => {
  const pkm =
    app.plugins?.plugins['obsidian-daily-first-pkm']
  if (!pkm) throw new Error('Pkm plugin is required')
  const instance = pkm.modules[params]
  const log = await instance.log()
  return log
}

export default log
