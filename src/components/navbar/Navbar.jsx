import React, { useEffect, useRef, useState } from 'react';
import logo_header from '../../assets/img/logo_header.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';
import avatar_user from '../../assets/img/avatar_user.webp';

import { Link, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import NavbarMb from './NavbarMb';
import DialogWallets from 'components/modal/DialogWallets';
import useOnClickOutside from 'components/common/useOnClickOutside';
import Popup from 'reactjs-popup';
import LoginForm from '../auth/loginForm';
import 'reactjs-popup/dist/index.css';

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const Navbar = () => {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [openDialogWallets, setOpenDialogWallets] = useState(false);

  useOnClickOutside(ref, () => setModalOpen(false));
  const handleOpenWalletDialog = () => {
    setOpenDialogWallets(true);
  };

  const handleCloseWalletDialog = () => {
    setOpenDialogWallets(false);
  };
  let location = useLocation();
  return isMobile ? (
    <NavbarMb />
  ) : (
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
        {/* before login */}
        <div className="btn-login">
          <Popup
            modal
            trigger={
              <button className="custom-btn">
                <span className="custom-text">log in/ sign up</span>
              </button>
            }
            {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
          >
            {(close) => <LoginForm close={close} />}
          </Popup>
        </div>
        {/* after login */}
        <div className="btn-wallets">
          <button
            className="custom-btn button"
            onClick={handleOpenWalletDialog}
          >
            <span className="wrapper-btn">
              <svg
                className="sc-ac9cac12-4 cqTouq"
                id="account_balance_wallet_black_24dp_2_"
                data-name="account_balance_wallet_black_24dp (2)"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Trazado_84729"
                  data-name="Trazado 84729"
                  d="M0,0H24V24H0Z"
                  fill="none"
                ></path>
                <path
                  id="Trazado_84730"
                  data-name="Trazado 84730"
                  d="M21,18v1a2.006,2.006,0,0,1-2,2H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H19a2.006,2.006,0,0,1,2,2V6H12a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2Zm-9-2H22V8H12Zm4-2.5A1.5,1.5,0,1,1,17.5,12,1.5,1.5,0,0,1,16,13.5Z"
                  fill="#fff"
                ></path>
              </svg>
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
          {isModalOpen && (
            <div>
              <div className="user-dropdown-box">
                <div className="wrapper-dropdown">
                  <Link to={'/my-collectibles'} className="wallet-button">
                    <svg
                      id="photo_library_black_24dp"
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                    >
                      <path
                        id="Path_123410"
                        data-name="Path 123410"
                        d="M0,0H46V46H0Z"
                        fill="none"
                      ></path>
                      <path
                        id="Path_123411"
                        data-name="Path 123411"
                        d="M36.65,5.85v23.1H13.55V5.85h23.1m0-3.85H13.55A3.861,3.861,0,0,0,9.7,5.85v23.1a3.861,3.861,0,0,0,3.85,3.85h23.1a3.861,3.861,0,0,0,3.85-3.85V5.85A3.861,3.861,0,0,0,36.65,2ZM20.287,20.615l3.253,4.35L28.315,19l6.41,8.027H15.475ZM2,9.7V36.65A3.861,3.861,0,0,0,5.85,40.5H32.8V36.65H5.85V9.7Z"
                        transform="translate(1.75 1.75)"
                        fill="#fff"
                      ></path>
                    </svg>
                    My Collectibles
                  </Link>
                  <Link to={'/'} className="wallet-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      fill="white"
                      viewBox="0 0 46 46"
                    >
                      <path d="M11.1 44Q8.9 44 7.375 42.475Q5.85 40.95 5.85 38.75V32.5H12.2V4L15.2 7L18.2 4L21.15 7L24.15 4L27.15 7L30.15 4L33.15 7L36.15 4L39.15 7L42.15 4V38.75Q42.15 40.95 40.625 42.475Q39.1 44 36.9 44ZM36.9 41Q37.9 41 38.525 40.375Q39.15 39.75 39.15 38.75V9H15.2V32.5H34.65V38.75Q34.65 39.75 35.275 40.375Q35.9 41 36.9 41ZM17.85 16.9V13.9H29.85V16.9ZM17.85 23.6V20.6H29.85V23.6ZM34.5 16.9Q33.9 16.9 33.45 16.45Q33 16 33 15.4Q33 14.8 33.45 14.35Q33.9 13.9 34.5 13.9Q35.1 13.9 35.55 14.35Q36 14.8 36 15.4Q36 16 35.55 16.45Q35.1 16.9 34.5 16.9ZM34.5 23.35Q33.9 23.35 33.45 22.9Q33 22.45 33 21.85Q33 21.25 33.45 20.8Q33.9 20.35 34.5 20.35Q35.1 20.35 35.55 20.8Q36 21.25 36 21.85Q36 22.45 35.55 22.9Q35.1 23.35 34.5 23.35ZM11.05 41H31.65V35.5H8.85V38.75Q8.85 39.75 9.475 40.375Q10.1 41 11.05 41ZM8.85 41Q8.85 41 8.85 40.375Q8.85 39.75 8.85 38.75V35.5V41Z"></path>
                    </svg>
                    Purchase History
                  </Link>
                  <Link to={'/my-profile'} className="wallet-button">
                    <svg
                      id="manage_accounts_black_24dp"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g id="Grupo_41185" data-name="Grupo 41185">
                        <path
                          id="Trazado_84739"
                          data-name="Trazado 84739"
                          d="M0,0H24V24H0Z"
                          fill="none"
                        ></path>
                      </g>
                      <g id="Grupo_41187" data-name="Grupo 41187">
                        <g id="Grupo_41186" data-name="Grupo 41186">
                          <circle
                            id="Elipse_2115"
                            data-name="Elipse 2115"
                            cx="4"
                            cy="4"
                            r="4"
                            transform="translate(6 4)"
                            fill="#fff"
                          ></circle>
                          <path
                            id="Trazado_84740"
                            data-name="Trazado 84740"
                            d="M10.67,13.02c-.22-.01-.44-.02-.67-.02a12.876,12.876,0,0,0-6.61,1.82A2.922,2.922,0,0,0,2,17.35V20h9.26A6.963,6.963,0,0,1,10,16,7.072,7.072,0,0,1,10.67,13.02Z"
                            fill="#fff"
                          ></path>
                          <path
                            id="Trazado_84741"
                            data-name="Trazado 84741"
                            d="M20.75,16a4.338,4.338,0,0,0-.06-.63l1.14-1.01-1-1.73-1.45.49a3.647,3.647,0,0,0-1.08-.63L18,11H16l-.3,1.49a3.647,3.647,0,0,0-1.08.63l-1.45-.49-1,1.73,1.14,1.01a4.338,4.338,0,0,0-.06.63,4.338,4.338,0,0,0,.06.63l-1.14,1.01,1,1.73,1.45-.49a3.647,3.647,0,0,0,1.08.63L16,21h2l.3-1.49a3.647,3.647,0,0,0,1.08-.63l1.45.49,1-1.73-1.14-1.01A4.338,4.338,0,0,0,20.75,16ZM17,18a2,2,0,1,1,2-2A2.006,2.006,0,0,1,17,18Z"
                            fill="#fff"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    My Profile
                  </Link>
                  <div className="help wallet-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#fff"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path d="M11 23.59v-3.6c-5.01-.26-9-4.42-9-9.49C2 5.26 6.26 1 11.5 1S21 5.26 21 10.5c0 4.95-3.44 9.93-8.57 12.4l-1.43.69zM11.5 3C7.36 3 4 6.36 4 10.5S7.36 18 11.5 18H13v2.3c3.64-2.3 6-6.08 6-9.8C19 6.36 15.64 3 11.5 3zm-1 11.5h2v2h-2zm2-1.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"></path>
                    </svg>
                    Help
                  </div>
                </div>
                <div className="logout-btn">Log Out</div>
              </div>
            </div>
          )}
        </button>
        {/* wallets box */}
        <DialogWallets
          show={openDialogWallets}
          onHide={handleCloseWalletDialog}
        />
      </div>
    </div>
  );
};

export default Navbar;
