function getRandomNumber() {
  const min = 9000;
  const max = 12000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;