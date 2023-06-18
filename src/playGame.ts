import * as readline from 'readline';
import kleur from 'kleur';
// import getAsciiArt from './getAsciiArt';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export default async function playGame(randomNumber: number, prompt: string = "  "): Promise<void> {

  rl.question(getPrompt(prompt), (answer: string) => {
    const guess: number = parseInt(answer);
    if (isNaN(guess)) {
      console.log(getFeedback())
      playGame(randomNumber, prompt)
      return
    }
    console.log(getFeedback(randomNumber, guess))

    guess !== randomNumber ? playGame(randomNumber) : rl.close()
  });
}

const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${prompt}${kleur.yellow('---❯')} `)
}

const getFeedback = (randomNumber: number = 0, guess: number = 0): string => {
  if (guess === randomNumber) {
    return 'ENDING ASCII ART'
    // return getAsciiArt('ending config object')
  }

  return randomNumber === 0 && guess === 0
    ? getErrorMessage()
    : getTip(randomNumber, guess)
}

const getErrorMessage = (): string => {
  return `Try a ${kleur.bold(kleur.red("number"))}:  `
}

const getTip = (randomNumber: number, guess: number): string => {
  let message: string = `${kleur.bgCyan(kleur.bold(kleur.black(guess)))} is too`;


  return `${message} ${guess > randomNumber ? kleur.cyan('big!') : kleur.red('small!')}`
}
