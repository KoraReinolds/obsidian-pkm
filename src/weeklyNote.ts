import type { TExtendedApp } from './types'

const weeklyNote = async (app: TExtendedApp) => {
  const dv: any = {}

  const dvblock = () => {
    const pkm =
      app.plugins?.plugins['obsidian-daily-first-pkm']
    if (!pkm) throw new Error('Pkm plugin is required')
    pkm.notes.weekly(app, dv)
  }

  return `\`\`\`dataviewjs
    ${dvblock.toString().match(/\{([\s\S]*)\}/)?.[1]}
  \`\`\``
}

export default weeklyNote
