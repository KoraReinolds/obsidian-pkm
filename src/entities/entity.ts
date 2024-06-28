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
    const values = await Promise.all(
      this.logStructure.map(
        (name) =>
          new Promise((res) =>
            res(new LogMap[name](app).display())
          )
      )
    )
    const log = `${'>'.repeat(n * 2)} (log:: ${this.token}${values.join(' ')})`
    return log
  }

  async parse(app: TExtendedApp, log: string) {
    const tagRegex = /#[^\s#]+/g
    const tags = log.match(tagRegex)

    return (
      await Promise.all(
        this.logStructure.map((type, index) => {
          return new LogMap[type](app).parse(
            (tags && tags[index]) || log
          )
        })
      )
    ).reduce(
      (res, cur) => ({
        ...res,
        ...cur
      }),
      {}
    )
  }
}
