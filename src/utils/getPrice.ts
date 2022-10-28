export const getPrice = (price: number, quote: string) => {
  if (price) return `${price.toLocaleString()} ${quote}`;
  else return 'Free';
};
