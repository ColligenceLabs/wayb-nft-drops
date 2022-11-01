import React, { useEffect, useState } from 'react';
import { Wallets } from './Wallets';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {
  setActivatingConnector,
  setBinance,
} from '../../../redux/slices/wallet';
import { injected, kaikas, walletconnect } from '../../../hooks/connectors';
import splitAddress from '../../../utils/splitAddress';
import useCreateToken from '../../../hooks/useCreateToken';
import { initDropsAccount } from '../../../redux/slices/account';
import env from '../../../env';

type BinanceWalletsProps = {
  close: any;
};
const BinanceWallets: React.FC<BinanceWalletsProps> = ({ close }) => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account, library } = context;
  const { binance } = useSelector((state: any) => state.wallet);
  const [walletName, setWalletName] = useState('');
  const [connectedWallet, setConnectedWallet] = useState<any | null>(null);
  const [doSign, setDoSign] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');
  const tokenGenerator = useCreateToken(setDoSign);

  useEffect(() => {
    console.log('aa');
    console.log(library);
    console.log(doSign);
    if (library !== undefined && doSign) {
      // createToken();
      dispatch(initDropsAccount());
      tokenGenerator.createToken().then((res) => {
        console.log(res);
        // if (res === 'notIncludeAccount') {
        //   deactivate();
        //   console.log('권한이 없습니다. Talken 관리자에게 연락하세요');
        // } else if (res === 'notRegistered') {
        //   deactivate();
        //   console.log(
        //     '등록되지 않은 사용자입니다. Talken 관리자에게 연락하세요.'
        //   );
        // }
      });
    }
  }, [account, library, doSign]);
  useEffect(() => {
    if (walletName !== '' && account !== '') {
      dispatch(setBinance({ wallet: walletName, address: account }));
    }
  }, [walletName, account]);

  useEffect(() => {
    if (binance !== undefined)
      setConnectedWallet({ value: binance.wallet, address: binance.address });
  }, [binance]);

  const handleClickWallet = async (id: number, value: string) => {
    try {
      setWalletName(value);
      if (id === 0) {
        console.log(`click ${id}, this is Metamask (Binance)`);
        // setWalletName('metamask');
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
      } else if (id === 1) {
        console.log(`click ${id}, this is Wallet Connector (Binance)`);
        // setWalletName('walletConnector');
        const wc = walletconnect(true);
        try {
          await activate(wc, undefined, true);
        } catch (e) {
          setErrMsg(
            `모바일 지갑의 네트워크를 ${
              env.REACT_APP_TARGET_NETWORK_KLAY === 1001 ? 'Baobab' : 'Cypress'
            }(으)로 변경하세요.`
          );
        }
      } else if (id === 2) {
        console.log(`click ${id}, this is Talken (Binance)`);
        // setWalletName('talken');
        const wc = walletconnect(true);
        try {
          await activate(wc, undefined, true);
        } catch (e) {
          setErrMsg(
            `모바일 지갑의 네트워크를 ${
              env.REACT_APP_TARGET_NETWORK_KLAY === 1001 ? 'Baobab' : 'Cypress'
            }(으)로 변경하세요.`
          );
        }
      } else {
        console.log(`click ${id}, this is Kaikas (Binance)`);
        // setWalletName('kaikas');
        await activate(kaikas, undefined, true);
        await dispatch(setActivatingConnector(kaikas));
      }
      window.localStorage.setItem('walletStatus', 'connected');
      if (errMsg.length == 0) close();
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
            <div className="custom-image">
              <img src={wallet.icon} />
            </div>
            <div className="address-wallet">
              {connectedWallet && connectedWallet.value === wallet.value
                ? splitAddress(connectedWallet.address)
                : wallet.name}
            </div>
          </button>
        ))}
      </div>
      {errMsg}
    </div>
  );
};

export default BinanceWallets;
