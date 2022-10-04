export const splitString = (str: string, length = 10) => {
  console.log(str, length);

  return str.length > length ? str.slice(0, length - 1) + '...' : str;
};
