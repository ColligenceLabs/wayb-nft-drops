import React from 'react';
import icon_metamask from '../../../assets/img/icon_metamask.png';
import icon_ethereum2 from '../../../assets/img/icon_ethereum2.png';
import icon_talk from '../../../assets/img/icon_talk.png';
import icon_klaytn from '../../../assets/img/icon_klaytn.png';
import { Wallets } from './Wallets';

const PolygonWallets = () => {
  return (
    <div className="div-wallets_2">
      <div className="row-wallet">
        {Wallets.map((wallet) => (
          <button key={wallet.id} type="button">
            <div className="custom-image">
              <img src={wallet.icon} />
            </div>
            <div className="address-wallet">{wallet.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PolygonWallets;
