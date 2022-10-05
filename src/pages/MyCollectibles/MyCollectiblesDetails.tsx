import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ic_send_to_my_wallet from '../../assets/svg/send_my_wallet_icon.svg';
import ic_show_off from '../../assets/svg/show_off_icon.svg';
import ic_back from '../../assets/svg/back_icon.svg';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import rare_lg from '../../assets/svg/rare_logo.svg';
import ic_authenticity from '../../assets/svg/authenticity_icon.svg';
import price_history_lg from '../../assets/svg/price_history_logo.svg';
import ic_trade from '../../assets/svg/trade_icon.svg';
import ic_sell from '../../assets/svg/sell_icon.svg';
import WarningForm from 'components/collectibles_modals/warning';
import SendingForm from '../../components/collectibles_modals/sending';
import SuccessForm from 'components/collectibles_modals/success';
import { AlertColor } from '@mui/material/Alert';
import Popup from 'reactjs-popup';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import {
  claimMysteryBox,
  getItemBalance,
  getKeyBalance,
} from '../../utils/marketTransactions';
import { convSecToString } from '../../utils/convSecToString';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { setApproveForAll } from '../../utils/transactions';
import { SUCCESS } from '../../config';
import { CircularProgress } from '@mui/material';
import CSnackbar from '../../components/common/CSnackbar';
const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const MyCollectiblesDetails = () => {
  const { account, library } = useActiveWeb3React();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [sendingOpen, setSendingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [item, setItem] = useState(0);
  const [status, setStatus] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPercentPosition, setScrollPercentPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };
  const closeWarning = () => {
    setWarningOpen(false);
  };

  const closeSending = () => {
    setSendingOpen(false);
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleRevealClick = async () => {
    setIsLoading(true);

    console.log(
      `location.state.item.keyContractAddress, : ${location.state.item.keyContractAddress}`
    );
    console.log(
      `location.state.item.boxContractAddress, : ${location.state.item.boxContractAddress}`
    );
    console.log(
      `location.state.item.boxContractAddress, : ${location.state.item.boxContractAddress}`
    );
    console.log(
      `location.state.item.balance, : ${location.state.item.balance}`
    );
    try {
      await setApproveForAll(
        location.state.item.keyContractAddress,
        location.state.item.boxContractAddress,
        account,
        library
      );
      const result: number = await claimMysteryBox(
        location.state.item.boxContractAddress,
        balance,
        account,
        library
      );
      console.log(result);
      // setOpenSnackbar({
      //   show: true,
      //   color: result === SUCCESS ? 'green' : 'red',
      //   message: result === SUCCESS ? 'Success Reveal.' : 'Failed Reveal',
      // });
      setOpenSnackbar({
        open: true,
        type: 'success',
        message: 'Success',
      });
      fetchBalance();
      console.log('success');
    } catch (error) {
      console.log(error);
      setOpenSnackbar({
        open: true,
        type: 'error',
        message: 'Failed.',
      });
      // setOpenSnackbar({ show: true, color: 'red', message: 'Failed Reveal.' });
    }
    setIsLoading(false);
  };

  const handleScrollPercent = () => {
    const positionPercent =
      (window.pageYOffset /
        (document.documentElement.offsetHeight - window.innerHeight)) *
      100;
    setScrollPercentPosition(positionPercent);
  };

  useEffect(() => {
    const handler = (event: any) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mouse-down', handler);
    return () => {
      document.removeEventListener('mouse-down', handler);
    };
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercent);

    return () => {
      window.removeEventListener('scroll', handleScrollPercent);
    };
  }, []);

  const fetchBalance = async () => {
    const balance = await getKeyBalance(
      location.state.item.keyContractAddress,
      account,
      library
    );

    const items = await getItemBalance(
      location.state.item.boxContractAddress,
      account,
      library
    );

    setBalance(balance);
    console.log(balance);
    setItem(items);
  };

  useEffect(() => {
    try {
      fetchBalance();
      const date = new Date(location.state.item.afterRelease);
      const lockup = date.getTime() / 1000; // Launch

      if (Date.now() / 1000 >= lockup) {
        setStatus(false);
      }

      console.log(status);
    } catch (e) {
      console.log(e);
    }
    // 리빌 버튼 표시 조건
    // reveal.status || reveal.balance === 0 || isLoading
  }, [location, balance]);

  return (
    <main className="collectibles-details-container">
      <div className="collectibles-details-wp">
        <div className="product-details">
          <div className="showcase-box">
            <Link to={'/my-collectibles'}>
              <button className="back-button">
                <img src={ic_back} alt="back-icon" /> Back
              </button>
            </Link>
            <img
              src="https://collectible.sweet.io/series/1727/image-front.png"
              alt=""
              className="thumbnail"
            />
            {/* <canvas className="canvas-card" width="1125" height="1125" style={{ width: '900px', height: '900px' }}></canvas> */}
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
                      <button
                        className="dropdown-item "
                        onClick={() => setWarningOpen(true)}
                      >
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
              rel="noreferrer"
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
              {/*<Popup*/}
              {/*  trigger={*/}
              {/*    <button type="button" className="btn-trade status disabled">*/}
              {/*      <img src={ic_sell} alt="sell" />*/}
              {/*      {'Sell on Sweet'}*/}
              {/*    </button>*/}
              {/*  }*/}
              {/*  position={*/}
              {/*    scrollPercentPosition < 60 ? 'top center' : 'bottom center'*/}
              {/*  }*/}
              {/*  on={['hover', 'focus']}*/}
              {/*>*/}
              {/*  <div className="noti-cannot" data-id="tooltip">*/}
              {/*    This collectible cannot be currently sold on Sweet.*/}
              {/*  </div>{' '}*/}
              {/*</Popup>*/}

              {status || balance === 0 ? null : (
                <button
                  className="btn-trade status"
                  onClick={handleRevealClick}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color={'inherit'} />
                  ) : (
                    <>Reveal</>
                  )}
                  {/*<img src={ic_trade} alt="trade" />*/}
                </button>
              )}
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

        <Popup
          open={warningOpen}
          onClose={closeWarning}
          modal
          {...{ closeOnDocumentClick, lockScroll, overlayStyle }}
        >
          <WarningForm
            close={closeWarning}
            onConfirm={() => setSendingOpen(true)}
          />
        </Popup>

        <Popup
          modal
          open={sendingOpen}
          onOpen={closeWarning}
          onClose={closeSending}
          {...{ closeOnDocumentClick, overlayStyle }}
        >
          <SendingForm
            close={closeSending}
            onConfirm={() => setSuccessOpen(true)}
          />
        </Popup>

        <Popup
          modal
          open={successOpen}
          onOpen={closeSending}
          onClose={closeSuccess}
          {...{ closeOnDocumentClick, overlayStyle }}
        >
          <SuccessForm close={closeSuccess} />
        </Popup>
        <CSnackbar
          open={openSnackbar.open}
          type={openSnackbar.type}
          message={openSnackbar.message}
          handleClose={handleCloseSnackbar}
        />
      </div>
    </main>
  );
};

export default MyCollectiblesDetails;
