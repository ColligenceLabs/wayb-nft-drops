import React from 'react';
import { Link } from 'react-router-dom';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';
import wallet_white from '../../assets/icon/wallet_white.svg';
import my_collectibles from '../../assets/icon/my_collectibles.svg';
import purchase_history from '../../assets/icon/purchase_history.svg';
import my_profile from '../../assets/icon/my_profile.svg';
import help from '../../assets/icon/help.svg';
import close_icon from '../../assets/icon/close_icon.svg';

const UsernameBox = ({ openWallets, onHideSidebar }) => {
  return (
    <div className="user-dropdown-box">
      <div className="close-sidebar">
        <div className="icon-close" onClick={onHideSidebar}>
          <img src={close_icon} alt="Close Icon" />
        </div>
      </div>
      <div className="wrapper-dropdown">
        <Link
          to={'/my-collectibles'}
          className="wallet-button"
          onClick={onHideSidebar}
        >
          <img src={my_collectibles} alt="My Collectibles" />
          My Collectibles
        </Link>
        <Link
          to={'/purchase-history'}
          className="wallet-button"
          onClick={onHideSidebar}
        >
          <img src={purchase_history} alt="Purchase History" />
          Purchase History
        </Link>
        <Link
          to={'/my-profile'}
          className="wallet-button"
          onClick={onHideSidebar}
        >
          <img src={my_profile} alt="My Profile" />
          My Profile
        </Link>
        <div className="help wallet-button">
          <img src={help} alt="Help Icon" />
          Help
        </div>
        <div className="wrapper-fanpages">
          <a
            href="https://twitter.com"
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_twitter} alt="" />
          </a>
          <a
            href={'https://discord.com'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_discord} alt="" />
          </a>
          <a
            href={'https://web.telegram.org'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_telegram} alt="" />
          </a>
        </div>
        <div className="wrapper-wallets">
          <button
            className="btn-wallets button"
            onClick={() => {
              openWallets();
              onHideSidebar();
            }}
          >
            <div className="img-wallet">
              <img src={wallet_white} alt="wallet" />
            </div>
            <span>Wallets</span>
          </button>
        </div>
      </div>
      <div className="logout-btn">Log Out</div>
    </div>
  );
};

export default UsernameBox;
