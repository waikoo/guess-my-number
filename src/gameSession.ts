import { menu } from './menu';
import { rl } from './readlineInterface';
import { GameParams } from './game';
import { AsciiMaker } from './ascii';

export class GameSession {
  private gameParams: GameParams

  constructor(gameParams: GameParams) {
    this.gameParams = gameParams
  }

  public async play(): Promise<void> {
    let { numberOfTries, randomNumber, range, prompt } = this.gameParams;

    console.log(new AsciiMaker(range).getGameStartAscii() + '\n')

    while (true) {
      const answer = await new Promise<string>((resolve) => {
        rl.question(prompt, resolve);
      });

      numberOfTries++;
      menu.showFeedback(randomNumber, answer, range);

      const guess = Number(answer);
      if (guess === randomNumber) {
        this.gameParams.omit.title = true;
        console.log(new AsciiMaker().getGameOverAscii())
        menu.showOnGameOver(guess, numberOfTries);
        return;
      }
    }
  }
}
