import { ALog } from './model'

export class SizeLog extends ALog {
  async parse(data: string): Promise<number> {
    const sizeRegex = /#size\/(\d+)/

    const sizeMatch = data.match(sizeRegex)
    if (sizeMatch) {
      return parseInt(sizeMatch[1])
    }

    throw new Error("Can't parse size at " + data)
  }

  displayWithParams(params: number): string {
    return this._createSize(params)
  }

  _createSize(n: string | number) {
    return `#size/${n}`
  }

  async display(): Promise<string> {
    return await this.pkm.prompt(
      'Quantity',
      this._createSize
    )
  }
}
