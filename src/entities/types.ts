export interface IEntity {
  token: string
  log(values: string[]): string
}

export interface IEntityParams {
  token: string
}
