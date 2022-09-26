import React, { useRef, useState } from 'react';
import logo_header from '../../assets/img/logo_header.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';
import avatar_user from '../../assets/img/avatar_user.webp';
import search_icon from '../../assets/icon/search_icon.svg';
import wallet_white from '../../assets/icon/wallet_white.svg';
import nav_icon from '../../assets/icon/nav_icon.svg';
import { Link, useLocation } from 'react-router-dom';
import DialogWallets from 'components/modal/DialogWallets';
import useOnClickOutside from 'components/common/useOnClickOutside';
import Popup from 'reactjs-popup';
import LoginForm from '../auth/loginForm';
import SignupForm from '../auth/signupForm';
import 'reactjs-popup/dist/index.css';
import UsernameBox from 'components/common/UsernameBox';
import SidebarMb from 'components/sidebar/SidebarMb';
import {
  useModalWalletsStore,
  useSidebarStore,
} from 'components/common/AppStore';

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const Navbar = () => {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const { openSidebar } = useSidebarStore();
  const { updateOpenWallet } = useModalWalletsStore();

  useOnClickOutside(ref, () => setModalOpen(false));
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };

  let location = useLocation();
  return (
    <div className="nav-bar">
      <div
        className={`${
          location.pathname === '/' ? 'nav-home' : 'nav-other-page'
        }`}
      ></div>
      <div className="main-header-box">
        <div className="logo-header">
          <Link to={'/'}>
            <img src={logo_header} alt="" />
          </Link>
        </div>
        <div className="search-bar">
          <img src={search_icon} alt="search icon" className="search-icon" />
          <input
            className="input-search"
            type="search-textbox"
            placeholder="Search NFTs..."
          />
        </div>
        <div className="contact-header">
          <a href="/">About</a>
          <a href="/">Blog</a>
          <a href="/">Help</a>
        </div>
        <div className="fanpage-icons">
          <a href="https://twitter.com" target={'_blank'} rel="noreferrer">
            <img src={icon_twitter} alt="" />
          </a>
          <a href="https://discord.com" target={'_blank'} rel="noreferrer">
            <img src={icon_discord} alt="" />
          </a>
          <a href="https://web.telegram.org" target={'_blank'} rel="noreferrer">
            <img src={icon_telegram} alt="" />
          </a>
        </div>
        {/* before login PC view */}
        <div className="btn-login">
          <button className="custom-btn" onClick={() => setLoginOpen(true)}>
            <span className="custom-text">log in/ sign up</span>
          </button>
        </div>
        {/* before login Tablet, Mobile view */}
        <div className="icon-nav">
          <button className="button" onClick={openSidebar}>
            <img src={nav_icon} alt="Navbar Icon" />
            {/* side bar */}
          </button>
          <SidebarMb />
        </div>
        {/* after login */}
        <div className="btn-wallets">
          <button
            className="custom-btn button"
            onClick={() => updateOpenWallet(true)}
          >
            <span className="wrapper-btn">
              <img src={wallet_white} alt="Wallet Icon" />
              <span className="wallets">Wallets</span>
            </span>
          </button>
        </div>
        <div className="wrapper-user">
          <div className="avatar-user">
            <img src={avatar_user} alt="profile-avatar" />
          </div>
          <p className="user-name">User name</p>
        </div>
        <button
          ref={ref}
          className="username-dropdown button"
          onClick={() => setModalOpen(!isModalOpen)}
        >
          <svg
            className="sc-196ec885-12 eKhfKP"
            xmlns="http://www.w3.org/2000/svg"
            width="18.092"
            height="11.168"
            viewBox="0 0 18.092 11.168"
          >
            <path
              id="Path_46142"
              data-name="Path 46142"
              d="M-10858.465-7358l6.925,6.926,6.925-6.926"
              transform="translate(10860.586 7360.121)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeWidth="3"
            ></path>
          </svg>
          {/* user dropdown box */}
          {isModalOpen && <UsernameBox />}
        </button>
        {/* wallets box */}
        <DialogWallets />
        {/* popup log in  */}
        <Popup
          modal
          open={loginOpen}
          onOpen={closeSignup}
          onClose={closeLogin}
          {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
        >
          <LoginForm close={closeLogin} onConfirm={() => setSignupOpen(true)} />
        </Popup>
        {/* popup sign up */}
        <Popup
          modal
          open={signupOpen}
          onOpen={closeLogin}
          onClose={closeSignup}
          {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
        >
          <SignupForm
            close={closeSignup}
            onConfirm={() => setLoginOpen(true)}
          />
        </Popup>
      </div>
    </div>
  );
};

export default Navbar;
