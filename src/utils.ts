import kleur from 'kleur';
import { ascii } from './ascii';

const options = {
  asciiStart: () => ascii.start.art,
  asciiEnd: () => ascii.end.art,
  error: () => getErrorMessage(),
  feedback: (...params: number[]) => getFeedback(...params),
  win: (...params: number[]) => getWinningMessage(...params)
}

const show = (param: keyof typeof options, ...args: number[]) => {
  if (param.split('').includes('ascii')) {
    console.log(options[param])
  } else {
    console.log(options[param](...args));
  }
}

const getWinningMessage = (...params: number[]): string => {
  const [guess] = params

  const winningMessage = kleur.bold(kleur.bgGreen(kleur.black(guess))) + kleur.green(' was my number!')
  show("asciiEnd")
  return winningMessage
}
const getFeedback = (...params: number[]): string => {
  const [randomNumber = 0, guess = 0] = params

  return randomNumber === 0 && guess === 0
    ? getErrorMessage()
    : getTip(randomNumber, guess)
}

const getErrorMessage = (): string => {
  const coloredNumber = kleur.bold(kleur.red("number"))
  const error = kleur.bgRed(kleur.black(kleur.bold("ERROR: Invalid input")))
  return `${error} Try a ${coloredNumber}.\n`
}

const getTip = (randomNumber: number, guess: number): string => {
  // if (randomNumber === guess) return ''
  const isGuessSmall = guess < randomNumber
  const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgCyan

  let coloredGuess: string = bgColor(kleur.bold(kleur.black(guess)));
  const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.cyan('big!')
  return `${coloredGuess} is too ${bigOrSmall}\n`
}

const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${prompt}${kleur.yellow('---❯')} `)
}

export {
  show,
  getPrompt,
  getFeedback,
}
