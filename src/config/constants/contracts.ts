import { ChainId } from '../../config';

export default {
  wklay: {
    [ChainId.MAINNET]: '',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.KLAYTN]: '',
    [ChainId.BAOBAB]: '0x9330dd6713c8328a8d82b14e3f60a0f0b4cc7bfb',
    [ChainId.TMP]: '0xa548e0db49b7a03c427d9bafbc92b6fc7382d0e7',
  },
  witnet: {
    [ChainId.MAINNET]: '',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.KLAYTN]: '0x1ebD93231a7fE551E1d6405404Df34909eff4c2C',
    [ChainId.BAOBAB]: '0xB4B2E2e00e9d6E5490d55623E4F403EC84c6D33f',
    [ChainId.TMP]: '0x95250dFC15CC25d744c33cC6B458CB3FB6B1Ce3a',
  },
};
