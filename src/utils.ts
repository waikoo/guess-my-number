import kleur from "kleur";

const insertDots = (value: string) => {
  const reversed = value.split('').reverse();
  for (let i = 3; i < reversed.length; i += 4) {
    reversed.splice(i, 0, '.');
  }
  return reversed.reverse().join('');
};

const formatThousands = (number: string) => {
  if (number === '') return ''
  const [start, end] = number.split('-');

  return end === undefined
    ? insertDots(start)
    : `${start}-${insertDots(end)}`;
}

const isValidChoice = (presetNum: string) => {
  const number = getChosenPreset(presetNum)
  if (isNaN(number)) return false
  return number >= 1 && number <= 5
}

const getChosenPreset = (answer: string): number => {
  return parseInt(answer, 10);
}

const getRange = (range: string | undefined, rangePreset: string) => {
  if (range !== rangePreset[0]) return range
  if (range === undefined) return null
  return range
}

const padMenuLine = (line: string) => {
  return line.padStart(4, ' ')
}

function formatRange(range: string): string {
  const [start, end] = range.split('-')

  return `${kleur.green(start)} ${kleur.magenta('-')} ${kleur.green(end)}`
}

export {
  formatThousands,
  isValidChoice,
  getChosenPreset,
  getRange,
  padMenuLine,
  formatRange
}
