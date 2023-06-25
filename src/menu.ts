import kleur from 'kleur'
import { formatThousands } from './utils'

const getPrompt = (prompt: string = ""): string => {
  return kleur.magenta(`${prompt}${kleur.green('---❯')} `)
}

const range = ['0-100', '0-1000', '0-10000', '0-100000', '0-1000000']
const MENU = {
  message: `
  ${kleur.magenta(`
    ${kleur.green(kleur.bold(`WELCOME TO THE GAME!`))}


    ${kleur.magenta(kleur.bold(kleur.underline(`Please select a range option by entering the corresponding number:`)))}`)}

  ${range.map((range, i) => {
    const coloredNumber = kleur.magenta(kleur.bold(i + 1))
    const [start, end] = range.split('-')

    const coloredRange = `${kleur.green(start)} ${kleur.magenta('-')} ${kleur.green(formatThousands(end))}`
    return `  ${coloredNumber}. ${coloredRange}`;
  }).join('\n  ')}

  (Press ${kleur.bold(kleur.magenta('ENTER'))} to select ${kleur.green(range[0])})

  ${getPrompt()}`,
  prompt: '  - Take a guess ',
}


export { MENU, range, getPrompt }
