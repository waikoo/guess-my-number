import kleur from 'kleur'

enum ErrorType {
  Main = 'ERROR',
  InvalidInput = 'Invalid input',
  NotWithinRange = 'Not within range',
}

const handleError = (answer: string, guess: number, range: string): string  => {
  let error = ''

  if (includesNonNumbers(answer)) error = getInvalidInputError()
  if (isOutOfRange(guess, range)) error = getRangeError(range)
  return error
}

const getErrorMessage = (type: string, feedback: string): string => {
  const colorize = (error: string) => kleur.bgRed(kleur.black(kleur.bold(error)))
  const message = `${ErrorType.Main}: ${type}`

  return `${colorize(message)} ${feedback}\n`
}

const includesNonNumbers = (answer: string) => {
  return answer
    .split('')
    .some(char => isNaN(Number(char)))
}

const getInvalidInputError = (): string => {
  const type = ErrorType.InvalidInput
  const colorize = (text: string) => kleur.bold(kleur.red(text))

  const feedback = `Try a ${colorize("number")}.`

  return getErrorMessage(type, feedback)
}

const getNumbersFromRange = (range: string): number[] => range.split('-').map(Number)

const isOutOfRange = (guess: number, range: string) => {
  const [rangeStart, rangeEnd] = getNumbersFromRange(range)
  return guess < rangeStart || guess > rangeEnd
}

const getRangeError = (range: string): string => {
  const colorize = (number: string) => kleur.bold(kleur.red(number))
  const type = ErrorType.NotWithinRange
  const [rangeStart, rangeEnd] = range.split('-')

  const feedback = `Try a number between ${colorize(rangeStart)} and ${colorize(rangeEnd)}.`
  return getErrorMessage(type, feedback)
}

export {
  handleError
}
