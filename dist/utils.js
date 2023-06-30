"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padMenuLine = exports.getRange = exports.getChosenPreset = exports.isValidChoice = exports.formatThousands = void 0;
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
    return presetNum >= 1 && presetNum <= 5;
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
    // if (range === undefined) return rangePreset[0]
};
exports.getRange = getRange;
const padMenuLine = (line) => {
    return line.padStart(4, ' ');
};
exports.padMenuLine = padMenuLine;
