import { GameSession } from './gameSession';
import { AsciiMaker } from './ascii';
import { rl } from './readlineInterface';
import { menu, range } from './menu'
import { isValidChoice, getChosenPreset } from './utils';
import * as crypto from 'crypto';

export interface GameParams {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt: string;
}

class Game {
  private gameParams: GameParams;

  constructor() {
    this.gameParams = {
      numberOfTries: 0,
      randomNumber: crypto.randomInt(0, 100),
      range: "",
      prompt: menu.prompt,
    }
  }

  private async selectRange(): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.question(menu.welcomeMessage, (option: string) => {
        if (isValidChoice(getChosenPreset(option))) {
          resolve(range[getChosenPreset(option) - 1])
        }

        option === ''
          ? resolve(range[0])
          : menu.showError(option)
      })
    })
  }

  public setParams(range: string): void {
    this.gameParams.range = range
    this.gameParams.randomNumber = crypto.randomInt(0, Number(range.split('-')[1]))
  }

  public async start(): Promise<void> {
    this.setParams(await this.selectRange())

    await new GameSession(this.gameParams).play()

    const answer = await new Promise<string>((resolve) => {
      rl.question(menu.endGamePrompt, resolve)
    })

    answer.toLowerCase() === 'y'
      ? this.start()
      : rl.close()
  }
}

const game = new Game()
game.start()
