import React from 'react';
import LoginForm from 'components/auth/loginForm';
import Popup from 'reactjs-popup';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_telegram from '../../assets/img/icon_telegram.png';

const SidebarMb = ({ show, onHide }) => {
  const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
  const closeOnDocumentClick = false;
  const lockScroll = true;
  return (
    // sidebar before login
    <div className={`side-bar ${show ? 'show' : ''}`}>
      <div className="close-sidebar">
        <div className="icon-close" onClick={onHide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24.329"
            height="24.329"
            viewBox="0 0 24.329 24.329"
          >
            <path
              id="Path_84708"
              data-name="Path 84708"
              d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z"
              transform="translate(-5 -5)"
              fill="#fff"
            ></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="465.885"
            height="465.036"
            viewBox="0 0 465.885 465.036"
          >
            <g id="eNP8Hf.tif" transform="translate(-300.041 -300.261)">
              <g
                id="Group_41630"
                data-name="Group 41630"
                transform="translate(300.042 300.261)"
              >
                <path
                  id="Path_87759"
                  data-name="Path 87759"
                  d="M533.449,300.4c124.719-4.348,232.923,106.47,232.476,232.881-.435,124.233-107.406,232.669-234.353,232.01-123.764-.64-232.438-107.414-231.525-234.816C300.934,406.974,407.388,295.721,533.449,300.4Zm-.316,47.738c-103.925,4.352-183.377,79.8-183.366,184.263s79.5,183.377,183.466,183.154c103.17-.224,182.452-77.74,182.911-182.814C716.6,429.637,638.446,352.9,533.133,348.143Z"
                  transform="translate(-300.042 -300.262)"
                  fill="#fff"
                ></path>
                <path
                  id="Path_87760"
                  data-name="Path 87760"
                  d="M354.229,426.641c0-20.786.188-41.576-.1-62.362-.1-7.435,2.725-10.4,10.159-10.138,10.543.36,21.106.208,31.658.06,5.8-.08,9.008,1.919,9,8.26q-.12,65.243-.016,130.484c.008,5.62-2.508,8.168-8.124,8.124-10.872-.092-21.755-.276-32.619.1-7.539.261-10.143-2.912-10.051-10.243C354.4,469.5,354.229,448.072,354.229,426.641Z"
                  transform="translate(-146.635 -150.09)"
                  fill="#fff"
                ></path>
                <path
                  id="Path_87761"
                  data-name="Path 87761"
                  d="M380.291,330.158c28.208.36,24.4-3.582,24.587,24.2.18,26.543.041,26.687-26.074,26.5-28.221-.2-24.4,3.621-24.587-24.16C354.033,330.158,354.178,330.158,380.291,330.158Z"
                  transform="translate(-146.602 -215.501)"
                  fill="#fff"
                ></path>
              </g>
            </g>
          </svg>
          About
        </a>
        <a href="/" className="blog button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M4.80001 4.2H11.2H4.80001ZM4.80001 7.4H11.2H4.80001ZM4.80001 10.6H7.20001H4.80001ZM3.20001 17H12.8C13.6837 17 14.4 16.2837 14.4 15.4V2.6C14.4 1.71634 13.6837 1 12.8 1H3.20001C2.31635 1 1.60001 1.71634 1.60001 2.6V15.4C1.60001 16.2837 2.31635 17 3.20001 17Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Blog
        </a>
        <div className="help button">
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
    </div>
  );
};

export default SidebarMb;
