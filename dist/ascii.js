"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsciiMaker = void 0;
const kleur_1 = __importDefault(require("kleur"));
const utils_1 = require("./utils");
const menu_1 = require("./menu");
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
        return new Pattern(startOptions).getPattern();
    }
    getGameOverAscii() {
        const endOptions = {
            title: 'YOU WIN!',
            numRows: 3
        };
        return new Pattern(endOptions).getPattern();
    }
}
exports.AsciiMaker = AsciiMaker;
class Pattern {
    constructor(startOptions) {
        const { title, range, numRows } = startOptions;
        this.pattern = {
            template: '+---+---+---+---+---+---+---+---+---+',
            coloredTemplate: '',
            jagged: this.getColored('+---+---+ +---+---+'),
        };
        this.pattern.coloredTemplate = this.getColored(this.pattern.template),
            this.range = {
                custom: range,
                coloredCustom: ''
            },
            this.range.coloredCustom = kleur_1.default.green((0, utils_1.formatThousands)(this.range.custom || ''));
        // is regular title needed?
        this.coloredTitle = kleur_1.default.magenta(kleur_1.default.bold(title));
        this.numRows = numRows;
        this.padding = {
            Guess: 2,
            'YOU WIN!': 5,
            '0-1000000': 4,
            '0-100000': 5,
            '0-10000': 5,
            '0-1000': 6,
            '0-100': 7,
        };
    }
    getPattern() {
        const coloredPlacedTitle = this.placeInPattern(this.coloredTitle, this.numRows === 4 ? 'Guess' : 'YOU WIN!');
        const coloredPlacedRange = this.placeInPattern(this.range.coloredCustom, this.range.custom || '');
        const art = [this.pattern.coloredTemplate, coloredPlacedTitle];
        if (this.numRows === 4)
            art.push(coloredPlacedRange);
        art.push(this.pattern.coloredTemplate);
        return art
            .map(line => `    ${line}`)
            .join('\n');
    }
    placeInPattern(coloredString, range) {
        if (range === '')
            return '';
        const [start, end] = this.pattern.jagged.split(' ');
        const padNr = this.padding[range];
        const isRange = range === '0-10000';
        const isUneven = this.numRows === 4 ? isRange : true;
        const stringWithEndPad = `${start}${this.getPadded(coloredString, padNr, isUneven)}${end}`;
        return stringWithEndPad;
    }
    getPadded(string, padding, isUneven = false) {
        const pad = ' '.repeat(padding);
        const startPad = isUneven ? pad + ' ' : pad;
        const textInPattern = `${startPad}${string}${pad}`;
        return textInPattern;
    }
    getColored(pattern, isInversed = false) {
        return pattern
            .split('')
            .map((char) => {
            if (char === '+') {
                return isInversed ? kleur_1.default.magenta(char) : kleur_1.default.green(char);
            }
            else if (char === '-') {
                return isInversed ? kleur_1.default.green(char) : kleur_1.default.magenta(char);
            }
            else {
                return char;
            }
        })
            .join('');
    }
}
