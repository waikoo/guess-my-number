import kleur from 'kleur'

interface AsciiContent {
  text: string;
  colored: string[];
  art: string;
  colorize: () => void;
  getColoredText: () => string;
}

interface AsciiStartContent extends AsciiContent {
  range: string;
  getColoredRange: () => string;
}

interface AsciiObject {
  start: AsciiStartContent;
  end: AsciiContent;
}

export const ascii: AsciiObject = {
  start: {
    text: 'Guess My Number',
    range: '0-100',
    colored: [],
    art: '',
    colorize() {
      const asciiArr = this.art.split('')

      asciiArr.forEach((char: string, i: number) => {
        if (char !== '+' && char !== '-') return
        if (char === '+') asciiArr[i] = kleur.magenta(char)
        if (char === '-') {
          if (asciiArr[i - 1] === '0') {
            asciiArr[i] = kleur.cyan(char)
            asciiArr[i + 1] = kleur.cyan(asciiArr[i + 1])
            asciiArr[i + 2] = kleur.cyan(asciiArr[i + 2])
            asciiArr[i + 3] = kleur.cyan(asciiArr[i + 3])
          } else {
            asciiArr[i] = kleur.green(char)
          }
        }
      })
      this.art = asciiArr.join('')
    },
    getColoredText() {
      return kleur.magenta(kleur.bold(ascii.start.text))
    },
    getColoredRange() {
      return kleur.cyan(ascii.start.range)
    }
  },
  end: {
    text: 'YOU WIN!',
    colored: [],
    art: '',
    colorize() {
      const asciiArr = this.art.split('')

      asciiArr.forEach((char: string, index: number) => {
        if (char === '+' || char === '-') {
          const color = char === '+' ? 'green' : 'magenta'
          asciiArr[index] = kleur[color](asciiArr[index])
        }
      })
      this.art = asciiArr.join('')
    },
    getColoredText() {
      return kleur.green(kleur.bold(ascii.end.text))
    }
  },
}

ascii.start.art = ` 
  +---+---+---+---+---+---+---+---+---+
  +---+---+  ${ascii.start.getColoredText()}  +---+---+
  +---+---+---+   ${ascii.start.getColoredRange()}   +---+---+---+
  +---+---+---+---+---+---+---+---+---+
`

ascii.end.art = `
  +---+---+---+---+---+---+---+---+---+
  +---+---+---+  ${ascii.end.getColoredText()} +---+---+---+
  +---+---+---+---+---+---+---+---+---+
`

ascii.start.colorize()
ascii.end.colorize()

