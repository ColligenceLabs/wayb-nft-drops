export const moveToScope = (
  chainId: number | undefined,
  txHash: string | null,
  isContract?: boolean
) => {
  let url = '';
  if (chainId === 1001) {
    url = `https://baobab.scope.klaytn.com/${
      isContract ? 'account' : 'tx'
    }/${txHash}`;
  } else if (chainId === 8217) {
    url = `https://www.klaytnfinder.io/${
      isContract ? 'account' : 'tx'
    }/${txHash}`;
  }

  console.log(url);
  window.open(url, '_blank');
};
