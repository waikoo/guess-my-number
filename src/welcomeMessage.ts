import kleur from 'kleur'
import { getPrompt, range, padLine } from './menu'
import { formatThousands } from './utils'

const welcomeMessage = 
`${kleur.magenta(
`\n${padLine()}${getTitle()}


${padLine()}${getWelcomePrompt()}

${getPresets()}
${padLine()}${getWhatToPress()}
${padLine()}${getPrompt()} `)
}`


function getTitle(): string {
  const text = `WELCOME TO THE GAME!`
  return kleur.green(kleur.bold(text))
}

function getWelcomePrompt(): string {
  const text = `Please select a range option by entering the corresponding number:`
  return kleur.magenta(kleur.bold(kleur.underline(text)))
}

function getPresets(): string {
  return range.map((range, i) => {
    const coloredNumber = kleur.magenta(kleur.bold(i + 1))
    const [start, end] = range.split('-')

    const coloredRange = `${kleur.green(start)} ${kleur.magenta('-')} ${kleur.green(formatThousands(end))}`
    return `${padLine()}${coloredNumber}. ${coloredRange}`;
  }).join('\n') + '\n'

}

function getWhatToPress(): string {
  const key = kleur.bold(kleur.magenta('ENTER'))
  const coloredRange = kleur.green(range[0])

  return `(Press ${key} to select ${coloredRange})\n`
}

export default welcomeMessage
