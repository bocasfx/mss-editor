const palette = [
  "#f8b595",
  "#f67280",
  "#c06c84",
  "#6c5b7c",
  "#355c7d",
  '#cbf078',
  '#f8f398',
  '#f1b963',
  '#e46161',
  '#ff5d9e',
  '#8f71ff',
  '#82acff',
  '#8bffff',
];

let idx = 0;

const getRandomColor = () => {
  const randomIndex = idx % palette.length;
  idx += 1;
  return palette[randomIndex];
};

export { getRandomColor };
