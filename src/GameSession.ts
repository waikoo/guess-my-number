import { menu } from './menu';
import { rl } from './readlineInterface';
import { GameParams } from './types';
import { AsciiMaker } from './AsciiMaker';
import { isValidSegmented, removeSegmentation } from './utils'
import { range as rangeArr } from './menu'

export class GameSession {
  private gameParams: GameParams

  constructor(gameParams: GameParams) {
    this.gameParams = gameParams
  }

  public async play(): Promise<void> {
    let { numberOfTries, randomNumber, range, prompt } = this.gameParams;

    console.log(new AsciiMaker(range).getGameStartAscii() + '\n')

    while (true) {
      const userInput = await new Promise<string>((resolve) => {
        rl.question(prompt, resolve);
      });

      numberOfTries++;

      let guess;
      let sanitizedUserInput: string | null = userInput;
      if (isValidSegmented(userInput, rangeArr)) {
        const sanitized = removeSegmentation(userInput);
        if (sanitized !== null) {
          sanitizedUserInput = sanitized;
          guess = Number(sanitizedUserInput);
        }
      } else {
        guess = Number(userInput);
      }

      if (guess === randomNumber) {
        this.gameParams.omit.title = true;
        console.log(new AsciiMaker().getGameOverAscii())
        menu.showOnGameOver(guess, numberOfTries);
        return;
      }

      menu.showFeedback(randomNumber, sanitizedUserInput, range);
    }


  }
}
