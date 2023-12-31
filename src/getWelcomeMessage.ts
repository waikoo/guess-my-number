import kleur from 'kleur'
import { getPrompt, range, padLine } from './menu'
import { formatRange, formatThousands } from './utils'

const getWelcomeMessage = (omitTitle: boolean) => {
  return (
`${kleur.magenta(
`\n${omitTitle ?  '' : getTitle()}
${getWelcomePrompt()}

${getPresets()}
${getWhatToPress()}
${getPrompt()} `
)}`
  )
}

function getTitle(): string {
  const text = `${padLine()}WELCOME TO THE GAME!\n`
  return kleur.green(kleur.bold(text))
}

function getWelcomePrompt(): string {
  const text = `Please select a range option by entering the corresponding number:`
  const coloredText = kleur.magenta(kleur.bold(kleur.underline(`${text}`)))
  return `${padLine()}${coloredText}`
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

  return `${padLine()}(Press ${key} to select ${formatRange(range[0])})\n`
}

export default getWelcomeMessage
