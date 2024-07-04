export default async () => {
  const data: string[] = [
    // 'size prot fats carbs name'
  ]

  function parseData(data: string[]) {
    return data.map((item) => {
      const parts = item.split(' ')

      const size = parseFloat(parts[0])
      const proteins = parseFloat(parts[1])
      const fats = parseFloat(parts[2])
      const carbohydrates = parseFloat(parts[3])

      const name = parts.slice(5).join(' ')

      return {
        name,
        size,
        proteins,
        fats,
        carbohydrates
      }
    })
  }

  const products = parseData(data)

  for (const product of products) {
    const fileName = `Food/${product.name}.md`

    const existingFile =
      app.vault.getAbstractFileByPath(fileName)
    console.log(existingFile)
    if (existingFile) {
      return
    }
    const fileContent = `---
  aliases: []
  date created: Tuesday, April 16th 2024, 8:26:32 pm
  date modified: Sunday, June 2nd 2024, 9:28:34 pm
  pfc_carbohydrates: ${product.carbohydrates}
  pfc_fats: ${product.fats}
  pfc_proteins: ${product.proteins}
  portion_size: 1
  tags: []
  ---`
    await app.vault.create(fileName, fileContent)
  }
}
