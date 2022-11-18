import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import logo_header from '../../assets/svg/logo_header.svg';
// import icon_twitter from '../../assets/img/icon_twitter.png';
// import icon_discord from '../../assets/img/icon_discord.png';
import icon_insta from '../../assets/icon/instagram.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import icon_ethereum from '../../assets/img/icon_ethereum.png';
import icon_binance from '../../assets/img/icon_binance.png';
import icon_polygon from 'assets/icon/icon_polygon.png';
import icon_klaytn from '../../assets/img/icon_klaytn.png';
import avatar_user from '../../assets/img/avatar_user.webp';
import search_icon from '../../assets/icon/search_icon.svg';
import wallet_blue from '../../assets/icon/wallet_blue.svg';
import wallet_white from '../../assets/icon/wallet_white.svg';

import makeBlockie from 'ethereum-blockies-base64';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { useEagerConnect, useInactiveListener } from '../../hooks/useWallet';
import {
  useModalWalletsStore,
  useSidebarStore,
} from 'components/common/AppStore';
import WalletConnector from '../auth/WalletConnector/WalletConnector';
import useScreenSize from 'components/common/useScreenSize';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import splitAddress from '../../utils/splitAddress';
import { splitString } from '../../utils/splitString';

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const Navbar = () => {
  const ref = useRef() as MutableRefObject<HTMLButtonElement>;
  const [isModalOpen, setModalOpen] = useState(false);
  const { openSidebar } = useSidebarStore();
  const { updateOpenWallet } = useModalWalletsStore();
  const dropsAccount = useSelector((state: any) => state.account.account);
  const wallets = useSelector((state: any) => state.wallet);
  const { account } = useActiveWeb3React();
  // console.log(dropsAccount);
  const screenSize = useScreenSize();
  useOnClickOutside(ref, () => setModalOpen(false));
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const { activatingConnector } = useSelector(
    (state: RootState) => state.wallet
  );
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const closeSignup = () => {
    setSignupOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 66) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const location = useLocation();
  return (
    <div
      className={scroll ? 'nav-bar' : 'nav-bar scroll-top'}
      onMouseLeave={() => setModalOpen(false)}
    >
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
        {/* <div className="search-bar">
          <img src={search_icon} alt="search icon" className="search-icon" />
          <input
            className="input-search"
            type="search-textbox"
            placeholder="Search NFT"
          />
        </div> */}
        <div className="nav-right">
          <div className="contact-header">
            <a href="https://talken.io/" target={'_blank'}>
              About
            </a>
            <a href="https://talken-io.medium.com/" target={'_blank'}>
              Blog
            </a>
            <a href="https://docs.talken.io/talken-docs/" target={'_blank'}>
              Docs
            </a>
            <a
              href="https://talkensupport.zendesk.com/hc/en-us/requests/new"
              target={'_blank'}
            >
              Help
            </a>
          </div>
          <div className="fanpage-icons">
            <a
              href="https://twitter.com/Talken_"
              target={'_blank'}
              rel="noreferrer"
            >
              <img src={icon_twitter} alt="" />
            </a>
            <a
              href="https://discord.gg/S33c5DA9cW"
              target={'_blank'}
              rel="noreferrer"
            >
              <img src={icon_discord} alt="" />
            </a>
            <a
              href="https://www.instagram.com/talken_nft"
              target={'_blank'}
              rel="noreferrer"
            >
              <img src={icon_insta} alt="" />
            </a>
          </div>
          {/* before login PC view */}
          {/*  /!* <div className="btn-login">*/}
          {/*  <button*/}
          {/*    className="custom-btn button"*/}
          {/*    onClick={() => setLoginOpen(true)}*/}
          {/*  >*/}
          {/*    <span className="custom-text">Connect Wallet</span>*/}
          {/*  </button>*/}
          {/*</div> *!/*/}

          {/* after login */}

          {dropsAccount.address !== '' && account ? (
            // getWalletButtons()
            <div
              className="wallet-connected"
              onClick={() => setLoginOpen(true)}
            >
              {wallets.ethereum.address && wallets.ethereum.address !== '' && (
                <button type="button" className="item-wallet button">
                  <img src={icon_ethereum} />
                </button>
              )}
              {wallets.binance.address && wallets.binance.address !== '' && (
                <button type="button" className="item-wallet button">
                  <img src={icon_binance} />
                </button>
              )}
              {/*{wallets.solana.address && wallets.solana.address !== '' && (*/}
              {/*  <button type="button" className="item-wallet button">*/}
              {/*    <img src={icon_solana} />*/}
              {/*  </button>*/}
              {/*)}*/}
              {wallets.polygon.address && wallets.polygon.address !== '' && (
                <button type="button" className="item-wallet button">
                  <img src={icon_polygon} />
                </button>
              )}
              {wallets.klaytn.address && wallets.klaytn.address !== '' && (
                <button type="button" className="item-wallet button">
                  <img src={icon_klaytn} />
                </button>
              )}
              <p className="account">{splitAddress(account)}</p>
            </div>
          ) : (
            <div
              className={`btn-wallets ${
                dropsAccount.address === '' && screenSize > 768
                  ? 'right-40'
                  : ''
              }`}
            >
              <button
                className="custom-btn button"
                // onClick={() => updateOpenWallet(true)}
                onClick={() => setLoginOpen(true)}
              >
                <span className="wrapper-btn">
                  {/* <img src={wallet_blue} alt="Wallet Icon" /> */}
                  <span className="wallets">Connect Wallet</span>
                </span>
              </button>
            </div>
          )}

          {dropsAccount.address !== '' && screenSize > 540 ? (
            <>
              <div
                className="wrapper-user"
                onMouseEnter={() => setModalOpen(true)}
              >
                <div className="avatar-user">
                  <img
                    src={
                      dropsAccount.profile_image
                        ? dropsAccount.profile_image
                        : makeBlockie(dropsAccount.address)
                    }
                    alt="profile-avatar"
                  />
                </div>
                <p className="user-name mb-0">
                  {splitString(dropsAccount.name)}
                </p>
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
                  opacity="0.8"
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
              </button>
              {/* user dropdown box */}
              <div onMouseLeave={() => setModalOpen(false)}>
                {isModalOpen && <UsernameBox />}
              </div>
            </>
          ) : (
            screenSize < 769 && (
              <div className="icon-nav">
                <button className="button" onClick={openSidebar}>
                  <img src={nav_icon} alt="Navbar Icon" />
                  {/* side bar */}
                </button>
                <SidebarMb />
              </div>
            )
          )}

          {/* wallets box */}
          <DialogWallets />
        </div>
        {/* popup log in  */}
        <Popup
          modal
          open={loginOpen}
          onOpen={closeSignup}
          onClose={closeLogin}
          {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
        >
          {/* <LoginForm close={closeLogin} onConfirm={() => setSignupOpen(true)} />*/}
          <WalletConnector
            close={closeLogin}
            onConfirm={() => setSignupOpen(true)}
          />
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
