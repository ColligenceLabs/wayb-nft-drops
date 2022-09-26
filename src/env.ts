type ENV = {
  REACT_APP_INFURA_API_KEY?: string;
  REACT_APP_API_SERVER: string;
  REACT_APP_ALT_URL?: string;
  REACT_APP_TARGET_NETWORK: number;
  REACT_APP_TARGET_NETWORK_MSG?: string;
  REACT_APP_MBOX_FEE?: number;
  REACT_APP_TREASURY?: string;
};

const development: ENV = {
  REACT_APP_API_SERVER: 'https://mysterybox-api.dev.tmpcic.studio',
  REACT_APP_TARGET_NETWORK: 203, // TMP
  REACT_APP_TREASURY: '',
};

const staging: ENV = {
  REACT_APP_API_SERVER: 'http://127.0.0.1:5001',
  REACT_APP_TARGET_NETWORK: 1001, // BAOBAB
  REACT_APP_TREASURY: '0xdc926E34E73292cD7c48c6fD7375af7D93435D36',
};

const production: ENV = {
  REACT_APP_API_SERVER: '',
  REACT_APP_TARGET_NETWORK: 8217, // CYPRESS
  REACT_APP_TREASURY: '',
};

const env =
  process.env.REACT_APP_PHASE === 'staging'
    ? staging
    : process.env.REACT_APP_PHASE === 'production'
    ? production
    : development;

export default env;
