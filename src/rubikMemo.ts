import type { TExtendedApp } from './types'
import { stringify } from 'yaml'

const jsonData = `[["-L',D',L-U,U",[[["-1,-1,-1","O,Y,B"],["-1,1,-1","R,Y,G"],["1,1,1","O,W,B"]]]],["-U,U-L',D',L",[[["-1,-1,-1","R,Y,G"],["-1,1,-1","O,W,B"],["1,1,1","O,Y,B"]]]],["Z',Y'-L',D',L-U,U",[[["-1,-1,-1","O,W,G"],["-1,1,-1","R,Y,G"],["1,1,1","O,W,B"]]]],["Y',Z'-U,U-L',D',L",[[["-1,-1,-1","R,W,B"],["-1,1,-1","O,Y,G"],["1,1,1","R,Y,G"]]]],["Z-L',D',L-U,U",[[["-1,-1,-1","O,W,B"],["-1,1,-1","R,Y,B"],["1,1,1","O,W,G"]]]],["Z-U,U-L',D',L",[[["-1,-1,-1","R,Y,B"],["-1,1,-1","O,W,G"],["1,1,1","O,W,B"]]]],["Z'-L',D',L-U,U",[[["-1,-1,-1","O,Y,G"],["-1,1,-1","R,W,G"],["1,1,1","O,Y,B"]]]],["Z'-U,U-L',D',L",[[["-1,-1,-1","R,W,G"],["-1,1,-1","O,Y,B"],["1,1,1","O,Y,G"]]]],["X-L',D',L-U,U",[[["-1,-1,-1","R,Y,B"],["-1,1,-1","R,W,G"],["1,1,1","O,Y,B"]]]],["X-U,U-L',D',L",[[["-1,-1,-1","R,W,G"],["-1,1,-1","O,Y,B"],["1,1,1","R,Y,B"]]]],["X'-L',D',L-U,U",[[["-1,-1,-1","O,W,B"],["-1,1,-1","O,Y,G"],["1,1,1","R,W,B"]]]],["X'-U,U-L',D',L",[[["-1,-1,-1","O,Y,G"],["-1,1,-1","R,W,B"],["1,1,1","O,W,B"]]]],["Y-L',D',L-U,U",[[["-1,-1,-1","R,Y,B"],["-1,1,-1","O,Y,G"],["1,1,1","R,W,B"]]]],["Y-U,U-L',D',L",[[["-1,-1,-1","O,Y,G"],["-1,1,-1","R,W,B"],["1,1,1","R,Y,B"]]]],["Y'-L',D',L-U,U",[[["-1,-1,-1","O,Y,G"],["-1,1,-1","R,Y,B"],["1,1,1","O,W,G"]]]],["Y'-U,U-L',D',L",[[["-1,-1,-1","R,Y,B"],["-1,1,-1","O,W,G"],["1,1,1","O,Y,G"]]]]]`

export const rubik = async (app: TExtendedApp) => {
  const data = JSON.parse(jsonData)
  for await (const item of data) {
    const formulaPath = item[0]

    const pkm =
      app.plugins?.plugins['obsidian-daily-first-pkm']

    const existingFile =
      await pkm?.getFileByPath(formulaPath)
    if (existingFile) {
      return
    }

    const stateLinks = []
    const states = item[1]
    for await (const state of states) {
      const statePath = state.join(';')
      stateLinks.push(statePath)
      const existingFile =
        await pkm?.getFileByPath(statePath)
      if (existingFile) {
        return
      }
      const fileContent = `---\n${stringify({
        ...Object.fromEntries(state),
        tags: ['state'],
        links: [`[[${formulaPath}]]`]
      })}\n---`
      await app.vault.create(
        `Memo/Rubik/${statePath}.md`,
        fileContent
      )
    }

    const fileContent = `---\n${stringify({
      tags: ['formula'],
      links: stateLinks.map((link) => `[[${link}]]`)
    })}\n---`
    await app.vault.create(
      `Memo/Rubik/${formulaPath}.md`,
      fileContent
    )
  }
}
