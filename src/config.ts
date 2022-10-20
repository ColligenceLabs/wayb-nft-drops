import env from './env';

export const infuraApiKey = env.REACT_APP_INFURA_API_KEY;

export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  BSCMAINNET: 56,
  BSCTESTNET: 97,
  KLAYTN: 8217,
  BAOBAB: 1001,
  TMP: 203,
};

export const NETWORK_NAME = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.ROPSTEN]: 'Ethereum Ropsten',
  [ChainId.RINKEBY]: 'Ethereum Rinkeby',
  [ChainId.KLAYTN]: 'Klaytn Cypress',
  [ChainId.BAOBAB]: 'Klaytn Baobab',
  [ChainId.TMP]: 'Klaytn TMP Testnet',
  [ChainId.BSCMAINNET]: 'Binance Smart Chain Mainnet',
  [ChainId.BSCTESTNET]: 'BSC Testnet',
};

export const SCAN_URL = {
  [ChainId.MAINNET]: 'https://etherscan.io/',
  [ChainId.ROPSTEN]: 'https://ropsten.etherscan.io/',
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io/',
  [ChainId.KLAYTN]: 'https://klaytnfinder.io/',
  [ChainId.BAOBAB]: 'https://baobab.klaytnfinder.io/',
  [ChainId.BSCMAINNET]: 'https://bscscan.com/',
  [ChainId.BSCTESTNET]: 'https://testnet.bscscan.com/',
};

const RPC_URL_1 = `https://mainnet.infura.io/v3/${infuraApiKey}`;
const RPC_URL_3 = `https://ropsten.infura.io/v3/${infuraApiKey}`;
const RPC_URL_4 = `https://rinkeby.infura.io/v3/${infuraApiKey}`;

export const RPC_URLS = {
  [ChainId.MAINNET]: RPC_URL_1,
  [ChainId.ROPSTEN]: RPC_URL_3,
  [ChainId.RINKEBY]: RPC_URL_4,
  [ChainId.BSCMAINNET]: 'https://bsc-dataseed.binance.org',
  [ChainId.BSCMAINNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.BAOBAB]: 'https://api.baobab.klaytn.net:8651',
  [ChainId.KLAYTN]: 'https://public-en.kaikas.io/v1/cypress',
  [ChainId.TMP]: 'https://klaytn.dev.tmpcic.studio',
};

export const IPFS_URL = 'https://ipfs.io/ipfs/';
export const ALT_URL = env.REACT_APP_ALT_URL;
export const SUCCESS = 1;
export const FAILURE = 0;

export const targetNetwork = env.REACT_APP_TARGET_NETWORK_KLAY;
export const targetNetworkMsg = env.REACT_APP_TARGET_NETWORK_MSG;
