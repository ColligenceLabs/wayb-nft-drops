import React from 'react';
import ReactModal from 'react-modal';
import logo_talken from '../../assets/img/logo_header.png';
import wallet from '../../assets/icon/wallet.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import dot_connected from '../../assets/icon/dot_connected.svg';
import metamask from '../../assets/icon/metamask.svg';
import walletconnectIcon from '../../assets/icon/walletconnect.png';
import env from '../../env';
import { ChainId } from '../../config';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected, kaikas, walletconnect } from '../../hooks/connectors';
import { setActivatingConnector } from '../../redux/slices/wallet';
import { setupNetwork } from '../../utils/wallet';

import { useModalWalletsStore } from 'components/common/AppStore';

const DialogWallets = () => {
  const { isOpen, updateOpenWallet } = useModalWalletsStore();
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, chainId, account } = context;

  const onClickConnect = async (id: string) => {
    console.log(`Click Wallet Button(id) : ${id}`);
    // Check Blockchain Network first
    const targetNetwork = env.REACT_APP_TARGET_NETWORK_KLAY ?? ChainId.KLAYTN;
    try {
      if (chainId !== targetNetwork) {
        await setupNetwork(targetNetwork);
      }
    } catch (e) {
      console.log('change network error', e);
    }

    // Activate Wallet next
    try {
      if (id === '0') {
        // await activate(injected, undefined, true);
        // dispatch(setActivatingConnector(injected));
        // window.localStorage.setItem('wallet', 'injected');
        console.log('click Talken Wallet');
      } else if (id === '1') {
        await activate(injected, undefined, true);
        dispatch(setActivatingConnector(injected));
        window.localStorage.setItem('wallet', 'injected');
        // const wc = walletconnect(true);
        // await activate(wc, undefined, true);
        // window.localStorage.setItem('wallet', 'walletconnect');
      } else if (id === '2') {
        console.log('click WalletConnect');
      }
      // todo 인중 후 데이터 처리
      // dispatch(setCompany(testCompanyInfo));
      // navigate('/games');
    } catch (e) {
      console.log('connect wallet error', e);
    }

    window.localStorage.setItem('walletStatus', 'connected');
    console.log(`selected chain : ${chainId}, account: ${account}`);
    updateOpenWallet(false);
  };

  return (
    <ReactModal
      preventScroll={true}
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={() => updateOpenWallet(false)}
      className="Modal"
      overlayClassName="dialog-wallets-overlay"
      shouldCloseOnOverlayClick
    >
      <div className="dialog-wallets">
        <div className="wrapper-header">
          <div className="title">
            <img src={wallet} alt="icon wallet" />
            <div>My Wallets</div>
          </div>
          <div
            className="close-button button"
            onClick={() => updateOpenWallet(false)}
          >
            <img src={close_icon} alt="close icon" />
          </div>
        </div>
        <div className="choose-connect">
          Choose one or more accounts to connect
        </div>
        <div className="wrapper-accounts">
          <button
            className="account-item button"
            onClick={() => onClickConnect('0')}
          >
            <div className="wrapper-left">
              <div className="logo-item logo-talken">
                <img src={logo_talken} alt="logo talken" />
              </div>
              Talken Wallet
            </div>
            <div className="wrapper-right">
              <img src={dot_connected} alt="" />
              <div className="text">Connected</div>
            </div>
          </button>
          <button
            className="account-item button"
            onClick={() => onClickConnect('1')}
          >
            <div className="wrapper-left">
              <div className="logo-item">
                <img src={metamask} alt="logo metamask" />
              </div>
              MetaMask
            </div>
            <div className="wrapper-right">
              {/* icon dot off */}
              {/* <img src={dot_noconnect} alt="" /> */}
              <div className="text">Available on desktop</div>
            </div>
          </button>
          <button
            className="account-item button"
            onClick={() => onClickConnect('2')}
          >
            <div className="wrapper-left">
              <div className="logo-item">
                <img src={walletconnectIcon} alt="logo walletconnect" />
              </div>
              Walletconnect
            </div>
            <div className="wrapper-right">
              {/* icon dot off */}
              {/* <img src={dot_noconnect} alt="" /> */}
              <div className="text">Available on desktop</div>
            </div>
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DialogWallets;
