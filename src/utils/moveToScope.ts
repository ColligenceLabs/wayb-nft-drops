export const moveToScope = (chainId: number, txHash: string | null) => {
  let url = '';
  if (chainId === 1001) {
    url = `https://baobab.scope.klaytn.com/tx/${txHash}`;
  } else if (chainId === 8217) {
    url = `https://scope.klaytn.com/tx/${txHash}`;
  }

  window.open(url, '_blank');
};
