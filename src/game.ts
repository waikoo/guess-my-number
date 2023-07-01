import { GameSession } from './gameSession';
import { rl } from './readlineInterface';
import { getPrompt, menu, range } from './menu'
import { isValidChoice, getChosenPreset } from './utils';
import * as crypto from 'crypto';

export type Omit = {
  title: boolean;
  welcome: boolean;
}

export interface GameParams {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt: string;
  omit: Omit;
}

class Game {
  private gameParams: GameParams;

  constructor() {
    this.gameParams = {
      numberOfTries: 0,
      randomNumber: crypto.randomInt(0, 100),
      range: "",
      prompt: menu.prompt,
      omit: {
        title: false,
        welcome: false
      }
    }
  }

  private async selectRange(): Promise<string> {
    let omit = this.gameParams.omit

    while (true) {
      const prompt = menu.welcomeMessage(omit) || getPrompt()

      const chosenPreset = await new Promise<string>((resolve) => {
        rl.question(prompt, resolve);
      });

      if (isValidChoice(chosenPreset)) {
        return range[getChosenPreset(chosenPreset) - 1];
      } else if (chosenPreset === '') {
        return range[0];
      }
      menu.showError(chosenPreset);
      omit = { ...omit, welcome: true }
    }
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
