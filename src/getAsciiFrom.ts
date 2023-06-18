import kleur from 'kleur'

interface ColoredAscii {
  text: string[]
  pattern: string
}

const asciiString = {
  text: ["Guess My Number", "0-100"],
  pattern: "+---"
}

const coloredAsciiElement = {
  text1: kleur.magenta(asciiString.text[0]),
  text2: kleur.cyan(asciiString.text[1]),
  pattern: kleur.magenta(asciiString.pattern.slice(0, 1)) + kleur.green(asciiString.pattern.slice(1))
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

export default function getAsciiFrom(coloredAscii: ColoredAscii): string {
  const { text, pattern } = coloredAscii

  let result = ''
  let paddedInput = ''

  const templateRow = getTemplateRow(pattern)

  if (isStringArray(text)) {
    text.forEach((txt: string, i: number) => {
      if (i > 0) {
        result += '\n'
      }
      paddedInput = getPaddedInput(txt, txt === '0-100' ? 3 : 2)
      result += placeTextInMiddle(templateRow, paddedInput)
    })

  } else if (typeof text === 'string') {
    paddedInput = getPaddedInput(text, 2)
  }

  return padAsciiWithRows(result, 1)
}

function getPaddedInput(input: string, padding: number): string {
  const startPad = input.length + padding
  const endPad = startPad + padding
  return input.padStart(startPad, ' ').padEnd(endPad, ' ')
}

function placeTextInMiddle(template: string, input: string): string {
  if (template.length === 0 || input.length === 0) return template;

  const startIndex = Math.floor((template.length - input.length) / 2);
  const endIndex = startIndex + input.length;

  return increasePaddingAroundText(
    replaceTextInRange(template, input, startIndex, endIndex),
    startIndex,
    endIndex
  );
}

function replaceTextInRange(template: string, input: string, startIndex: number, endIndex: number): string {
  return template.substring(0, startIndex) + input + template.substring(endIndex);
}


function increasePaddingAroundText(text: string, startIndex: number, endIndex: number): string {
  const plusIndex = text.indexOf('+', startIndex);
  let lastPlusIndex = text.lastIndexOf('+', endIndex);

  if (plusIndex !== -1 && lastPlusIndex !== -1) {
    for (let i = plusIndex + 1; i < lastPlusIndex; i++) {
      if (text[i] === '-') {
        text = text.substring(0, i) + ' ' + text.substring(i + 1);
        lastPlusIndex++;
      }
    }
  }
  return text;
}

function getTemplateRow(pattern: string) {
  const repeatedPattern = pattern.repeat(9)
  const closingChar = kleur.magenta(asciiString.pattern[0])

  return repeatedPattern + closingChar
}

function padAsciiWithRows(ascii: string, rows: number): string {
  if (rows < 1) return ascii

  const templateRow = getTemplateRow(coloredAsciiElement.pattern);
  if (rows === 1) {
    return `${templateRow}\n${ascii}\n${templateRow}`
  }

  const paddingRows = new Array(rows - 2).fill(templateRow);

  const paddedAscii = [templateRow, ...paddingRows, ascii, ...paddingRows, templateRow];
  return paddedAscii.join('\n');
}
