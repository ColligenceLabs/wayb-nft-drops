import React from 'react';
import { Link } from 'react-router-dom';
import logo_header from '../assets/img/logo_header.png';
import icon_twitter from '../assets/img/icon_twitter.png';
import icon_discord from '../assets/img/icon_discord.png';
import icon_telegram from '../assets/img/icon_telegram.png';
import icon_instagram from '../assets/img/icon_instagram.png';
const Footer = () => {
  return (
    <div className="footer">
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
            <h3 className="nav-item-name">More Info</h3>
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
          <h3>Follow Us</h3>
          <div className="social-networks">
            <Link to={'https://discord.com'}>
              <div className="social-item">
                <img src={icon_discord} alt="" />
              </div>
            </Link>
            <Link to={'https://web.telegram.org'}>
              <div className="social-item">
                <img src={icon_telegram} alt="" />
              </div>
            </Link>
            <Link to={'https://twitter.com'}>
              <div className="social-item">
                <img src={icon_twitter} alt="" />
              </div>
            </Link>
            <Link to={'https://www.instagram.com'}>
              <div className="social-item">
                <img src={icon_instagram} alt="" />
              </div>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
