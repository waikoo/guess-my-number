enum RangePreset {
  'ZeroToHundred' = '0-100',
  'ZeroToThousand' = '0-1000',
  'ZeroToTenThousand' = '0-10000',
  'ZeroToHundredThousand' = '0-100000',
  'ZeroToMillion' = '0-1000000',
}
type TRange = RangePreset[]
const range: TRange = Object.values(RangePreset) as TRange;

export const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${prompt}${kleur.green('---❯')} `)
}

import kleur from 'kleur'
import { handleError } from './error'
import  welcomeMessage  from './welcomeMessage'

interface Menu {
  welcomeMessage: string;
  showOnGameOver(guess: number, tries: number): void;
  prompt: string;
  showFeedback(randomNumber: number, answer: string, range: string): void;
  getTip(randomNumber: number, guess: number): string | null;
}

const menu: Menu = {
  welcomeMessage: welcomeMessage,

  showOnGameOver: (guess: number, tries: number): void => {
    const coloredNumber = kleur.bold(kleur.bgMagenta(kleur.black(guess)))
    const message = `  You guessed my number: ${coloredNumber} in ${tries} tries!`
    const coloredMessage = kleur.green(kleur.bold(message))

    console.log(coloredMessage)
  },

  prompt: getPrompt('  - Take a guess '),

  showFeedback(randomNumber: number = 0, answer: string, range: string) {
    const guess = Number(answer)
    let feedback: string | null = ''

    const isError = handleError(answer, range)
    feedback = isError || this.getTip(randomNumber, guess)

    console.log(feedback)
  },

  getTip(randomNumber: number, guess: number): string | null {
    if (randomNumber === guess) return null

    const isGuessSmall = guess < randomNumber
    const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgYellow

    let coloredGuess: string = bgColor(kleur.bold(kleur.black(guess)));
    const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.yellow('big!')
    const message = `${coloredGuess} is too ${bigOrSmall}\n`

    return message
  }
}


export { menu, range }
