import kleur from 'kleur'
import { formatThousands } from './utils'

enum ErrorType {
  Main = 'ERROR',
  InvalidInput = 'Invalid input',
  NotWithinRange = 'Not within range',
  InvalidRange = 'Invalid range'
}

const handleError = (answer: string, range?: string): string => {
  let error = ''

  if (range) {
    if (includesNonNumbers(answer)) error = getInvalidInputError()
    if (isOutOfRange(answer, range)) error = getRangeError(range)
  } else {
    if (isPresetNotValid(answer)) error = getInvalidRangeError()
  }

  return error
}

const isPresetNotValid = (answer: string) => {
  return !/[1-5]/.test(answer)
}

const getInvalidRangeError = (range?: string): string => {
  const type = ErrorType.InvalidRange
  const colorize = (range: number | string) => kleur.red(kleur.bold(range))

  const [rangeStart, rangeEnd] = getNumbersFromRange(range || '1-5')

  const feedback = `Try a range between ${
    colorize(rangeStart)
  } and ${
    colorize(formatThousands(rangeEnd.toString()))
  }`

  return getErrorMessage(type, feedback)
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
    || answer === ''
}

const getInvalidInputError = (): string => {
  const type = ErrorType.InvalidInput
  const colorize = (text: string) => kleur.bold(kleur.red(text))

  const feedback = `Try a ${colorize("number")}.`

  return getErrorMessage(type, feedback)
}

const getNumbersFromRange = (range: string): number[] => {
  return range.split('-').map(Number)
}

const isOutOfRange = (answer: string, range: string) => {
  const guess = Number(answer)
  const [rangeStart, rangeEnd] = getNumbersFromRange(range)

  return guess < rangeStart || guess > rangeEnd
}

const getRangeError = (range: string): string => {
  const colorize = (number: string) => kleur.bold(kleur.red(number))
  const type = ErrorType.NotWithinRange
  const [rangeStart, rangeEnd] = range.split('-')

  const feedback = `Try a number between ${colorize(rangeStart)} and ${colorize(formatThousands(rangeEnd))}.`
  return getErrorMessage(type, feedback)
}

export {
  handleError
}
