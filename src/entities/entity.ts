import type { IEntity, IEntityParams } from './types'

export class AEntity implements IEntity {
  token: string

  constructor(params: IEntityParams) {
    this.token = params.token
  }

  log(values: string[], n: number = 1): string {
    return `${'>'.repeat(n * 2)} (log:: ${this.token} ${values.join(' ')})`
  }
}
