import readline from 'readline'

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
