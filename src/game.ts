import * as crypto from 'crypto';
import playGame from './playGame';
import { showAscii } from './utils';
import { ascii } from './ascii';

export interface GameParameters {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt?: string;
}

class Game {
  private gameParameters: GameParameters

  constructor() {
    this.gameParameters = {
      numberOfTries: 0,
      randomNumber: crypto.randomInt(1, 100),
      range: ascii.start.range,
      prompt: "  - Take a guess ",
    }
  }

  public start(): void {
    showAscii('start');
    playGame(this.gameParameters)

  }
}
const game = new Game()
game.start()
