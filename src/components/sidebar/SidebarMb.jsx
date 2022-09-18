import React from 'react';
import LoginForm from 'components/auth/loginForm';
import Popup from 'reactjs-popup';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';
import close_icon from '../../assets/icon/close_icon.svg';
import about from '../../assets/icon/about.svg';
import blog from '../../assets/icon/blog.svg';
import help from '../../assets/icon/help.svg';

import UsernameBox from 'components/modal/UsernameBox';

const SidebarMb = ({ show, onHide }) => {
  const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
  const closeOnDocumentClick = false;
  const lockScroll = true;
  return (
    <div className={`side-bar ${show ? 'show' : ''}`}>
      {/* sidebar before login */}
      {/* <>
        <div className="close-sidebar">
          <div className="icon-close" onClick={onHide}>
            <img src={close_icon} alt="Close Icon" />
          </div>
        </div>
        <div className="login-signup">
          <Popup
            modal
            trigger={<span>log in/ sign up</span>}
            {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
          >
            {(close) => <LoginForm close={close} />}
          </Popup>
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
      </> */}
      {/* sidebar after login */}
      <UsernameBox />
    </div>
  );
};

export default SidebarMb;
