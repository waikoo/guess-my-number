import * as crypto from 'crypto';
import playGame from './playGame';
import { AsciiMaker } from './ascii';
import readline, { Key } from 'readline';
import { handleError } from './error';
import { menu, range } from './menu'
console.log(range)
export interface GameParameters {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (_: any, key: Key) => {
  if (key.sequence === '\u0003') process.exit()

  readline.moveCursor(process.stdout, -1, 0)
  readline.clearLine(process.stdout, 1)
  process.stdout.write(key.sequence as string, 'utf-8')
})


class Game {
  private gameParameters: GameParameters

  constructor() {
    this.gameParameters = {
      numberOfTries: 0,
      randomNumber: crypto.randomInt(1, 100),
      range: "",
      prompt: menu.prompt,
    }
  }

  public async start(): Promise<void> {
    const range = await this.selectRange()
    this.gameParameters.range = range
    console.log(new AsciiMaker(range).getGameStartAscii() + '\n')
    playGame(this.gameParameters)
  }

  private async selectRange(): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.question(menu.welcomeMessage, (option: string) => {
        const index = parseInt(option, 10);
        const isValidChoice = index >= 1 && index <= 5
        console.log(range[index- 1])
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
