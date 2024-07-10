export default async () => {
  const data: string[] = [
    // 'size prot fats carbs name'
    '358 7.4 8.4 17.1 паста с говядиной',
    '387 7.2 7 11.5 курица с соусовм и овощи с сыром',
    '306 7.6 16.2 12.6 пирог с фаршем и овощами',
    '340 5.4 5.3 16.1 булгур с овощами и булочка',
    '260 6 12.8 7.9 омлет крем и картофель',
    '329 7 11.7 1.9 скрэмбл с овощами',
    '357 4.7 7.2 7.6 суп пюре кукурузный с гренками и курица',
    '258 6.6 11.4 15 боул с курицей и рисом',
    '287 8 4.6 11.2 курица с соусом и киноа',
    '151 5.5 20.2 21.7 начос гуакомоле и соус',
    '324 8.1 8.8 12.5 творожный десерт и йогурт с цукатами',
    //
    '220 2.1 6.4 10.4 грибной суп пюре',
    '320 2.3 7.8 13.1 каша рисовая и крем',
    '365 3.7 8 12.2 каша овсянная',
    '196 6 10.9 17.4 оладьи с овощами и соусом',
    '260 9.8 12.8 12.9 десерт творожный с орехами',
    '331 8.4 6.5 21.3 куриный рулет с грибами и рисом',
    '303 11 7.4 11.9 шницель с картофелем',
    '333 7.9 7.2 15.8 курица в соусе терияки и рис',
    '478 5.9 9.4 10.8 котлета и пюре',
    '298 7.6 10 18.2 запеканка двуслойная и ягоды',
    '270 7.2 10.2 13.7 салат с курицей',
    '292 5.6 10.4 17.6 спагетти двух сортов и карбонара',
    '244 13.3 13.1 14.1 чикенсы и горчичный соус'
  ]

  function parseData(data: string[]) {
    return data.map((item) => {
      const parts = item.split(' ')

      const size = parseFloat(parts[0]) - 15
      const proteins = parseFloat(parts[1])
      const fats = parseFloat(parts[2])
      const carbohydrates = parseFloat(parts[3])

      const name = 'gf ' + parts.slice(5).join(' ')

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

  console.log(
    products
      .map(
        (p) =>
          `>> (log:: 🛒 #time/10/22 #size/${p.size} [[${p.name}]]`
      )
      .join('\n')
  )

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
