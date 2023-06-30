"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const kleur_1 = __importDefault(require("kleur"));
const utils_1 = require("./utils");
var ErrorType;
(function (ErrorType) {
    ErrorType["Main"] = "ERROR";
    ErrorType["InvalidInput"] = "Invalid input";
    ErrorType["NotWithinRange"] = "Not within range";
    ErrorType["InvalidRange"] = "Invalid range";
})(ErrorType || (ErrorType = {}));
const handleError = (answer, range) => {
    let error = '';
    if (range) {
        if (includesNonNumbers(answer))
            error = getInvalidInputError();
        if (isOutOfRange(answer, range))
            error = getRangeError(range);
    }
    else {
        if (isPresetNotValid(answer))
            error = getInvalidRangeError();
    }
    return error;
};
exports.handleError = handleError;
const isPresetNotValid = (answer) => {
    return !/[1-5]/.test(answer);
};
const getInvalidRangeError = (range) => {
    const type = ErrorType.InvalidRange;
    const colorize = (range) => kleur_1.default.red(kleur_1.default.bold(range));
    const [rangeStart, rangeEnd] = getNumbersFromRange(range || '1-5');
    const feedback = `Try a range between ${colorize(rangeStart)} and ${colorize((0, utils_1.formatThousands)(rangeEnd.toString()))}`;
    return getErrorMessage(type, feedback);
};
const getErrorMessage = (type, feedback) => {
    const colorize = (error) => kleur_1.default.bgRed(kleur_1.default.black(kleur_1.default.bold(error)));
    const message = `${ErrorType.Main}: ${type}`;
    return `${colorize(message)} ${feedback}\n`;
};
const includesNonNumbers = (answer) => {
    return answer
        .split('')
        .some(char => isNaN(Number(char)))
        || answer === '';
};
const getInvalidInputError = () => {
    const type = ErrorType.InvalidInput;
    const colorize = (text) => kleur_1.default.bold(kleur_1.default.red(text));
    const feedback = `Try a ${colorize("number")}.`;
    return getErrorMessage(type, feedback);
};
const getNumbersFromRange = (range) => {
    return range.split('-').map(Number);
};
const isOutOfRange = (answer, range) => {
    const guess = Number(answer);
    const [rangeStart, rangeEnd] = getNumbersFromRange(range);
    return guess < rangeStart || guess > rangeEnd;
};
const getRangeError = (range) => {
    const colorize = (number) => kleur_1.default.bold(kleur_1.default.red(number));
    const type = ErrorType.NotWithinRange;
    const [rangeStart, rangeEnd] = range.split('-');
    const feedback = `Try a number between ${colorize(rangeStart)} and ${colorize((0, utils_1.formatThousands)(rangeEnd))}.`;
    return getErrorMessage(type, feedback);
};
