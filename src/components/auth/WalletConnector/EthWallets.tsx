import React, { useEffect, useState } from 'react';
import { Wallets } from './Wallets';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {
  setEthereum,
  setActivatingConnector,
} from '../../../redux/slices/wallet';
import { injected, kaikas, walletconnect } from '../../../hooks/connectors';
import splitAddress from '../../../utils/splitAddress';

const EthWallets = () => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account } = context;
  const { ethereum } = useSelector((state: any) => state.wallet);
  const [walletName, setWalletName] = useState('');
  const [connectedWallet, setConnectedWallet] = useState<any | null>(null);

  useEffect(() => {
    if (walletName !== '' && account !== '') {
      dispatch(setEthereum({ wallet: walletName, address: account }));
    }
  }, [walletName, account]);

  useEffect(() => {
    if (ethereum !== undefined)
      setConnectedWallet({ value: ethereum.wallet, address: ethereum.address });
  }, [ethereum]);

  const handleClickWallet = async (id: number, value: string) => {
    try {
      setWalletName(value);
      if (id === 0) {
        // setWalletName(value);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(`click ${id}, this is Metamask (Ethereum)`);
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
      } else if (id === 1) {
        // setWalletName(value);
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
        console.log(`click ${id}, this is Wallet Connector (Ethereum)`);
      } else if (id === 2) {
        // setWalletName(value;
        console.log(`click ${id}, this is Talken (Ethereum)`);
      } else {
        // setWalletName(value;
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
            className={
              connectedWallet && connectedWallet.value === wallet.value
                ? 'active'
                : ''
            }
            type="button"
            onClick={() => handleClickWallet(wallet.id, wallet.value)}
          >
            <img src={wallet.icon}></img>
            {connectedWallet && connectedWallet.value === wallet.value
              ? splitAddress(connectedWallet.address)
              : wallet.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EthWallets;
