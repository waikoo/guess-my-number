# Guess My Number

This is my version of the number guessing game seen in [The Rust Book](https://doc.rust-lang.org/book/) as I haven't used neither Node nor TypeScript for anything even as useful as a CLI game.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation


To play this game, please ensure you have the following requirements installed:

- [Node.js](https://nodejs.org) (runtime)
- [pnpm](https://pnpm.io/installation) (package manager)

Follow these steps to get started:

1. Clone the repository:
```bash
git clone https://github.com/waikoo/guess-my-number.git
```

2. Open the project directory:
```bash
cd guess-my-number
```

3. Install the dependencies using **pnpm**:
```bash
pnpm i
```

## Usage
#### How to play

### ==Option 1==
To start the game, run the following command:

```bash
pnpm start
```
> *This will compile the code every time you run it leading to a couple of seconds lag.*

### ==Option 2==
Instead of waiting it to compile every time you run the command you can also run the TypeScript compiler:
```bash
tsc
```

Then run:
```bash
node dist/Game.js
```

In the future whenever you want to play, you just run the above command.

## Features

- Choose from a set of 5 ranges to guess my number from: 0 - 100, 0 - 1.000, 0 - 10.000, 0 - 100.000, 0 - 1.000.000
- ASCII art greets you when you start the game and when you win
- The game understands both syntaxes: `1.000` or `1000` for **one thousand**
- Colors everywhere to provide better visual separation
- Error handling for range selection and number guessing
>*If you find a loophole in the error handling, see [Contributing](##Contributing).*
- The chance for infinite play by pressing the bold green `y` at the very end of each game.


## Technologies Used

- Node.js
- TypeScript

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the terms of the MIT License. The full text of the license can be found in the [LICENSE.txt](https://chat.openai.com/c/LICENSE.txt) file.
