import type { IEntity, IEntityParams } from './types'
import { LogMap, type ELog } from '@/log/types'
import type { TExtendedApp } from '@/types'

export class AEntity implements IEntity {
  token: string
  logStructure: ELog[]

  constructor(params: IEntityParams) {
    this.token = params.token
    this.logStructure = params.logStructure
  }

  async log(
    app: TExtendedApp,
    n: number = 1
  ): Promise<string> {
    console.log(await new LogMap['time']().display(app))
    const values = await Promise.all(
      this.logStructure.map(
        (name) =>
          new Promise((res) =>
            res(new LogMap[name]().display(app))
          )
      )
    )
    return `${'>'.repeat(n * 2)} (log:: ${this.token} ${values.join(' ')})`
  }
}
