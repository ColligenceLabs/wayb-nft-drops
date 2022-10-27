export const getRarityToString = (rarity: number) => {
  let result = '';
  switch (rarity) {
    case 1:
      result = 'Normal';
      break;
    case 2:
      result = 'Rare';
      break;
    case 3:
      result = 'Unique';
      break;
    case 4:
      result = 'Epic';
      break;
    case 5:
      result = 'Legend';
      break;
  }
  return result;
};
