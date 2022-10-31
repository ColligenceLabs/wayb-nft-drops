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
            <a
              href="https://talken.io/static/intro/a10_Multi_chain.htm"
              target={'_blank'}
            >
              <h3 className="nav-item-name">Product</h3>
            </a>
            <a
              href="https://talken.io/static/intro/a10_Multi_chain.htm"
              className="nav-item"
              target={'_blank'}
            >
              Talken Wallet
            </a>
            <a
              href="https://talken.io/static/intro/a10_Multi_chain.htm#a20_NFT_Launchpad"
              className="nav-item"
              target={'_blank'}
            >
              Talken Drops
            </a>
            <a
              href="https://talken.io/static/intro/a10_Multi_chain.htm#a30_NFT_Minting"
              className="nav-item"
              target={'_blank'}
            >
              Talken Studio
            </a>
          </nav>
          <nav className="list-nav">
            <a
              href="https://talken.io/static/intro/b10_DAO.htm"
              target={'_blank'}
            >
              <h3 className="nav-item-name">Governance</h3>
            </a>
            <a
              href="https://talken.io/static/intro/b10_DAO.htm#b20_Token"
              className="nav-item"
              target={'_blank'}
            >
              Token
            </a>
            {/* <Link to={'/'} className="nav-item">
              Press Inquiries
            </Link>
            <Link to={'/'} className="nav-item">
              Partnerships
            </Link> */}
          </nav>
          <nav className="list-nav">
            <a
              href="https://talken.io/static/intro/c10_Contributors.htm"
              target={'_blank'}
            >
              <h3 className="nav-item-name">About</h3>
            </a>
            <a
              href="https://talken.io/static/intro/c10_Contributors.htm#c10_Contributors"
              className="nav-item"
              target={'_blank'}
            >
              Contributors
            </a>
            <a
              href="https://talken.io/static/intro/c10_Contributors.htm#c20_Partners"
              className="nav-item"
              target={'_blank'}
            >
              Backers
            </a>
            {/* <Link to={'/'} className="nav-item">
              Terms of Use
            </Link> */}
          </nav>
          <nav className="list-nav">
            <a href="https://docs.talken.io/talken-docs/" target={'_blank'}>
              <h3 className="nav-item-name">Blog</h3>
            </a>
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
            <div className="footLink">
              <a
                target="_blank"
                href="https://discord.gg/S33c5DA9cW"
                className="footLink3"
              ></a>
              <a
                target="_blank"
                href="https://twitter.com/Talken_"
                className="footLink2"
              ></a>
              <a
                target="_blank"
                href="https://www.instagram.com/talken_nft"
                className="footLink5"
              ></a>
              <a
                target="_blank"
                href="https://docs.talken.io/talken-docs/"
                className="footLink6"
              ></a>
              <a
                target="_blank"
                href="https://talken-io.medium.com/"
                className="footLink1"
              ></a>
              <a
                target="_blank"
                href="https://blog.naver.com/talkentalk"
                className="footLink7"
              ></a>
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
