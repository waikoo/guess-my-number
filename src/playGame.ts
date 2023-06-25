import * as readline from 'readline';
import { GameParameters } from './game';
import { showFeedback, showWinningMessage} from './utils';
import {getPrompt} from './menu'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export default async function playGame(gameParams: GameParameters): Promise<void> {
  let { numberOfTries, randomNumber, range, prompt = "   " } = gameParams;

  const answer = await new Promise<string>((resolve) => {
    rl.question(getPrompt(prompt), resolve);
  });

  numberOfTries++;
  showFeedback(randomNumber, answer, range);

  const guess = Number(answer);
  if (guess === randomNumber) {
    showWinningMessage(guess, numberOfTries);
    rl.close();
    return;
  }

  await playGame({ numberOfTries, randomNumber, range });
}
