"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.menu = exports.padLine = exports.getPrompt = void 0;
var RangePreset;
(function (RangePreset) {
    RangePreset["ZeroToHundred"] = "0-100";
    RangePreset["ZeroToThousand"] = "0-1000";
    RangePreset["ZeroToTenThousand"] = "0-10000";
    RangePreset["ZeroToHundredThousand"] = "0-100000";
    RangePreset["ZeroToMillion"] = "0-1000000";
})(RangePreset || (RangePreset = {}));
const range = Object.values(RangePreset);
exports.range = range;
const getPrompt = (prompt = "") => {
    return kleur_1.default.magenta(`${prompt}${kleur_1.default.green('---❯')} `);
};
exports.getPrompt = getPrompt;
const MENU_PADDING = 4;
const padLine = () => ''.padStart(MENU_PADDING, ' ');
exports.padLine = padLine;
const kleur_1 = __importDefault(require("kleur"));
const error_1 = require("./error");
const welcomeMessage_1 = __importDefault(require("./welcomeMessage"));
const menu = {
    welcomeMessage: welcomeMessage_1.default,
    prompt: (0, exports.getPrompt)(`${(0, exports.padLine)()}- Take a guess `),
    endGamePrompt: (0, exports.getPrompt)(`\n${(0, exports.padLine)()}- Try again? (y/n)`),
    showFeedback(randomNumber = 0, answer, range) {
        const guess = Number(answer);
        let feedback = '';
        const isError = (0, error_1.handleError)(answer, range);
        feedback = isError || this.getTip(randomNumber, guess);
        if (feedback)
            console.log(feedback);
    },
    getTip(randomNumber, guess) {
        if (randomNumber === guess)
            return null;
        const isGuessSmall = guess < randomNumber;
        const bgColor = isGuessSmall ? kleur_1.default.bgRed : kleur_1.default.bgYellow;
        let coloredGuess = bgColor(kleur_1.default.bold(kleur_1.default.black(guess)));
        const bigOrSmall = isGuessSmall ? kleur_1.default.red('small!') : kleur_1.default.yellow('big!');
        const message = `${coloredGuess} is too ${bigOrSmall}\n`;
        return message;
    },
    showError(option) {
        console.log((0, error_1.handleError)(option));
    },
    showOnGameOver: (guess, tries) => {
        const coloredNumber = kleur_1.default.bold(kleur_1.default.bgMagenta(kleur_1.default.black(guess)));
        const message = `\n  You guessed my number: ${coloredNumber} in ${tries} tries!`;
        const coloredMessage = kleur_1.default.green(kleur_1.default.bold(message));
        console.log(coloredMessage);
    },
};
exports.menu = menu;
