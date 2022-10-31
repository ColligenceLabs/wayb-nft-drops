import React, { useEffect, useState } from 'react';
import icon_ethereum from 'assets/img/icon_ethereum.png';
import icon_klaytn from 'assets/img/icon_klaytn.png';
import icon_solana from 'assets/img/icon_solana.png';
import icon_binance from 'assets/img/icon_binance.png';
import icon_polygon from 'assets/icon/icon_polygon.png';
import carbon_close from 'assets/icon/carbon_close.svg';
import EthWallets from './EthWallets';
import KlaytnWallets from './KlaytnWallets';
import PolygonWallets from './PolygonWallets';
import BinanceWallets from './BinanceWallets';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

const NetworkList = [
  {
    id: 0,
    network: 'ethereum',
    network_name: 'Ethereum',
    icon: icon_ethereum,
  },
  {
    id: 1,
    network: 'binance',
    network_name: 'BNB Chain',
    icon: icon_binance,
  },
  {
    id: 2,
    network: 'polygon',
    network_name: 'Polygon',
    icon: icon_polygon,
  },
  {
    id: 3,
    network: 'klaytn',
    network_name: 'Klaytn',
    icon: icon_klaytn,
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
  const [selectedNetwork, setSelectedNetwork] = useState(3);
  const [showTooltip, setShowTooltip] = useState(true);
  const wallet = useSelector((state: any) => state.wallet);
  const changeNetwork = (id: number) => {
    if (id === 0 || id === 2) return;
    setSelectedNetwork(id);
  };

  const handeTooltip = (show: boolean, id: number) => {
    if (id === 0 || id === 2) {
      if (show) setShowTooltip(show);
      else {
        setShowTooltip(false);
        setTimeout(() => setShowTooltip(true), 5);
      }
    } else {
      setShowTooltip(false);
      setTimeout(() => setShowTooltip(true), 5);
    }
  };

  const getClassName = (network: any) => {
    let className = '';
    if (network.id == 0 || network.id == 2) className = 'unused';
    else {
      if (
        network.network === 'klaytn' &&
        wallet.klaytn.address &&
        wallet.klaytn.address !== ''
      ) {
        className = 'active';
      } else if (
        network.network === 'binance' &&
        wallet.binance.address &&
        wallet.binance.address !== ''
      ) {
        className = 'active';
      }

      if (network.id === selectedNetwork) {
        className = className === 'active' ? `${className}` : `focused`;
      }
    }
    return className;
  };
  return (
    <div className="login_form" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="box-content">
        <div className="div-title">
          <div className="title">Connect Wallet</div>
          <button onClick={close} className="button-close">
            <img src={carbon_close} alt="Icon close" />
          </button>
        </div>
        <div className="line"></div>
        <form>
          <div className="box-input">
            <div className="box-top">
              <div className="div-wallets_1">
                {NetworkList.map((network: any) => (
                  <button
                    // className={`${
                    //   selectedNetwork === network.id
                    //     ? ' active'
                    //     : network.id == 0 || network.id == 2
                    //     ? 'unused'
                    //     : ''
                    // }`}
                    className={getClassName(network)}
                    key={network.id}
                    type="button"
                    data-tip
                    data-for={network.network_name}
                    onClick={() => changeNetwork(network.id)}
                    onMouseEnter={() => handeTooltip(true, network.id)}
                    onMouseLeave={() => handeTooltip(false, network.id)}
                  >
                    <div className="custom-image">
                      <img src={network.icon} />
                    </div>
                    <div className="network-name">{network.network_name}</div>
                    {showTooltip && (network.id === 2 || network.id === 0) && (
                      <ReactTooltip
                        id={network.network_name}
                        // place="top"
                        effect="solid"
                        backgroundColor="white"
                        textColor="black"
                      >
                        Coming soon..
                      </ReactTooltip>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {selectedNetwork === 0 && <EthWallets />}
            {selectedNetwork === 1 && <BinanceWallets close={close} />}
            {selectedNetwork === 2 && <PolygonWallets />}
            {selectedNetwork === 3 && <KlaytnWallets close={close} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletConnector;
