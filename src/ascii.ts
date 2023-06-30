import kleur from 'kleur'
import { formatThousands } from './utils'
import { range as rangePreset } from './menu'

interface Padding {
  [key: string]: number
}

interface AsciiOptions {
  title: string
  numRows: number
  range?: string
}

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

class Pattern {
  private pattern: {
    template: string
    jagged: string
    coloredTemplate: string
  }
  private range: {
    custom?: string
    coloredCustom: string
  }
  private coloredTitle: string
  private numRows: number
  private padding: Padding

  constructor(startOptions: AsciiOptions) {
    const { title, range, numRows } = startOptions

    this.pattern = {
      template: '+---+---+---+---+---+---+---+---+---+',
      coloredTemplate: '',
      jagged: this.getColored('+---+---+ +---+---+'),
    }
    this.pattern.coloredTemplate = this.getColored(this.pattern.template),
    this.range = {
      custom: range,
      coloredCustom: ''
    },
    this.range.coloredCustom = kleur.green(formatThousands(this.range.custom || ''))
    // is regular title needed?
    this.coloredTitle = kleur.magenta(kleur.bold(title))
    this.numRows = numRows

    this.padding = {
      Guess: 2,
      'YOU WIN!': 5,
      '0-1000000': 4,
      '0-100000': 5,
      '0-10000': 5,
      '0-1000': 6,
      '0-100': 7,
    }
  }

  public getPattern() {
    const coloredPlacedTitle = this.placeInPattern(this.coloredTitle, 
    this.numRows === 4 ? 'Guess' : 'YOU WIN!')
    const coloredPlacedRange = this.placeInPattern(this.range.coloredCustom, this.range.custom || '')

    const art = [this.pattern.coloredTemplate, coloredPlacedTitle]
    if (this.numRows === 4) art.push(coloredPlacedRange)
    art.push(this.pattern.coloredTemplate)

    return art
      .map(line => `    ${line}`)
      .join('\n')
  }

  private placeInPattern(coloredString: string, range: string): string {
    if (range === '') return ''

    const [start, end] = this.pattern.jagged.split(' ')
    const padNr = this.padding[range]
    const isRange = range === '0-10000'
    const isUneven = this.numRows === 4 ? isRange : true
    const stringWithEndPad = `${start}${this.getPadded(coloredString, padNr, isUneven)}${end}`
    return stringWithEndPad
  }

  private getPadded(string: string, padding: number, isUneven: boolean = false): string {
    const pad = ' '.repeat(padding)
    const startPad = isUneven ? pad + ' ' : pad
    const textInPattern = `${startPad}${string}${pad}`
    return textInPattern
  }

  private getColored(pattern: string, isInversed: boolean = false): string {
    return pattern
      .split('')
      .map((char: string) => {
        if (char === '+') {
          return isInversed ? kleur.magenta(char) : kleur.green(char)
        } else if (char === '-') {
          return isInversed ? kleur.green(char) : kleur.magenta(char)
        } else {
          return char
        }
      })
      .join('')
  }
}
