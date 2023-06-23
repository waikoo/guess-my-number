import * as crypto from 'crypto';
import playGame from './playGame';
import { show } from './utils';

export interface GameParameters {
  numberOfTries: number;
  randomNumber: number;
  prompt?: string;
}

const gameParameters: GameParameters = {
  numberOfTries: 3,
  randomNumber: crypto.randomInt(1, 100),
  prompt: "  - Take a guess "
}

function startGame(): void {
  show('asciiStart');
  playGame(gameParameters)
}

startGame()
