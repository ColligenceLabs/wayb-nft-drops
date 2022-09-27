import React, { useEffect, useState } from 'react';
import icon_metamask from '../../../assets/img/icon_metamask.png';
import icon_ethereum2 from '../../../assets/img/icon_ethereum2.png';
import icon_talk from '../../../assets/img/icon_talk.png';
import icon_klaytn from '../../../assets/img/icon_klaytn.png';
import { Wallets } from './Wallets';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected, kaikas, walletconnect } from '../../../hooks/connectors';
import {
  setActivatingConnector,
  setEthereum,
} from '../../../redux/slices/wallet';

const KlaytnWallets = () => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account } = context;
  // const { ethereum } = useSelector((state) => state.wallets);
  const [walletName, setWalletName] = useState('');

  useEffect(() => {
    if (walletName !== '' && account !== '') {
      dispatch(setEthereum({ wallet: walletName, address: account }));
    }
  }, [walletName, account]);

  const handleClickWallet = async (id: number) => {
    try {
      if (id === 0) {
        console.log(`click ${id}, this is Metamask (Klaytn)`);
        setWalletName('metamask');
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
      } else if (id === 1) {
        console.log(`click ${id}, this is Wallet Connector (Klaytn)`);
        setWalletName('walletConnector');
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
      } else if (id === 2) {
        console.log(`click ${id}, this is Talken (Klaytn)`);
        setWalletName('talken');
      } else {
        console.log(`click ${id}, this is Kaikas (Klaytn)`);
        setWalletName('kaikas');
        await activate(kaikas, undefined, true);
        await dispatch(setActivatingConnector(kaikas));
      }
    } catch (e) {
      console.log('connect wallet error', e);
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

export default KlaytnWallets;
