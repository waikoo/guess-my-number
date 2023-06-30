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

const isValidChoice = (presetNum: number) => {
  return presetNum >= 1 && presetNum <= 5
}

const getChosenPreset = (answer: string): number => {
  return parseInt(answer, 10);
}

const getRange = (range: string | undefined, rangePreset: string) => {
  if (range !== rangePreset[0]) return range
  if (range === undefined) return null
  return range
  // if (range === undefined) return rangePreset[0]
}

const padMenuLine = (line: string) => {
  return line.padStart(4, ' ')
}

export {
  formatThousands,
  isValidChoice,
  getChosenPreset,
  getRange,
  padMenuLine
}
