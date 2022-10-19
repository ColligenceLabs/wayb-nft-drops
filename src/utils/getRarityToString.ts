export const getRarityToString = (rarity: number) => {
  let result = '';
  switch (rarity) {
    case 0:
      result = 'Normal';
      break;
    case 1:
      result = 'Rare';
      break;
    case 2:
      result = 'Unique';
      break;
    case 3:
      result = 'Epic';
      break;
    case 4:
      result = 'Legend';
      break;
  }
  return result;
};
