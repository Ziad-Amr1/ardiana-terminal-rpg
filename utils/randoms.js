let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let dice = () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  return dice;
};

module.exports = { randomNumber, dice };