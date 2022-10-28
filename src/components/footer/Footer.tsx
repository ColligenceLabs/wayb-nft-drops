import React from 'react';
import { Link } from 'react-router-dom';
import logo_header from '../../assets/svg/logo_header.svg';
// import icon_twitter from '../../assets/img/icon_twitter.png';
// import icon_discord from '../../assets/img/icon_discord.png';
// import icon_telegram from '../../assets/img/icon_telegram.png';
// import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_contact from '../../assets/icon/contact_us.png';
import medium from '../../assets/icon/medium.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import icon_chat from '../../assets/icon/chat.png';
import icon_instagram from '../../assets/icon/instagram.png';
import icon_gitbook from '../../assets/icon/gitbook.png';
import icon_blog from '../../assets/icon/icon_blog.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="line line-first"></div>
      <div className="wrapper-footer">
        <div className="navbar-footer">
          <nav className="list-nav">
            <h3 className="nav-item-name">Product</h3>
            <Link to={'/'} className="nav-item">
              Talken Wallet
            </Link>
            <Link to={'/'} className="nav-item">
              Talken Drops
            </Link>
            <Link to={'/'} className="nav-item">
              Talken Studio
            </Link>
          </nav>
          <nav className="list-nav">
            <h3 className="nav-item-name">Governance</h3>
            <Link to={'/'} className="nav-item">
              Token
            </Link>
            {/* <Link to={'/'} className="nav-item">
              Press Inquiries
            </Link>
            <Link to={'/'} className="nav-item">
              Partnerships
            </Link> */}
          </nav>
          <nav className="list-nav">
            <h3 className="nav-item-name">About</h3>
            <Link to={'/'} className="nav-item">
              Contributors
            </Link>
            <Link to={'/'} className="nav-item">
              Backers
            </Link>
            {/* <Link to={'/'} className="nav-item">
              Terms of Use
            </Link> */}
          </nav>
          <nav className="list-nav">
            <h3 className="nav-item-name">Blog</h3>
          </nav>
        </div>
        <div className="footer-right">
          <div className="logo-footer">
            <Link to={'/'}>
              <img src={logo_header} alt="" />
            </Link>
          </div>
          <div className="list-page">
            <div className="content-head">
              <div className="content content-01">Multi-chain NFT Suite</div>
              <div className="content">
                Talken Wallet, Drops, Studio, and etc..
              </div>
            </div>
            <div className="social-networks">
              <a href={'https://discord.gg/S33c5DA9cW'} target="_blank">
                <div className="social-item">
                  <img src={icon_discord} alt="" />
                </div>
              </a>
              <a href={'https://twitter.com/Talken_'} target="_blank">
                <div className="social-item">
                  <img src={icon_twitter} alt="" />
                </div>
              </a>
              <a href={'https://www.instagram.com/talken_nft'} target="_blank">
                <div className="social-item">
                  <img src={icon_instagram} alt="" />
                </div>
              </a>
              <a href={'https://docs.talken.io/talken-docs/'} target="_blank">
                <div className="social-item">
                  <img src={icon_gitbook} alt="" />
                </div>
              </a>
              <a href={'https://talken-io.medium.com/'} target="_blank">
                <div className="social-item">
                  <img src={medium} alt="" />
                </div>
              </a>
              <a href={'https://blog.naver.com/talkentalk'} target="_blank">
                <div className="social-item">
                  <img src={icon_blog} alt="" />
                </div>
              </a>
              {/* <a href={'/'} target="_blank">
                <div className="social-item">
                  <img src={icon_chat} alt="" />
                </div>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="line line-second"></div>
      <div className="footer-bottom">
        <div className="footernote">© 2022 Talken, All Rights Reserved.</div>
        <a
          href="https://talkensupport.zendesk.com/hc/en-us/requests/new"
          className="button"
          target={'_blank'}
        >
          <div className="contact-us">
            <div className="icon-contact">
              <img src={icon_contact} alt="Icon contact" />
            </div>
            <div>Contact Us</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
