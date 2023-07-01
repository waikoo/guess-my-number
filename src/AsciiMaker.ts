import { range as rangePreset } from './menu'
import { AsciiOptions } from './types'
import { Pattern } from './Pattern'

export class AsciiMaker {
  private customRange: string | null

  constructor(range?: string | undefined) {
    this.customRange = range || null
  }

  public getGameStartAscii() {
    const startOptions: AsciiOptions = {
      title: 'Guess My Number',
      numRows: 4,
      range: this.customRange || rangePreset[0],
    }
    return new Pattern(startOptions).getPattern()
  }

  public getGameOverAscii() {
    const endOptions: AsciiOptions = {
      title: 'YOU WIN!',
      numRows: 3
    }
    return new Pattern(endOptions).getPattern()
  }
}

