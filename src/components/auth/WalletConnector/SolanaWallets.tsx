import React from 'react';
import icon_metamask from '../../../assets/img/icon_metamask.png';
import icon_ethereum2 from '../../../assets/img/icon_ethereum2.png';
import icon_talk from '../../../assets/img/icon_talk.png';
import icon_klaytn from '../../../assets/img/icon_klaytn.png';
import { Wallets } from './Wallets';

const SolanaWallets = () => {
  return (
    <div className="div-wallets_2">
      <div className="row">
        {Wallets.map((wallet) => (
          <button key={wallet.id} type="button">
            <img src={wallet.icon}></img>
            {wallet.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SolanaWallets;
