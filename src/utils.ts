import kleur from "kleur";

const insertDots = (value: string) => {
  const reversed = value.split('').reverse();
  for (let i = 3; i < reversed.length; i += 4) {
    reversed.splice(i, 0, '.');
  }
  return reversed.reverse().join('');
};

const formatThousands = (number: string | number) => {
  if (typeof number === 'number') {
    return insertDots(number.toString())
  }

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

const isValidSegmented = (number: string, range: string[]) => {
  const rangeCaps = range.map(number => number.split('-')[1])
  if (rangeCaps.some(num => number === num)) return true

  if (number[0] === '.' || number[number.length - 1] === '.') {
    return false
  }

  if (number.includes('-')) {
    return number.split('-')[1].includes('.')
  }

  return number.includes('.')
}

const removeSegmentation = (number: string) => {
  if (Number(number.replaceAll('.', ''))) {
    return number.replaceAll('.', '')
  } else {
    return null
  }
}

export {
  formatThousands,
  isValidChoice,
  isValidSegmented,
  removeSegmentation,
  getChosenPreset,
  getRange,
  padMenuLine,
  formatRange,
}
