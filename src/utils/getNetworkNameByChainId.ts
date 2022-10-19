export const getNetworkNameByChainId = (chainId: number | undefined) => {
  let result = '';

  if (chainId) {
    if (chainId === 8217 || chainId === 1001) {
      result = 'Klaytn';
    } else if (chainId === 1 || chainId === 3) {
      result = 'Ethereum';
    } else if (chainId === 56 || chainId === 97) {
      result = 'Binance';
    }
  } else {
    result = '-';
  }

  return result;
};
