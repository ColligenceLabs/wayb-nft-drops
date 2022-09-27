import React from 'react';
import { Wallets } from './Wallets';

const EthWallets = () => {
  const handleClickWallet = (id: number) => {
    if (id === 0) {
      console.log(`click ${id}, this is Metamask (Ethereum)`);
    } else if (id === 1) {
      console.log(`click ${id}, this is Wallet Connector (Ethereum)`);
    } else if (id === 2) {
      console.log(`click ${id}, this is Talken (Ethereum)`);
    } else {
      console.log(`click ${id}, this is Kaikas (Ethereum)`);
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

export default EthWallets;
