import * as crypto from 'crypto';
import playGame from './playGame';
import { AsciiMaker } from './ascii';
import readline from 'readline';
import { handleError } from './error';
import { menu, range } from './menu'

export interface GameParameters {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt: string;
}

class Game {
  private gameParameters: GameParameters
  private rl: readline.Interface

  constructor() {
    this.gameParameters = {
      numberOfTries: 0,
      randomNumber: crypto.randomInt(1, 100),
      range: "",
      prompt: menu.prompt,
    }

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      removeHistoryDuplicates: true,
    })
  }

  public async start(): Promise<void> {
    const range = await this.selectRange()
    this.gameParameters.range = range
    console.log(new AsciiMaker(range).getGameStartAscii() + '\n')
    playGame(this.gameParameters)
  }

  private async selectRange(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.rl.question(menu.welcomeMessage, (option: string) => {
        const index = parseInt(option, 10);
        const isValidChoice = index >= 1 && index <= 5

        if (isValidChoice) resolve(range[index - 1])
        option === '' 
          ? resolve(range[0]) 
          : console.log(handleError(option, range[index - 1]))
      })
    })
  }
}
const game = new Game()
game.start()
