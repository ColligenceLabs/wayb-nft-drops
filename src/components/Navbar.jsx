import React from 'react';
import logo_header from '../assets/img/logo_header.png';
import icon_twitter from '../assets/img/icon_twitter.png';
import icon_discord from '../assets/img/icon_discord.png';
import icon_telegram from '../assets/img/icon_telegram.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  return (
    <div className="nav-bar">
      <div className={`${location.pathname === "/" ? "nav-home" : "nav-other-page"}`}></div>
      <div className="main-header-box">
        <div className="logo-header">
          <Link to={"/"}>
            <img src={logo_header} alt="" />
          </Link>
        </div>
        <div className="search-bar">
          <svg
            className="sc-af3224b2-3 search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.98"
            height="17.98"
            viewBox="0 0 17.98 17.98"
          >
            {' '}
            <path
              id="Trazado_46141"
              data-name="Trazado 46141"
              d="M15.85,14.308h-.812l-.288-.278a6.692,6.692,0,1,0-.72.72l.278.288v.812l5.14,5.13,1.532-1.532Zm-6.168,0a4.626,4.626,0,1,1,4.626-4.626A4.62,4.62,0,0,1,9.682,14.308Z"
              transform="translate(-3 -3)"
              fill="#fff"
              opacity="0.248"
            ></path>{' '}
          </svg>
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
          <a href="https://twitter.com">
            <img src={icon_twitter} alt="" />
          </a>
          <a href="https://discord.com">
            <img src={icon_discord} alt="" />
          </a>
          <a href="https://web.telegram.org">
            <img src={icon_telegram} alt="" />
          </a>
        </div>
        <div className="btn-login">
          <button className="custom-btn">
            <span className="custom-text">log in/ sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
