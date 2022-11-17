import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import icon_twitter from '../../assets/img/icon_twitter.png';
// import icon_discord from '../../assets/img/icon_discord.png';
// import icon_telegram from '../../assets/img/icon_telegram.png';
import icon_insta from '../../assets/icon/instagram.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import wallet_blue from '../../assets/icon/wallet_blue.svg';
import my_collectibles from '../../assets/icon/my_collectibles.svg';
import my_profile from '../../assets/icon/my_profile.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import { useModalWalletsStore, useSidebarStore } from './AppStore';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useDispatch, useSelector } from 'react-redux';
import { initWallets } from '../../redux/slices/wallet';
import { initDropsAccount } from '../../redux/slices/account';
import WalletConnector from 'components/auth/WalletConnector/WalletConnector';
import Popup from 'reactjs-popup';

const UsernameBox = () => {
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
  const { deactivate } = useActiveWeb3React();
  const { updateOpenWallet } = useModalWalletsStore();
  const { closeSidebar } = useSidebarStore();
  const dispatch = useDispatch();

  const handleClickLogout = async () => {
    await deactivate();
    dispatch(initWallets());
    dispatch(initDropsAccount());
    localStorage.removeItem('dropsJwtToken');
  };
  const navigate = useNavigate();

  return (
    <div className="user-dropdown-box">
      <div className="close-sidebar">
        <div className="icon-close" onClick={closeSidebar}>
          <img src={close_icon} alt="Close Icon" />
        </div>
      </div>
      <div className="wrapper-dropdown">
        {/* <div className="wrapper-wallets">
          <div
            className="btn-wallets button"
            onClick={(e) => {
              e.stopPropagation();
              setLoginOpen(true);
              closeSidebar();
            }}
          >
            <div className="img-wallet">
              <img src={wallet_blue} alt="wallet" />
            </div>
            <div>Wallets</div>
          </div>
        </div> */}
        <Link
          to={'/my-collectibles'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          {/* <img src={my_collectibles} alt="My Collectibles" /> */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5.5C13.0001 5.10204 13.1583 4.72044 13.4398 4.43913C13.7213 4.15783 14.103 3.99987 14.501 4C14.899 4.00013 15.2806 4.15835 15.5619 4.43984C15.8432 4.72133 16.0011 5.10304 16.001 5.501C16.0009 5.89896 15.8427 6.28056 15.5612 6.56187C15.2797 6.84317 14.898 7.00113 14.5 7.001C14.102 7.00087 13.7204 6.84265 13.4391 6.56116C13.1578 6.27967 12.9999 5.89796 13 5.5V5.5ZM2 18H16C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C0.9 20 0 19.1 0 18V6C0 5.46957 0.210714 4.96086 0.585786 4.58579C0.960859 4.21071 1.46957 4 2 4V18ZM20 2V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V2C4 1.46957 4.21071 0.960859 4.58579 0.585786C4.96086 0.210714 5.46957 0 6 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2ZM6 2V8.333L9 5L13.855 10.395L14.511 9.664C14.6986 9.45515 14.928 9.28813 15.1844 9.17379C15.4407 9.05945 15.7183 9.00036 15.999 9.00036C16.2797 9.00036 16.5573 9.05945 16.8136 9.17379C17.07 9.28813 17.2994 9.45515 17.487 9.664L18 10.234V2H6Z"
              fill="white"
            />
          </svg>
          My Collections
        </Link>
        <Link
          to={'/purchase-history'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_220_703)">
              <path
                d="M10.2 5.80002V0.400024H4.8C4.32261 0.400024 3.86477 0.589667 3.52721 0.927232C3.18964 1.2648 3 1.72263 3 2.20002V17.8C3 18.2774 3.18964 18.7353 3.52721 19.0728C3.86477 19.4104 4.32261 19.6 4.8 19.6H10.5084C9.66204 18.5773 9.14536 17.3222 9.0264 16H8.4C8.24087 16 8.08826 15.9368 7.97574 15.8243C7.86321 15.7118 7.8 15.5592 7.8 15.4C7.8 15.2409 7.86321 15.0883 7.97574 14.9758C8.08826 14.8632 8.24087 14.8 8.4 14.8H9.0264C9.06304 14.394 9.13736 13.9923 9.2484 13.6H8.4C8.24087 13.6 8.08826 13.5368 7.97574 13.4243C7.86321 13.3118 7.8 13.1592 7.8 13C7.8 12.8409 7.86321 12.6883 7.97574 12.5758C8.08826 12.4632 8.24087 12.4 8.4 12.4H9.72C9.9396 11.9704 10.2048 11.5684 10.5084 11.2H8.4C8.24087 11.2 8.08826 11.1368 7.97574 11.0243C7.86321 10.9118 7.8 10.7592 7.8 10.6C7.8 10.4409 7.86321 10.2883 7.97574 10.1758C8.08826 10.0632 8.24087 10 8.4 10H11.8044C12.8784 9.24403 14.1876 8.80002 15.6 8.80002C16.2086 8.79944 16.8143 8.88303 17.4 9.04842V7.60002H12C11.5226 7.60002 11.0648 7.41038 10.7272 7.07282C10.3896 6.73525 10.2 6.27741 10.2 5.80002ZM5.4 10.6C5.4 10.4409 5.46321 10.2883 5.57574 10.1758C5.68826 10.0632 5.84087 10 6 10C6.15913 10 6.31174 10.0632 6.42426 10.1758C6.53679 10.2883 6.6 10.4409 6.6 10.6C6.6 10.7592 6.53679 10.9118 6.42426 11.0243C6.31174 11.1368 6.15913 11.2 6 11.2C5.84087 11.2 5.68826 11.1368 5.57574 11.0243C5.46321 10.9118 5.4 10.7592 5.4 10.6ZM5.4 13C5.4 12.8409 5.46321 12.6883 5.57574 12.5758C5.68826 12.4632 5.84087 12.4 6 12.4C6.15913 12.4 6.31174 12.4632 6.42426 12.5758C6.53679 12.6883 6.6 12.8409 6.6 13C6.6 13.1592 6.53679 13.3118 6.42426 13.4243C6.31174 13.5368 6.15913 13.6 6 13.6C5.84087 13.6 5.68826 13.5368 5.57574 13.4243C5.46321 13.3118 5.4 13.1592 5.4 13ZM6 14.8C6.15913 14.8 6.31174 14.8632 6.42426 14.9758C6.53679 15.0883 6.6 15.2409 6.6 15.4C6.6 15.5592 6.53679 15.7118 6.42426 15.8243C6.31174 15.9368 6.15913 16 6 16C5.84087 16 5.68826 15.9368 5.57574 15.8243C5.46321 15.7118 5.4 15.5592 5.4 15.4C5.4 15.2409 5.46321 15.0883 5.57574 14.9758C5.68826 14.8632 5.84087 14.8 6 14.8Z"
                fill="white"
              />
              <path
                d="M11.4002 5.80001V0.700012L17.1002 6.40001H12.0002C11.8411 6.40001 11.6885 6.3368 11.5759 6.22428C11.4634 6.11175 11.4002 5.95914 11.4002 5.80001ZM21.0002 15.4C21.0002 16.8322 20.4313 18.2057 19.4186 19.2184C18.4059 20.2311 17.0324 20.8 15.6002 20.8C14.168 20.8 12.7945 20.2311 11.7818 19.2184C10.7691 18.2057 10.2002 16.8322 10.2002 15.4C10.2002 13.9678 10.7691 12.5943 11.7818 11.5816C12.7945 10.5689 14.168 10 15.6002 10C17.0324 10 18.4059 10.5689 19.4186 11.5816C20.4313 12.5943 21.0002 13.9678 21.0002 15.4ZM16.2002 11.8C16.2002 11.6409 16.137 11.4883 16.0245 11.3757C15.9119 11.2632 15.7593 11.2 15.6002 11.2C15.4411 11.2 15.2885 11.2632 15.1759 11.3757C15.0634 11.4883 15.0002 11.6409 15.0002 11.8V15.4C15.0002 15.5591 15.0634 15.7118 15.1759 15.8243C15.2885 15.9368 15.4411 16 15.6002 16H18.0002C18.1593 16 18.3119 15.9368 18.4245 15.8243C18.537 15.7118 18.6002 15.5591 18.6002 15.4C18.6002 15.2409 18.537 15.0883 18.4245 14.9757C18.3119 14.8632 18.1593 14.8 18.0002 14.8H16.2002V11.8Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_220_703"
                x="-1"
                y="0.400024"
                width="26"
                height="28.4"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_220_703"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_220_703"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          Purchase History
        </Link>
        <Link
          to={'/my-profile'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          {/* <img src={my_profile} alt="My Profile" /> */}
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0801 11.6669C19.1614 11.2262 19.1614 10.7761 19.0801 10.3355L19.8865 9.86979C19.9802 9.81666 20.0209 9.70727 19.9896 9.60414C19.7802 8.92907 19.4208 8.3165 18.952 7.8102C18.8801 7.73207 18.7645 7.71331 18.6707 7.76644L17.8644 8.23212C17.5237 7.94146 17.1331 7.71644 16.7111 7.56642V6.63508C16.7111 6.52881 16.6361 6.43505 16.533 6.41318C15.836 6.25691 15.1266 6.26316 14.464 6.41318C14.3609 6.43505 14.2859 6.52881 14.2859 6.63508V7.56642C13.864 7.71644 13.4733 7.94146 13.1326 8.23212L12.3263 7.76644C12.2357 7.71331 12.1169 7.73207 12.045 7.8102C11.5762 8.3165 11.2168 8.92907 11.0074 9.60414C10.9762 9.70727 11.0199 9.81666 11.1105 9.86979L11.9169 10.3355C11.8356 10.7761 11.8356 11.2262 11.9169 11.6669L11.1105 12.1325C11.0168 12.1857 10.9762 12.295 11.0074 12.3982C11.2168 13.0733 11.5762 13.6827 12.045 14.1921C12.1169 14.2703 12.2325 14.289 12.3263 14.2359L13.1326 13.7702C13.4733 14.0609 13.864 14.2859 14.2859 14.4359V15.3672C14.2859 15.4735 14.3609 15.5673 14.464 15.5891C15.161 15.7454 15.8704 15.7392 16.533 15.5891C16.6361 15.5673 16.7111 15.4735 16.7111 15.3672V14.4359C17.1331 14.2859 17.5237 14.0609 17.8644 13.7702L18.6707 14.2359C18.7614 14.289 18.8801 14.2703 18.952 14.1921C19.4208 13.6858 19.7802 13.0733 19.9896 12.3982C20.0209 12.295 19.9771 12.1857 19.8865 12.1325L19.0801 11.6669V11.6669ZM15.5016 12.5169C14.664 12.5169 13.9859 11.8356 13.9859 11.0012C13.9859 10.1667 14.6672 9.48538 15.5016 9.48538C16.3361 9.48538 17.0174 10.1667 17.0174 11.0012C17.0174 11.8356 16.3392 12.5169 15.5016 12.5169ZM7.00074 8.00084C9.21035 8.00084 11.0012 6.21003 11.0012 4.00042C11.0012 1.79081 9.21035 0 7.00074 0C4.79113 0 3.00032 1.79081 3.00032 4.00042C3.00032 6.21003 4.79113 8.00084 7.00074 8.00084ZM13.2889 15.0797C13.217 15.0422 13.1451 14.9985 13.0764 14.9578L12.8295 15.1016C12.642 15.2079 12.4294 15.2672 12.2169 15.2672C11.8763 15.2672 11.5481 15.1235 11.3137 14.8734C10.7418 14.2546 10.3042 13.5014 10.0573 12.6982C9.88542 12.145 10.1167 11.5606 10.6167 11.2699L10.8636 11.1262C10.8605 11.0449 10.8605 10.9637 10.8636 10.8824L10.6167 10.7386C10.1167 10.4511 9.88542 9.86354 10.0573 9.31036C10.0854 9.21972 10.1261 9.12909 10.1573 9.03845C10.0386 9.02908 9.92292 9.00095 9.80103 9.00095H9.2791C8.58528 9.31973 7.81332 9.501 7.00074 9.501C6.18815 9.501 5.41932 9.31973 4.72237 9.00095H4.20044C1.88145 9.00095 0 10.8824 0 13.2014V14.5015C0 15.3297 0.671946 16.0017 1.50016 16.0017H12.5013C12.817 16.0017 13.1108 15.9017 13.3514 15.736C13.3139 15.6173 13.2889 15.4954 13.2889 15.3672V15.0797Z"
              fill="white"
            />
          </svg>
          My Profile
        </Link>
        {/* <div className="help wallet-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM11 16H9V14H11V16ZM11.976 11.115C11.78 11.273 11.591 11.424 11.441 11.574C11.033 11.981 11.001 12.351 11 12.367V12.5H9V12.333C9 12.215 9.029 11.156 10.026 10.159C10.221 9.964 10.463 9.766 10.717 9.56C11.451 8.965 11.933 8.531 11.933 7.933C11.9214 7.42782 11.7125 6.94725 11.3511 6.59412C10.9896 6.24099 10.5043 6.04334 9.99901 6.04347C9.4937 6.0436 9.0085 6.2415 8.64725 6.59482C8.28599 6.94814 8.07736 7.42881 8.066 7.934H6.066C6.066 5.765 7.831 4 10 4C12.169 4 13.934 5.765 13.934 7.934C13.934 9.531 12.755 10.484 11.976 11.115V11.115Z"
              fill="white"
            />
          </svg>
          Help
        </div> */}
        <div className="wrapper-fanpages">
          <a
            href="//twitter.com/Talken_"
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_twitter} alt="" />
          </a>
          <a
            href={'//discord.gg/S33c5DA9cW'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_discord} alt="" />
          </a>
          <a
            href={'//www.instagram.com/talken_nft'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_insta} alt="" />
          </a>
        </div>
      </div>
      <div
        className="logout-btn"
        onClick={() => {
          handleClickLogout();
          closeSidebar();
          navigate('/');
        }}
      >
        Log Out
      </div>
      {/* popup connect wallet */}
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
    </div>
  );
};

export default UsernameBox;
