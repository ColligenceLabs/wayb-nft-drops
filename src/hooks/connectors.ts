import { InjectedConnector } from '@web3-react/injected-connector';
import { InjectedConnector as KlaytnConnector } from 'klaytn-connector';
import { InjectedConnector as AbcConnector } from 'abc-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ChainId, RPC_URLS } from '../config';
import env from '../env';
import QRCodeModal from 'talken-qrcode-modal';

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.TMP, ChainId.BAOBAB, ChainId.KLAYTN],
});

export const kaikas = new KlaytnConnector({
  supportedChainIds: [ChainId.TMP, ChainId.BAOBAB, ChainId.KLAYTN],
});

export const abc = new AbcConnector({
  supportedChainIds: [ChainId.TMP, ChainId.BAOBAB, ChainId.KLAYTN],
});

export const walletconnect = (useQR: boolean) => {
  // const chainId = parseInt(targetNetwork, 16);
  return new WalletConnectConnector({
    // supportedChainIds: [ChainId.TMP, ChainId.BAOBAB, ChainId.KLAYTN],
    // rpc: { [chainId]: RPC_URLS[chainId] },
    rpc: {
      // [ChainId.BAOBAB]: RPC_URLS[ChainId.BAOBAB],
      // [ChainId.KLAYTN]: RPC_URLS[ChainId.KLAYTN],
      [env.REACT_APP_TARGET_NETWORK_KLAY]:
        RPC_URLS[env.REACT_APP_TARGET_NETWORK_KLAY],
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: useQR,
  });
};

export const talkenwallet = (useQR: boolean) => {
  // const chainId = parseInt(targetNetwork, 16);
  return new WalletConnectConnector({
    // supportedChainIds: [ChainId.TMP, ChainId.BAOBAB, ChainId.KLAYTN],
    // rpc: { [chainId]: RPC_URLS[chainId] },
    rpc: {
      // [ChainId.BAOBAB]: RPC_URLS[ChainId.BAOBAB],
      // [ChainId.KLAYTN]: RPC_URLS[ChainId.KLAYTN],
      [env.REACT_APP_TARGET_NETWORK_KLAY]:
        RPC_URLS[env.REACT_APP_TARGET_NETWORK_KLAY],
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: useQR,
    qrcodeModal: QRCodeModal,
  });
};
