import { ALog } from './model'

export class SizeLog extends ALog<{ size: number }> {
  async parse(data: string): Promise<{ size: number }> {
    return await { size: +data.split('/')[1] }
  }

  _createSize(n: string) {
    return `#size/${n}`
  }

  async display(): Promise<string> {
    return await this.pkm.prompt(
      'Quantity',
      this._createSize
    )
  }
}
