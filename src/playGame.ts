import * as readline from 'readline';
import { GameParameters } from './game';
import { menu } from './menu';
import { handleError } from './error';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


export default async function playGame(gameParams: GameParameters): Promise<void> {
  let { numberOfTries, randomNumber, range, prompt } = gameParams;

  rl.on('line', (line) => {
    if (line === '') {
      console.log('online')
      handleError(line, range)// test run
      playGame({ numberOfTries, randomNumber, range, prompt })
    }
  })

  const answer = await new Promise<string>((resolve) => {
    rl.question(prompt, resolve);
  });

  numberOfTries++;
  menu.showFeedback(randomNumber, answer, range);

  const guess = Number(answer);
  if (guess === randomNumber) {
    menu.showOnGameOver(guess, numberOfTries);
    rl.close();
    return;
  }

  await playGame({ numberOfTries, randomNumber, range, prompt });
}
