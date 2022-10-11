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
            <h3 className="nav-item-name">Help</h3>
            <Link to={'/'} className="nav-item">
              Contact Us
            </Link>
            <Link to={'/'} className="nav-item">
              Help Center
            </Link>
            <Link to={'/'} className="nav-item">
              FAQ
            </Link>
          </nav>
          <nav className="list-nav">
            <h3 className="nav-item-name">Sweet</h3>
            <Link to={'/'} className="nav-item">
              Careers
            </Link>
            <Link to={'/'} className="nav-item">
              Press Inquiries
            </Link>
            <Link to={'/'} className="nav-item">
              Partnerships
            </Link>
          </nav>
          <nav className="list-nav">
            <h3 className="nav-item-name">More Infor</h3>
            <Link to={'/'} className="nav-item">
              Mailing List
            </Link>
            <Link to={'/'} className="nav-item">
              Privacy Policy
            </Link>
            <Link to={'/'} className="nav-item">
              Terms of Use
            </Link>
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
              Multi-chain NFT Wallet and NFT Launchpad
            </div>
            <div className="social-networks">
              <a href={'https://medium.com/'}>
                <div className="social-item">
                  <img src={medium} alt="" />
                </div>
              </a>
              <a href={'https://twitter.com'}>
                <div className="social-item">
                  <img src={icon_twitter} alt="" />
                </div>
              </a>
              <a href={'https://discord.com'}>
                <div className="social-item">
                  <img src={icon_discord} alt="" />
                </div>
              </a>
              <a href={'/'}>
                <div className="social-item">
                  <img src={icon_chat} alt="" />
                </div>
              </a>
              <a href={'https://www.instagram.com'}>
                <div className="social-item">
                  <img src={icon_instagram} alt="" />
                </div>
              </a>
              <a href={'https://www.gitbook.com/'}>
                <div className="social-item">
                  <img src={icon_gitbook} alt="" />
                </div>
              </a>
              <a href={'https://www.gitbook.com/'}>
                <div className="social-item">
                  <img src={icon_blog} alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="line line-second"></div>
      <div className="footer-bottom">
        <div className="footernote">© 2022 Talken, All Rights Reserved.</div>
        <div className="contact-us">
          <div className="icon-contact">
            <img src={icon_contact} alt="Icon contact" />
          </div>
          <div>Contact Us</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
