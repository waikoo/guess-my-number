"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameSession_1 = require("./gameSession");
const readlineInterface_1 = require("./readlineInterface");
const menu_1 = require("./menu");
const utils_1 = require("./utils");
const crypto = __importStar(require("crypto"));
class Game {
    constructor() {
        this.gameParams = {
            numberOfTries: 0,
            randomNumber: crypto.randomInt(0, 100),
            range: "",
            prompt: menu_1.menu.prompt,
        };
    }
    async selectRange() {
        return new Promise((resolve) => {
            readlineInterface_1.rl.question(menu_1.menu.welcomeMessage, (option) => {
                if ((0, utils_1.isValidChoice)((0, utils_1.getChosenPreset)(option))) {
                    resolve(menu_1.range[(0, utils_1.getChosenPreset)(option) - 1]);
                }
                option === ''
                    ? resolve(menu_1.range[0])
                    : menu_1.menu.showError(option);
            });
        });
    }
    setParams(range) {
        this.gameParams.range = range;
        this.gameParams.randomNumber = crypto.randomInt(0, Number(range.split('-')[1]));
    }
    async start() {
        this.setParams(await this.selectRange());
        await new gameSession_1.GameSession(this.gameParams).play();
        const answer = await new Promise((resolve) => {
            readlineInterface_1.rl.question(menu_1.menu.endGamePrompt, resolve);
        });
        answer.toLowerCase() === 'y'
            ? this.start()
            : readlineInterface_1.rl.close();
    }
}
const game = new Game();
game.start();
