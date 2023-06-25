import kleur from 'kleur'
import { formatThousands } from './utils'
import { range as rangePreset } from './menu'

export class AsciiFactory {
  private customRange: string = rangePreset[0]

  constructor(range: string) {
    this.customRange = range
  }
  get getArt() {
    return new AsciiStart(this.customRange).getArt
  }
}

class AsciiStart {
  private customRange: string;
  private coloredCustomRange: string
  private title: string = 'Guess My Number'
  private coloredTitle: string = kleur.magenta(kleur.bold(this.title))

  constructor(range: string) {
    this.customRange = range
    this.coloredCustomRange = kleur.green(formatThousands(this.customRange))
  }

  get getArt() {
    return new Pattern(this.customRange, this.coloredCustomRange, this.coloredTitle).getPattern(4)
  }
}

class Pattern {
  private pattern = '+---+---+---+---+---+---+---+---+---+'
  private jaggedPattern = this.getColored('+---+---+ +---+---+')
  private coloredPattern = this.getColored(this.pattern)
  private customRange: string
  private coloredCustomRange: string
  private coloredTitle: string

  constructor(customRange: string, coloredCustomRange: string, coloredTitle: string) {
    this.customRange = customRange
    this.coloredCustomRange = coloredCustomRange
    this.coloredTitle = coloredTitle
  }

  public getPattern(numRows: number) {
    const coloredPlacedTitle = this.placeInPattern(this.coloredTitle, 'Guess')
    const coloredPlacedRange = this.placeInPattern(this.coloredCustomRange, this.customRange)

    const art = [this.coloredPattern, coloredPlacedTitle]
    if (numRows === 4) art.push(coloredPlacedRange)
    art.push(this.coloredPattern)

    return art.join('\n')
  }

  private placeInPattern(coloredString: string, range: string): string {

    const padding: { [key: string]: number }= {
      Guess: 2,
      '0-1000000': 4,
      '0-100000': 5,
      '0-10000': 5,
      '0-1000': 6,
      '0-100': 7,
    }

    const [start, end] = this.jaggedPattern.split(' ')
    const padNr = padding[range]
    const stringWithEndPad = `${start}${this.getPadded(coloredString, padNr, range === '0-10000')}${end}`
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
  // getEndAscii(): string {
  //   const title = 'YOU WIN!'
  //   const art = this.generateArt(title, 3)
  //   const coloredArt = this.colorize(art)
  //
  //   return coloredArt
  // }
