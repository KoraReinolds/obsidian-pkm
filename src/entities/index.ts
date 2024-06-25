import { Shop } from './shop'
import type { IEntity } from './types'

const modules: Record<
  string,
  new (...args: any[]) => IEntity
> = {
  shop: Shop
}

export { modules }
