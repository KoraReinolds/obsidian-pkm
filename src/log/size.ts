import { ALog } from './model'

export class SizeLog extends ALog {
  _createSize(n: string) {
    return `#size/${n}`
  }

  async display(): Promise<string> {
    return await this.prompt('Quantity', this._createSize)
  }
}
