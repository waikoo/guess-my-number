const insertDots = (value: string) => {
  const reversed = value.split('').reverse();
  for (let i = 3; i < reversed.length; i += 4) {
    reversed.splice(i, 0, '.');
  }
  return reversed.reverse().join('');
};

const formatThousands = (number: string) => {
  if (number === '') return ''
  const [start, end] = number.split('-');

  return end === undefined
    ? insertDots(start)
    : `${start}-${insertDots(end)}`;
}

export {
  formatThousands,
}
