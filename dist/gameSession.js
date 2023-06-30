"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSession = void 0;
const menu_1 = require("./menu");
const readlineInterface_1 = require("./readlineInterface");
const ascii_1 = require("./ascii");
class GameSession {
    constructor(gameParams) {
        this.gameParams = gameParams;
    }
    async play() {
        let { numberOfTries, randomNumber, range, prompt } = this.gameParams;
        console.log(new ascii_1.AsciiMaker(range).getGameStartAscii() + '\n');
        while (true) {
            const answer = await new Promise((resolve) => {
                readlineInterface_1.rl.question(prompt, resolve);
            });
            numberOfTries++;
            menu_1.menu.showFeedback(randomNumber, answer, range);
            const guess = Number(answer);
            if (guess === randomNumber) {
                console.log(new ascii_1.AsciiMaker().getGameOverAscii());
                menu_1.menu.showOnGameOver(guess, numberOfTries);
                return;
            }
        }
    }
}
exports.GameSession = GameSession;
