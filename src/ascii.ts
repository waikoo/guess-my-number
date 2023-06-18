type AsciiObject = {
  start: {
    text: string;
    range: string;
    art: string;
  };
  end: {
    text: string;
    art: string;
  };
};

export const ascii: AsciiObject = {
  start: {
    text: 'Guess My Number',
    range: '0-100',
    art: ''
  },
  end: {
    text: 'YOU WIN!',
    art: ''
  }
}

ascii.start.art = ` 
  +---+---+---+---+---+---+---+---+---+
  +---+---+  ${ascii.start.text}  +---+---+
  +---+---+---+   ${ascii.start.range}   +---+---+---+
  +---+---+---+---+---+---+---+---+---+
`

ascii.end.art = `
  +---+---+---+---+---+---+---+---+---+
  +---+---+---+  ${ascii.end.text}  +---+---+---+
  +---+---+---+---+---+---+---+---+---+
`
