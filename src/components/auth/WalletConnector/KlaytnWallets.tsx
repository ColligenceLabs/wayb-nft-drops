import React, { useEffect, useState } from 'react';
import { Wallets } from './Wallets';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected, kaikas, walletconnect } from '../../../hooks/connectors';
import {
  setActivatingConnector,
  setKlaytn,
} from '../../../redux/slices/wallet';
import splitAddress from '../../../utils/splitAddress';
import useCreateToken from 'hooks/useCreateToken';
import { initDropsAccount } from '../../../redux/slices/account';
import env from '../../../env';

type KlaytnWalletsProps = {
  close: any;
};
const KlaytnWallets: React.FC<KlaytnWalletsProps> = ({ close }) => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account, library } = context;
  const { klaytn } = useSelector((state: any) => state.wallet);
  const [walletName, setWalletName] = useState('');
  const [connectedWallet, setConnectedWallet] = useState<any | null>(null);
  const [doSign, setDoSign] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');

  const tokenGenerator = useCreateToken(setDoSign);

  useEffect(() => {
    if (walletName !== '' && account !== '') {
      dispatch(setKlaytn({ wallet: walletName, address: account }));
    }
  }, [walletName, account]);

  useEffect(() => {
    if (klaytn !== undefined)
      setConnectedWallet({ value: klaytn.wallet, address: klaytn.address });
  }, [klaytn]);

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

  const handleClickWallet = async (id: number, value: string) => {
    try {
      setWalletName(value);
      if (id === 0) {
        console.log(`click ${id}, this is Metamask (Klaytn)`);
        // setWalletName('metamask');
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
      } else if (id === 1) {
        console.log(`click ${id}, this is Wallet Connect (Klaytn)`);
        // setWalletName('walletConnector');
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
      } else if (id === 2) {
        console.log(`click ${id}, this is Talken (Klaytn)`);
        // setWalletName('talken');
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
      } else {
        console.log(`click ${id}, this is Kaikas (Klaytn)`);
        // setWalletName('kaikas');
        await activate(kaikas, undefined, true);
        await dispatch(setActivatingConnector(kaikas));
      }
      window.localStorage.setItem('walletStatus', 'connected');
      setDoSign(true);
      close();
    } catch (e: any) {
      console.log('connect wallet error : ', e);
      const error: string = e.message;
      if (error.includes('Unsupported'))
        setErrMsg(
          `모바일 지갑의 네트워크를 ${
            env.REACT_APP_TARGET_NETWORK_KLAY === 1001 ? 'Baobab' : 'Cypress'
          }(으)로 변경하세요.`
        );
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
      <div className="error-message">{errMsg}</div>
    </div>
  );
};

export default KlaytnWallets;
