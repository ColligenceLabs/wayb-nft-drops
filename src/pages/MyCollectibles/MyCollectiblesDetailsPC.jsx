import React from 'react';
import { Link } from 'react-router-dom';
import home_02 from '../../assets/img/home_02.jpeg';
import home_03 from '../../assets/img/home_03.jpeg';
import home_04 from '../../assets/img/home_04.jpeg';
import home_05_banner from '../../assets/img/home_05_banner.png';
import home_06_banner from '../../assets/img/home_06_banner.jpg';
import home_07_banner from '../../assets/img/home_07_banner.jpeg';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import verify from '../../assets/img/verify-icon.png';
import ic_send_to_my_wallet from '../../assets/svg/send_my_wallet_icon.svg';
import ic_show_off from '../../assets/svg/show_off_icon.svg';
import ic_back from '../../assets/svg/back_icon.svg';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import rare_lg from '../../assets/svg/rare_logo.svg';
import ic_authenticity from '../../assets/svg/authenticity_icon.svg';
import price_history_lg from '../../assets/svg/price_history_logo.svg';
import ic_trade from '../../assets/svg/trade_icon.svg';
import ic_sell from '../../assets/svg/sell_icon.svg';

import { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import Popup from 'reactjs-popup';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import MyCollectiblesDetailsMB from './MyCollectiblesDetailsMB';
const repositionOnResize = true;

const MyCollectiblesDetailsPC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return isMobile ? (
    <MyCollectiblesDetailsMB />
  ) : (
    <main className="collectibles-details-container">
      <div className="collectibles-details-wp">
        <div className="product-details">
          <div className="showcase-box">
            <Link to={'/my-collectibles'}>
              <button className="back-button">
                <img src={ic_back} alt="back-icon" /> Back
              </button>
            </Link>
            <canvas
              className="canvas-card"
              width="1125"
              height="1125"
              style={{ width: '900px', height: '900px' }}
            ></canvas>
          </div>

          <div className="details-box">
            <div className="banner-dropdown" ref={ref}>
              <div className="logo">
                <img
                  src="https://static.assets.sweet.io/campaigns/267/avatar.jpg"
                  alt="Sweet"
                  className="logo-img"
                />
                <div className="logo-info">
                  <div className="creator">Creator</div>
                  <div className="name">Sweet</div>
                </div>
              </div>
              <div className="dropdown">
                <div
                  className="dropdown-button"
                  onClick={() => setOpen((open) => !open)}
                >
                  <img src={ic_dropdown} alt="dropdown" />
                </div>
                {open && (
                  <ul className="dropdown-box">
                    <li className="list-dropdown-item">
                      <button className="dropdown-item ">
                        <img
                          src={ic_send_to_my_wallet}
                          alt="send-to-my-wallet"
                        />
                        Send to My Wallet
                      </button>
                    </li>
                    <li className="list-dropdown-item">
                      <button className="dropdown-item">
                        <img src={ic_show_off} alt="show-off" />
                        Show off
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="label-name">
              Strawberry Shortcake Space Creampop
              <div className="rarity-label">
                <img src={rare_lg} alt="rare-logo" />
                RARE
              </div>
            </div>
            <div className="description-label">
              {' '}
              The only thing better than ice cream is ice cream in SPACE!
            </div>
            <a
              target="_blank"
              href="https://polygonscan.com/token/0xF3e34e2022029A7eCb38d7373f7171f478670B20?a=48"
              className="authenticity-button"
            >
              <img src={ic_authenticity} alt="authenticity-icon" />
              Authenticity
            </a>
            <div className="list-item">
              <div className="item">
                <div className="label">Number</div>
                <div className="value">49</div>
              </div>
              <div className="item">
                <div className="label">Release Date</div>
                <div className="value">8/29/2022</div>
              </div>
              <div className="item">
                <div className="label">Date Acquired</div>
                <div className="value">9/2/2022</div>
              </div>
              <div className="item">
                <div className="label">Total Run</div>
                <div className="value">2000</div>
              </div>
              <div className="item">
                <div className="label" data-qa-component="token-type-label">
                  Token Type
                </div>
                <div className="value" data-qa-component="token-type-value">
                  erc721
                </div>
              </div>
              <div className="item">
                <div className="label">Network</div>
                <div className="value">Polygon</div>
              </div>
            </div>
            <div className="list-trade">
              <Popup
                // defaultOpen
                trigger={
                  <button type="button" className="btn-trade status disabled">
                    <img src={ic_sell} alt="sell" />
                    {'Sell on Sweet'}
                  </button>
                }
                {...{ repositionOnResize }}
                position={scrollPosition < 300 ? 'top center' : 'bottom center'}
                on={['hover', 'focus']}
              >
                {/* (<button className="btn-trade status disabled">
                                    <img src={ic_sell} alt="sell" />
                                    Sell on Sweet
                                </button>) */}
                <div className="noti-cannot" data-id="tooltip">
                  This collectible cannot be currently sold on Sweet.
                </div>{' '}
                {/* do it later */}
              </Popup>

              <button className="btn-trade status">
                <img src={ic_trade} alt="trade" />
                Trade on Sweet
                <div className="test">test</div>
              </button>
            </div>
            <div className="price-history">
              <div className="price-history-label">
                <img src={price_history_lg} alt="price-history" />
                Price History
              </div>
              <div className="list-price-history"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyCollectiblesDetailsPC;
