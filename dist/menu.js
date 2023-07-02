"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.menu = exports.padLine = exports.getPrompt = void 0;
const MENU_PADDING = 4;
const getPrompt = (prompt = "") => {
    return kleur_1.default.magenta(`${(0, exports.padLine)()}${prompt}${kleur_1.default.green('---❯')} `);
};
exports.getPrompt = getPrompt;
const padLine = () => ''.padStart(MENU_PADDING, ' ');
exports.padLine = padLine;
const kleur_1 = __importDefault(require("kleur"));
const error_1 = require("./error");
const getWelcomeMessage_1 = __importDefault(require("./getWelcomeMessage"));
const types_1 = require("./types");
const utils_1 = require("./utils");
const range = Object.values(types_1.RangePreset);
exports.range = range;
const menu = {
    welcomeMessage(omitObject) {
        const { title, welcome } = omitObject;
        return welcome ? '' : (0, getWelcomeMessage_1.default)(title);
    },
    prompt: (0, exports.getPrompt)(`- Take a guess `),
    endGamePrompt: (0, exports.getPrompt)(`\n${(0, exports.padLine)()}- Try again? (${kleur_1.default.green(kleur_1.default.bold(`y`))}/${kleur_1.default.red(kleur_1.default.bold(`n`))}) `),
    showFeedback(randomNumber = 0, answer, rangeStr) {
        const guess = Number(answer);
        let feedback = '';
        // if (answer.includes('.') && isValidSegmented(answer, range)) {
        //   return null
        // }
        const isError = (0, error_1.handleError)(answer, rangeStr);
        feedback = isError || this.getTip(randomNumber, guess);
        if (feedback)
            console.log(feedback);
    },
    getTip(randomNumber, guess) {
        if (randomNumber === guess)
            return null;
        const isGuessSmall = guess < randomNumber;
        const bgColor = isGuessSmall ? kleur_1.default.bgRed : kleur_1.default.bgYellow;
        let coloredGuess = bgColor(kleur_1.default.bold(kleur_1.default.black((0, utils_1.formatThousands)(guess))));
        const bigOrSmall = isGuessSmall ? kleur_1.default.red('small!') : kleur_1.default.yellow('big!');
        const message = `${coloredGuess.padStart(2, ' ').padEnd(2, ' ')} is too ${bigOrSmall}\n`;
        return message;
    },
    showError(option) {
        console.log((0, error_1.handleError)(option));
    },
    showOnGameOver: (guess, tries) => {
        const coloredNumber = kleur_1.default.bold(kleur_1.default.bgMagenta(kleur_1.default.black(guess)));
        const message = `\n${(0, exports.padLine)()}You guessed my number: ${coloredNumber} in ${tries} tries!`;
        const coloredMessage = kleur_1.default.green(kleur_1.default.bold(message));
        console.log(coloredMessage);
    },
};
exports.menu = menu;
