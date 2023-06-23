import kleur from 'kleur';
import { ascii } from './ascii';
import { handleError } from './error';

const showWinningMessage = (guess: number, tries: number): void => {
  const number = kleur.bold(kleur.bgMagenta(kleur.black(guess)))
  const winningMessage = kleur.green(kleur.bold(`  You guessed my number: ${number} in ${tries} tries!`))

  showAscii('end')
  console.log(winningMessage)
}

const showFeedback = (randomNumber: number = 0, answer: string, range: string)  => {
  const guess = Number(answer)
  let feedback = ''

  const isError = handleError(answer, guess, range)
  feedback = isError || getTip(randomNumber, guess)

  console.log(feedback)
}

const getTip = (randomNumber: number, guess: number): string => {
  if (randomNumber === guess) return ''

  const isGuessSmall = guess < randomNumber
  const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgYellow

  let coloredGuess: string = bgColor(kleur.bold(kleur.black(guess)));
  const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.yellow('big!')
  const message =  `${coloredGuess} is too ${bigOrSmall}\n`

  return message
}

const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${prompt}${kleur.green('---❯')} `)
}
const showAscii = (startOrEnd: "start" | "end") => {
  console.log(ascii[startOrEnd].art)
}
export {
  getTip,
  showFeedback,
  showWinningMessage,
  getPrompt,
  showAscii
}
