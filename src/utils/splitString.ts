export const splitString = (str: string, length = 10) => {
  return str.length > length ? str.slice(0, length - 1) + '...' : str;
};
