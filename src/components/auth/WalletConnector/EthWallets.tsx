import React, { useEffect, useState } from 'react';
import { Wallets } from './Wallets';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {
  setEthereum,
  setActivatingConnector,
} from '../../../redux/slices/wallet';
import { injected, kaikas, walletconnect } from '../../../hooks/connectors';

const EthWallets = () => {
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
        setWalletName('metamask');
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(`click ${id}, this is Metamask (Ethereum)`);
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
      } else if (id === 1) {
        setWalletName('walletConnector');
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
        console.log(`click ${id}, this is Wallet Connector (Ethereum)`);
      } else if (id === 2) {
        setWalletName('talken');
        console.log(`click ${id}, this is Talken (Ethereum)`);
      } else {
        setWalletName('kaikas');
        await activate(kaikas, undefined, true);
        await dispatch(setActivatingConnector(kaikas));
        console.log(`click ${id}, this is Kaikas (Ethereum)`);
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

export default EthWallets;
