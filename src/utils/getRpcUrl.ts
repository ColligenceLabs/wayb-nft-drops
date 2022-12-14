import { ChainId } from '../config';

// Array of available nodes to connect to

export const nodesMainnet =
  'https://mainet.infura.io/v3/adb9c847d7114ee7bf83995e8f22e098';
export const nodesRopsten =
  'https://ropsten.infura.io/v3/adb9c847d7114ee7bf83995e8f22e098';
export const nodesCypress = 'https://klaytn.talken.io:8651';
export const nodesBaobab = 'https://public-node-api.klaytnapi.com/v1/cypress';
export const nodesBscmain = 'https://bsc-dataseed.binance.org';
export const nodesBsctest = 'https://data-seed-prebsc-1-s1.binance.org:8545';

export const getSelectedNodeUrl = (chainId: number) => {
  switch (chainId) {
    case ChainId.MAINNET:
      return nodesMainnet;
    case ChainId.ROPSTEN:
      return nodesRopsten;
    case ChainId.KLAYTN:
      return nodesCypress;
    case ChainId.BAOBAB:
      return nodesBaobab;
    case ChainId.BSCMAINNET:
      return nodesBscmain;
    case ChainId.BSCTESTNET:
      return nodesBsctest;
    default:
      return nodesCypress;
  }
};

export default getSelectedNodeUrl;
