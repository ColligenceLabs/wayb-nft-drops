import React, { useState } from 'react';
import icon_ethereum from 'assets/img/icon_ethereum.png';
import icon_klaytn from 'assets/img/icon_klaytn.png';
import icon_solana from 'assets/img/icon_solana.png';
import icon_binance from 'assets/img/icon_binance.png';
import icon_talk from 'assets/img/icon_talk.png';
import icon_ethereum2 from 'assets/img/icon_ethereum2.png';
import icon_metamask from 'assets/img/icon_metamask.png';
import EthWallets from './EthWallets';
import KlaytnWallets from './KlaytnWallets';
import SolanaWallets from './SolanaWallets';
import BinanceWallets from './BinanceWallets';

const NetworkList = [
  {
    id: 0,
    network: 'ethereum',
    network_name: 'Ethereum',
    icon: icon_ethereum,
  },
  {
    id: 1,
    network: 'klaytn',
    network_name: 'Klaytn',
    icon: icon_klaytn,
  },
  {
    id: 2,
    network: 'solana',
    network_name: 'Solana',
    icon: icon_solana,
  },
  {
    id: 3,
    network: 'binance',
    network_name: 'Binance',
    icon: icon_binance,
  },
];

type WalletConnectorProp = {
  close: any;
  onConfirm: any;
};
const WalletConnector: React.FC<WalletConnectorProp> = ({
  close,
  onConfirm,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState(0);

  const changeNetwork = (id: number) => {
    if (id === 2) return;
    setSelectedNetwork(id);
  };

  return (
    <div className="login_form" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="box-content">
        <div className="div-title">
          <div className="title">Connect Wallet</div>
          <button onClick={close} className="button-close">
            <svg
              className="sc-6c80924e-4 eTDRlh"
              xmlns="http://www.w3.org/2000/svg"
              width="24.329"
              height="24.329"
              viewBox="0 0 24.329 24.329"
            >
              <path
                id="Path_84708"
                data-name="Path 84708"
                d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z"
                transform="translate(-5 -5)"
                fill="#fff"
              ></path>
            </svg>
          </button>
        </div>

        <form>
          <div className="box-input">
            <div className="div-wallets_1">
              {NetworkList.map((network: any) => (
                <button
                  className={selectedNetwork === network.id ? 'active' : ''}
                  key={network.id}
                  type="button"
                  onClick={() => changeNetwork(network.id)}
                >
                  <img src={network.icon}></img>
                  {network.network_name}
                </button>
              ))}
            </div>
            {selectedNetwork === 0 && <EthWallets />}
            {selectedNetwork === 1 && <KlaytnWallets />}
            {selectedNetwork === 2 && <SolanaWallets />}
            {selectedNetwork === 3 && <BinanceWallets />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletConnector;