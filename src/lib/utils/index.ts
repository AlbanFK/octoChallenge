const snakeCase = (text: string) => {
  return text
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

const countOccurrences = (arr: Array<any>, val: any) => {
  return arr.reduce((acc, elem) => {
    if (elem === val) {
      acc++;
    }
    return acc;
  }, 0);
};

export { snakeCase, countOccurrences };
