import React from 'react';
import { Link } from 'react-router-dom';
// import icon_twitter from '../../assets/img/icon_twitter.png';
// import icon_discord from '../../assets/img/icon_discord.png';
// import icon_telegram from '../../assets/img/icon_telegram.png';
import icon_insta from '../../assets/icon/instagram.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import wallet_blue from '../../assets/icon/wallet_blue.svg';
import my_collectibles from '../../assets/icon/my_collectibles.svg';
import my_profile from '../../assets/icon/my_profile.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import { useModalWalletsStore, useSidebarStore } from './AppStore';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useDispatch } from 'react-redux';
import { initWallets } from '../../redux/slices/wallet';

const UsernameBox = () => {
  const { deactivate } = useActiveWeb3React();
  const { updateOpenWallet } = useModalWalletsStore();
  const { closeSidebar } = useSidebarStore();
  const dispatch = useDispatch();

  const handleClickLogout = async () => {
    await deactivate();
    dispatch(initWallets());
  };

  return (
    <div className="user-dropdown-box">
      <div className="close-sidebar">
        <div className="icon-close" onClick={closeSidebar}>
          <img src={close_icon} alt="Close Icon" />
        </div>
      </div>
      <div className="wrapper-dropdown">
        <div className="wrapper-wallets">
          <div
            className="btn-wallets button"
            onClick={() => {
              updateOpenWallet(true);
              closeSidebar(false);
            }}
          >
            <div className="img-wallet">
              <img src={wallet_blue} alt="wallet" />
            </div>
            <span>Wallets</span>
          </div>
        </div>
        <Link
          to={'/my-collectibles'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          <img src={my_collectibles} alt="My Collectibles" />
          My Collectibles
        </Link>
        {/*<Link*/}
        {/*  to={'/purchase-history'}*/}
        {/*  className="wallet-button"*/}
        {/*  onClick={closeSidebar}*/}
        {/*>*/}
        {/*  <img src={purchase_history} alt="Purchase History" />*/}
        {/*  Purchase History*/}
        {/*</Link>*/}
        <Link
          to={'/my-profile'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          <img src={my_profile} alt="My Profile" />
          My Profile
        </Link>
        {/*<div className="help wallet-button">*/}
        {/*  <img src={help} alt="Help Icon" />*/}
        {/*  Help*/}
        {/*</div>*/}
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
            href={'https://www.instagram.com'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_insta} alt="" />
          </a>
        </div>
      </div>
      <div className="logout-btn" onClick={handleClickLogout}>
        Log Out
      </div>
    </div>
  );
};

export default UsernameBox;
