import React, { useState } from 'react';
import LoginForm from 'components/auth/loginForm';
import SignupForm from 'components/auth/signupForm';
import Popup from 'reactjs-popup';
import icon_insta from '../../assets/icon/instagram.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import docs from '../../assets/icon/docs.png';
import close_icon from '../../assets/icon/close_icon.svg';
import about from '../../assets/icon/about_02.svg';
import blog from '../../assets/icon/blog_02.svg';
import help from '../../assets/icon/help_02.svg';
import wallet_blue from '../../assets/icon/wallet_blue.svg';
import UsernameBox from 'components/common/UsernameBox';
import {
  useModalWalletsStore,
  useSidebarStore,
} from 'components/common/AppStore';
import WalletConnector from '../auth/WalletConnector/WalletConnector';

const SidebarMb = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { updateOpenWallet } = useModalWalletsStore();
  const closeLogin = () => {
    setLoginOpen(false);
  };
  const accessToken = localStorage.getItem('dropsJwtToken');

  const closeSignup = () => {
    setSignupOpen(false);
  };
  const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
  const closeOnDocumentClick = false;
  const lockScroll = true;
  const { isOpen, closeSidebar } = useSidebarStore();
  return (
    <div className={`side-bar ${isOpen ? 'show' : ''}`} onClick={closeSidebar}>
      {/* sidebar before login new design */}
      {!accessToken ? (
        <div className="wrapper-backdrop" onClick={(e) => e.stopPropagation()}>
          <div className="close-sidebar">
            <div className="icon-close" onClick={closeSidebar}>
              <img src={close_icon} alt="Close Icon" />
            </div>
          </div>
          {/* <div
            className="login-signup"
            onClick={() => {
              setLoginOpen(true);
              closeSidebar();
            }}
          >
            <span>Connect Wallet</span>
          </div> */}
          <div className="wrapper">
            <a
              href="https://talken.io/"
              className="wrapper-item button"
              target={'_blank'}
            >
              <img src={about} alt="About Icon" />
              About
            </a>
            <a
              href="https://talken-io.medium.com/"
              className="wrapper-item button"
              target={'_blank'}
            >
              <img src={blog} alt="Blog Icon" />
              Blog
            </a>
            <a
              href="https://docs.talken.io/talken-docs/"
              className="wrapper-item button"
              target={'_blank'}
            >
              <img src={docs} style={{ width: '24px' }} alt="Docs Icon" />
              Docs
            </a>
            <a
              href="//talkensupport.zendesk.com/hc/en-us/requests/new"
              className="wrapper-item button"
              target={'_blank'}
            >
              <img src={help} alt="Help Icon" />
              Help
            </a>
          </div>
          <div className="fanpage-icons-sidebar">
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
        </div>
      ) : (
        <div className="wrapper-backdrop" onClick={(e) => e.stopPropagation()}>
          <UsernameBox />
        </div>
      )}
      {/* sidebar after login */}

      {/* popup log in */}
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
        <SignupForm close={closeSignup} onConfirm={() => setLoginOpen(true)} />
      </Popup>
    </div>
  );
};

export default SidebarMb;
