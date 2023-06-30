"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = __importDefault(require("kleur"));
const menu_1 = require("./menu");
const utils_1 = require("./utils");
const welcomeMessage = `${kleur_1.default.magenta(`${(0, menu_1.padLine)()}${getTitle()}


${(0, menu_1.padLine)()}${getWelcomePrompt()}

${(0, menu_1.padLine)()}${getPresets()}
${(0, menu_1.padLine)()}${getWhatToPress()}
${(0, menu_1.padLine)()}${(0, menu_1.getPrompt)()} `)}`;
function getTitle() {
    const text = `WELCOME TO THE GAME!`;
    return kleur_1.default.green(kleur_1.default.bold(text));
}
function getWelcomePrompt() {
    const text = `Please select a range option by entering the corresponding number:`;
    return kleur_1.default.magenta(kleur_1.default.bold(kleur_1.default.underline(text)));
}
function getPresets() {
    return menu_1.range.map((range, i) => {
        const coloredNumber = kleur_1.default.magenta(kleur_1.default.bold(i + 1));
        const [start, end] = range.split('-');
        const coloredRange = `${kleur_1.default.green(start)} ${kleur_1.default.magenta('-')} ${kleur_1.default.green((0, utils_1.formatThousands)(end))}`;
        return `  ${coloredNumber}. ${coloredRange}`;
    }).join('\n  ') + '\n';
}
function getWhatToPress() {
    const key = kleur_1.default.bold(kleur_1.default.magenta('ENTER'));
    const coloredRange = kleur_1.default.green(menu_1.range[0]);
    return `(Press ${key} to select ${coloredRange})\n`;
}
exports.default = welcomeMessage;
