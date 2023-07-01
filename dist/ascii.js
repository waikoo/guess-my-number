"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsciiMaker = void 0;
const menu_1 = require("./menu");
const Pattern_1 = __importDefault(require("./Pattern"));
class AsciiMaker {
    constructor(range) {
        this.customRange = range || null;
    }
    getGameStartAscii() {
        const startOptions = {
            title: 'Guess My Number',
            numRows: 4,
            range: this.customRange || menu_1.range[0],
        };
        return new Pattern_1.default(startOptions).getPattern();
    }
    getGameOverAscii() {
        const endOptions = {
            title: 'YOU WIN!',
            numRows: 3
        };
        return new Pattern_1.default(endOptions).getPattern();
    }
}
exports.AsciiMaker = AsciiMaker;
