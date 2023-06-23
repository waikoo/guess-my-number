import kleur from 'kleur'

const handleError = (answer: string, guess: number, range: string): string  => {
  let error = ''

  if (includesNonNumbers(answer)) error = getInvalidInputError()
  if (isOutOfRange(guess, range)) error = getRangeError(range)
  return error
}

const getErrorMessage = (type: string, feedback: string): string => {
  const error = kleur.bgRed(kleur.black(kleur.bold(`ERROR: ${type}`)))

  return `${error} ${feedback}\n`
}

const includesNonNumbers = (answer: string) => {
  return answer
    .split('')
    .some(char => isNaN(Number(char)))
}

const getInvalidInputError = (): string => {
  const type = 'Invalid input'

  const coloredNumber = kleur.bold(kleur.red("number"))
  const feedback = `Try a ${coloredNumber}.`

  return getErrorMessage(type, feedback)
}

const getNumbersFromRange = (range: string): number[] => range.split('-').map(Number)

const isOutOfRange = (guess: number, range: string) => {
  const [rangeStart, rangeEnd] = getNumbersFromRange(range)
  return guess < rangeStart || guess > rangeEnd
}

const getRangeError = (range: string): string => {
  const getColored = (number: string) => kleur.bold(kleur.red(number))
  const type = 'Not within range'
  const [rangeStart, rangeEnd] = range.split('-')

  const feedback = `Try a number between ${getColored(rangeStart)} and ${getColored(rangeEnd)}.`
  return getErrorMessage(type, feedback)
}

export {
  handleError
}
