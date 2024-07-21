import type { TExtendedApp } from '@/types'
import type { Editor } from 'obsidian'

const weeklyNote = async (app: TExtendedApp, dv: any) => {
  const pkm =
    app.plugins?.plugins['obsidian-daily-first-pkm']
  if (!pkm) throw new Error('Pkm plugin is required')
  const tp = pkm.tp.templater.current_functions_object
  const activeFile = await pkm.getActiveFile()

  const date = activeFile.basename

  const {
    offset,
    currentWeekDate,
    fileWeekDate,
    moment,
    prevWeekDate,
    nextWeekDate,
    monthStart
  } = await pkm.date.getWeekData(app)

  const dailyFile = await pkm.getFileByPath(
    `Journal/Daily/${moment}`
  )

  const currentWeekWhere = (data: any) =>
    pkm.date.weekFormatFromDay(tp, data.file.name) === date

  const beforeCurrentWeekWhere = (data: any) =>
    pkm.date.weekFormatFromDay(tp, data.file.name) <
    nextWeekDate

  const addedSizes = await pkm.shop.getSizesFromLogs(
    pkm.shop.instance,
    await dv
      .pages('"Journal/Daily"')
      .where(beforeCurrentWeekWhere).log
  )

  const removedSizes = await pkm.shop.getSizesFromLogs(
    pkm.shopRemove.instance,
    await dv
      .pages('"Journal/Daily"')
      .where(currentWeekWhere).log
  )

  const rows: any[] = []
  const msgs: string[] = []

  Object.entries(addedSizes)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, addedSize]) => {
      const size = addedSize - (removedSizes[name] || 0)
      const button = dv.el('button', 'log')
      const buttonAdd = dv.el('button', 'add')
      const buttonRemove = dv.el('button', 'remove')
      button.style.display = 'none'
      buttonAdd.style.display = 'none'
      buttonRemove.style.display = 'none'

      const changeButtonVisibility = () => {
        if (inputLeft.value < 0) {
          button.style.display = 'block'
          buttonAdd.style.display = 'none'
          buttonRemove.style.display = 'none'
        } else {
          button.style.display = 'none'
          buttonAdd.style.display = 'block'
          buttonRemove.style.display = 'block'
        }
      }

      const inputSize = dv.el('input')
      inputSize.value = size
      inputSize.type = 'number'
      inputSize.onchange = (e) => {
        inputLeft.value = size - e.target.value
        changeButtonVisibility()
      }
      inputSize.style.width = '50px'

      const inputLeft = dv.el('input')
      inputLeft.value = 0
      inputLeft.type = 'number'
      inputLeft.onchange = (e) => {
        inputSize.value = size - e.target.value
        changeButtonVisibility()
      }
      inputLeft.style.width = '50px'

      const onClick = (instance: any) => {
        console.log(instance)
        msgs.push(
          instance.logWithParams([
            pkm.date.getCurrentTime(),
            Math.abs(inputLeft.value),
            name
          ])
        )
        button.style.display = 'none'
        buttonAdd.style.display = 'none'
        buttonRemove.style.display = 'none'
      }

      button.onclick = async () =>
        onClick(pkm.shop.instance)

      buttonAdd.onclick = async () =>
        onClick(pkm.shopAdd.instance)

      buttonRemove.onclick = async () =>
        onClick(pkm.shopRemove.instance)

      rows.push([
        name,
        inputLeft,
        inputSize,
        button,
        buttonAdd,
        buttonRemove
      ])
    })

  dv.table(['Name', 'left', 'size', '', '', ''], rows)

  const buttonLog = dv.el('button', 'log msgs')
  buttonLog.onclick = async (msg: string) => {
    const file = await pkm.getFileByPath(dailyFile.path)
    let editor: Editor = await pkm.getEditorForFile(file)

    if (!editor) {
      await pkm.createNewLeaf(dailyFile.path)
      editor = pkm.getEditorForFile(dailyFile)
    }

    const doc = editor.getDoc()
    const cache = pkm.getCache(dailyFile)

    if (!cache) return

    const position = pkm.getBoudariesOfBlock({
      cache,
      editor,
      name: 'log'
    })

    if (!position) return

    doc.replaceRange(
      msgs.reduce((str, msg) => msg + str, ''),
      {
        line: (position.end.line || 0) + 1,
        ch: 0
      }
    )
  }
}

export default weeklyNote
