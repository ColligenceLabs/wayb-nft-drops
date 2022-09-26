import React, { useState } from 'react';
import LoginForm from 'components/auth/loginForm';
import SignupForm from 'components/auth/signupForm';
import Popup from 'reactjs-popup';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';
import close_icon from '../../assets/icon/close_icon.svg';
import about from '../../assets/icon/about.svg';
import blog from '../../assets/icon/blog.svg';
import help from '../../assets/icon/help.svg';

import UsernameBox from 'components/common/UsernameBox';
import { useSidebarStore } from 'components/common/AppStore';

const SidebarMb = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };
  const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
  const closeOnDocumentClick = false;
  const lockScroll = true;
  const { isOpen, closeSidebar } = useSidebarStore();
  return (
    <div className={`side-bar ${isOpen ? 'show' : ''}`} onClick={closeSidebar}>
      {/* sidebar before login */}
      {/* <div className="wrapper-backdrop" onClick={(e) => e.stopPropagation()}>
        <div className="close-sidebar">
          <div className="icon-close" onClick={closeSidebar}>
            <img src={close_icon} alt="Close Icon" />
          </div>
        </div>
        <div className="login-signup" onClick={() => setLoginOpen(true)}>
          <span>log in/ sign up</span>
        </div>
        <div className="wrapper">
          <a href="/" className="about button">
            <img src={about} alt="About Icon" />
            About
          </a>
          <a href="/" className="blog button">
            <img src={blog} alt="Blog Icon" />
            Blog
          </a>
          <div className="help button">
            <img src={help} alt="Help Icon" />
            Help
          </div>
        </div>
        <div className="fanpage-icons-sidebar">
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
      </div> */}
      {/* sidebar after login */}
      <div className="wrapper-backdrop" onClick={(e) => e.stopPropagation()}>
        <UsernameBox />
      </div>

      {/* popup log in */}
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
        <SignupForm close={closeSignup} onConfirm={() => setLoginOpen(true)} />
      </Popup>
    </div>
  );
};

export default SidebarMb;
