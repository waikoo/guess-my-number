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

const gameParameters: GameParameters = {
  numberOfTries: 0,
  randomNumber: crypto.randomInt(1, 100),
  range: ascii.start.range,
  prompt: "  - Take a guess ",
}

function startGame(): void {
  showAscii('start');
  playGame(gameParameters)
}

startGame()
