interface Padding {
  [key: string]: number
}

interface AsciiOptions {
  title: string
  numRows: number
  range?: string
}

enum ErrorType {
  Main = 'ERROR',
  InvalidInput = 'Invalid input',
  NotWithinRange = 'Not within range',
  InvalidRange = 'Invalid range'
}

enum RangePreset {
  'ZeroToHundred' = '0-100',
  'ZeroToThousand' = '0-1000',
  'ZeroToTenThousand' = '0-10000',
  'ZeroToHundredThousand' = '0-100000',
  'ZeroToMillion' = '0-1000000',
}

type TRange = RangePreset[]

type Omit = {
  title: boolean;
  welcome: boolean;
}

interface GameParams {
  numberOfTries: number;
  randomNumber: number;
  range: string;
  prompt: string;
  omit: Omit;
}

export { 
  Omit, 
  GameParams,
  TRange,
  RangePreset,
  ErrorType,
  Padding,
  AsciiOptions
}
