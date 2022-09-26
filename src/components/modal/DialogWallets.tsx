import React from 'react';
import ReactModal from 'react-modal';
import logo_talken from '../../assets/img/logo_header.png';
import wallet from '../../assets/icon/wallet.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import dot_connected from '../../assets/icon/dot_connected.svg';
import metamask from '../../assets/icon/metamask.svg';
import walletconnect from '../../assets/icon/walletconnect.png';

import { useModalWalletsStore } from 'components/common/AppStore';

const DialogWallets = () => {
  const { isOpen, updateOpenWallet } = useModalWalletsStore();

  const onClickConnect = (id: string) => {
    console.log(`Click Wallet Button(id) : ${id}`);
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
              Talken
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
                <img src={walletconnect} alt="logo walletconnect" />
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
