import * as crypto from 'crypto';
import playGame from './playGame';
import kleur from 'kleur'
import getAsciiFrom from './getAsciiFrom';

const asciiString = {
  text: ["Guess My Number", "0-100"],
  pattern: "+---"
}

const coloredAscii = {
  text: [kleur.magenta(asciiString.text[0]), kleur.cyan(asciiString.text[1])],
  pattern: kleur.magenta(asciiString.pattern.slice(0, 1)) + kleur.green(asciiString.pattern.slice(1))
}

console.log(getAsciiFrom(coloredAscii));

const randomNumber: number = crypto.randomInt(1, 100)
const prompt: string = "  - Take a guess "

playGame(randomNumber, prompt)
