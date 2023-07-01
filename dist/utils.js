"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRange = exports.padMenuLine = exports.getRange = exports.getChosenPreset = exports.isValidChoice = exports.formatThousands = void 0;
const kleur_1 = __importDefault(require("kleur"));
const insertDots = (value) => {
    const reversed = value.split('').reverse();
    for (let i = 3; i < reversed.length; i += 4) {
        reversed.splice(i, 0, '.');
    }
    return reversed.reverse().join('');
};
const formatThousands = (number) => {
    if (number === '')
        return '';
    const [start, end] = number.split('-');
    return end === undefined
        ? insertDots(start)
        : `${start}-${insertDots(end)}`;
};
exports.formatThousands = formatThousands;
const isValidChoice = (presetNum) => {
    const number = getChosenPreset(presetNum);
    if (isNaN(number))
        return false;
    return number >= 1 && number <= 5;
};
exports.isValidChoice = isValidChoice;
const getChosenPreset = (answer) => {
    return parseInt(answer, 10);
};
exports.getChosenPreset = getChosenPreset;
const getRange = (range, rangePreset) => {
    if (range !== rangePreset[0])
        return range;
    if (range === undefined)
        return null;
    return range;
};
exports.getRange = getRange;
const padMenuLine = (line) => {
    return line.padStart(4, ' ');
};
exports.padMenuLine = padMenuLine;
function formatRange(range) {
    const [start, end] = range.split('-');
    return `${kleur_1.default.green(start)} ${kleur_1.default.magenta('-')} ${kleur_1.default.green(end)}`;
}
exports.formatRange = formatRange;
