import React from 'react';
import icon_metamask from '../../../assets/img/icon_metamask.png';
import icon_ethereum2 from '../../../assets/img/icon_ethereum2.png';
import icon_talk from '../../../assets/img/icon_talk.png';
import icon_klaytn from '../../../assets/img/icon_klaytn.png';
import { Wallets } from './Wallets';

const BinanceWallets = () => {
  const handleClickWallet = (id: number) => {
    if (id === 0) {
      console.log(`click ${id}, this is Metamask (Binance)`);
    } else if (id === 1) {
      console.log(`click ${id}, this is Wallet Connector (Binance)`);
    } else if (id === 2) {
      console.log(`click ${id}, this is Talken (Binance)`);
    } else {
      console.log(`click ${id}, this is Kaikas (Binance)`);
    }
  };
  return (
    <div className="div-wallets_2">
      <div className="row">
        {Wallets.map((wallet) => (
          <button
            key={wallet.id}
            type="button"
            onClick={() => handleClickWallet(wallet.id)}
          >
            <img src={wallet.icon}></img>
            {wallet.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BinanceWallets;
