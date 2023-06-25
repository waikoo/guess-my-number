import kleur from 'kleur';
// import { Ascii } from './ascii';
import { handleError } from './error';

const showWinningMessage = (guess: number, tries: number): void => {
  const number = kleur.bold(kleur.bgMagenta(kleur.black(guess)))
  const winningMessage = kleur.green(kleur.bold(`  You guessed my number: ${number} in ${tries} tries!`))

  // TODO:
  // showAscii('end')
  // const ascii = new Ascii('0-100').getEndAscii()
  // show(ascii);

  console.log(winningMessage)
}

const showFeedback = (randomNumber: number = 0, answer: string, range: string) => {
  const guess = Number(answer)
  let feedback: string | null = ''

  const isError = handleError(answer, range)
  feedback = isError || getTip(randomNumber, guess)

  console.log(feedback)
}

const getTip = (randomNumber: number, guess: number): string | null => {
  if (randomNumber === guess) return null

  const isGuessSmall = guess < randomNumber
  const bgColor = isGuessSmall ? kleur.bgRed : kleur.bgYellow

  let coloredGuess: string = bgColor(kleur.bold(kleur.black(guess)));
  const bigOrSmall = isGuessSmall ? kleur.red('small!') : kleur.yellow('big!')
  const message = `${coloredGuess} is too ${bigOrSmall}\n`

  return message
}

const insertDots = (value: string) => {
  const reversed = value.split('').reverse();
  for (let i = 3; i < reversed.length; i += 4) {
    reversed.splice(i, 0, '.');
  }
  return reversed.reverse().join('');
};

const formatThousands = (number: string) => {
  const [start, end] = number.split('-');

  return end === undefined
    ? insertDots(start)
    : `${start}-${insertDots(end)}`;
}

export {
  getTip,
  showFeedback,
  showWinningMessage,
  formatThousands,
}
