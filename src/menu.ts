const MENU_PADDING = 4

export const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${padLine()}${prompt}${kleur.green('---❯')} `)
}

export const padLine = () => ''.padStart(MENU_PADDING, ' ')

import kleur from 'kleur'
import { handleError } from './error'
import getWelcomeMessage from './getWelcomeMessage'
import { Omit, TRange, RangePreset } from './types'
import { formatThousands, isValidSegmented } from './utils'

const range: TRange = Object.values(RangePreset) as TRange;

interface Menu {
  welcomeMessage(omitObject: Omit): string;
  prompt: string;
  endGamePrompt: string;
  showFeedback(randomNumber: number, answer: string, range: string): void;
  getTip(randomNumber: number, guess: number): string | null;
  showOnGameOver(guess: number, tries: number): void;
  showError(option: string): void;
}

const menu: Menu = {
  welcomeMessage(omitObject: Omit): string {
    const { title, welcome } = omitObject

    return welcome ? '' : getWelcomeMessage(title)
  },
  prompt: getPrompt(`- Take a guess `),
  endGamePrompt: getPrompt(`\n${padLine()}- Try again? (${kleur.green(kleur.bold(`y`))}/${kleur.red(kleur.bold(`n`))}) `),

  showFeedback(randomNumber: number = 0, answer: string, rangeStr: string) {
    const guess = Number(answer)
    let feedback: string | null = ''

    // if (answer.includes('.') && isValidSegmented(answer, range)) {
    //   return null
    // }
    const isError = handleError(answer, rangeStr)
    feedback = isError || this.getTip(randomNumber, guess)

    if (feedback) console.log(feedback)
  },

  getTip(randomNumber: number, guess: number): string | null {
    if (randomNumber === guess) return null

    const isGuessSmall = guess < randomNumber
    const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgYellow

    let coloredGuess: string = 
      bgColor(
        kleur.bold(kleur.black(
          formatThousands(guess)
        ))
      );

    const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.yellow('big!')
    const message = `${coloredGuess.padStart(2, ' ').padEnd(2, ' ')} is too ${bigOrSmall}\n`

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


export { menu, range, Menu, Omit }
