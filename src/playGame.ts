import * as readline from 'readline';
import { GameParameters } from './game';
import { showFeedback, showWinningMessage, getPrompt } from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// export default async function playGame(gameParams: GameParameters): Promise<void> {
//   let { numberOfTries, randomNumber, range, prompt = "   " } = gameParams;
//
//   rl.question(getPrompt(prompt), (answer: string) => {
//     numberOfTries++
//     showFeedback(randomNumber, answer, range)
//     
//     const guess = parseInt(answer)
//     if (guess === randomNumber) {
//       showWinningMessage(guess, numberOfTries)
//       rl.close()
//       return
//     }
//     playGame({ numberOfTries, randomNumber, range })
//   });
// }


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
