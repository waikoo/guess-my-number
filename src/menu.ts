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

const MENU_PADDING = 4
export const padLine = () => ''.padStart(MENU_PADDING, ' ')

import kleur from 'kleur'
import { handleError } from './error'
import welcomeMessage from './welcomeMessage'

interface Menu {
  welcomeMessage: string;
  prompt: string;
  endGamePrompt: string;
  showFeedback(randomNumber: number, answer: string, range: string): void;
  getTip(randomNumber: number, guess: number): string | null;
  showOnGameOver(guess: number, tries: number): void;
  showError(option: string): void;
}

const menu: Menu = {
  welcomeMessage: welcomeMessage,
  prompt: getPrompt(`${padLine()}- Take a guess `),
  endGamePrompt: getPrompt(`\n${padLine()}- Try again? (y/n)`),

  showFeedback(randomNumber: number = 0, answer: string, range: string) {
    const guess = Number(answer)
    let feedback: string | null = ''

    const isError = handleError(answer, range)
    feedback = isError || this.getTip(randomNumber, guess)

    if (feedback) console.log(feedback)
  },

  getTip(randomNumber: number, guess: number): string | null {
    if (randomNumber === guess) return null

    const isGuessSmall = guess < randomNumber
    const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgYellow

    let coloredGuess: string = bgColor(kleur.bold(kleur.black(guess)));
    const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.yellow('big!')
    const message = `${coloredGuess} is too ${bigOrSmall}\n`

    return message
  },

  showError(option: string): void {
    console.log(handleError(option))
  },

  showOnGameOver: (guess: number, tries: number): void => {
    const coloredNumber = kleur.bold(kleur.bgMagenta(kleur.black(guess)))
    const message = `\n${padLine()}You guessed my number: ${coloredNumber} in ${tries} tries!`
    const coloredMessage = kleur.green(kleur.bold(message))

    console.log(coloredMessage)
  },

}


export { menu, range }
