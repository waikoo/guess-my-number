import * as readline from 'readline';
import { GameParameters } from './game';
import { getPrompt, show } from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export default async function playGame(gameParams: GameParameters): Promise<void> {
  let { numberOfTries, randomNumber, prompt = "   " } = gameParams;

  rl.question(getPrompt(prompt), (answer: string) => {
    const guess: number = parseInt(answer);

    if (isNaN(guess)) {
      show('error')
      playGame(gameParams)
      return
    }
    numberOfTries++
    show('feedback', randomNumber, guess)

    if (guess === randomNumber) {
      show('win', guess)
      rl.close()
    } else playGame({ numberOfTries, randomNumber })
  });
}


