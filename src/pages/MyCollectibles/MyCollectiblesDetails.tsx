import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
ic_dropdown;
import { Link, useLocation } from 'react-router-dom';
import ic_send_to_my_wallet from '../../assets/svg/send_my_wallet_icon.svg';
import gift_token_icon from '../../assets/svg/gift_token_icon.svg';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import rare_lg from '../../assets/svg/rare_logo.svg';
import ic_authenticity from '../../assets/icon/info_blue.svg';
import price_history_lg from '../../assets/svg/price_history_logo.svg';
import ic_trade from '../../assets/svg/trade_icon.svg';
import ic_sell from '../../assets/svg/sell_icon.svg';
import arrow_btn_back from '../../assets/img/arrow_btn_back.png';
import product from '../../assets/img/product.png';
import avatar from '../../assets/img/avatar.png';
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
  getItemMetadata,
  getKeyBalance,
  getKeyMetadata,
} from '../../utils/marketTransactions';
import { convSecToString } from '../../utils/convSecToString';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { setApproveForAll } from '../../utils/transactions';
import { CircularProgress } from '@mui/material';
import CSnackbar from '../../components/common/CSnackbar';
import axios from 'axios';
import { ResRevealItemType } from '../../types/ResRevealItemType';
import { MBoxTypes } from '../../types/MBoxTypes';
import {
  checkConnectWallet,
  checkKaikas,
  getTargetWallet,
} from '../../utils/wallet';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { hotCollectiblesTestData } from 'pages/homepage/mockData';
import CountDownTimer from '../../components/TimeCounter/CountDownTimer';
const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const list_products = [
  {
    id: 1,
    owner_name: 'Milwaukee Bucks 1',
    name: 'Chicago Deer 1',
  },
  {
    id: 2,
    owner_name: 'Milwaukee Bucks 2',
    name: 'Chicago Deer 2',
  },
  {
    id: 3,
    owner_name: 'Milwaukee Bucks 3',
    name: 'Chicago Deer 3',
  },
  {
    id: 4,
    owner_name: 'Milwaukee Bucks 4',
    name: 'Chicago Deer 4',
  },
  {
    id: 5,
    owner_name: 'Milwaukee Bucks 5',
    name: 'Chicago Deer 5',
  },
  {
    id: 6,
    owner_name: 'Milwaukee Bucks 6',
    name: 'Chicago Deer 6',
  },
  {
    id: 7,
    owner_name: 'Milwaukee Bucks 7',
    name: 'Chicago Deer 7',
  },
  {
    id: 8,
    owner_name: 'Milwaukee Bucks 8',
    name: 'Chicago Deer 8',
  },
  {
    id: 9,
    owner_name: 'Milwaukee Bucks 9',
    name: 'Chicago Deer 9',
  },
];
const MyCollectiblesDetails = () => {
  const { account, library } = useActiveWeb3React();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const location = useLocation();
  const [mboxInfo, setMboxInfo] = useState<MBoxTypes | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [sendingOpen, setSendingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealItems, setRevealItems] = useState<ResRevealItemType[]>([]);
  const [balance, setBalance] = useState(0);
  const [item, setItem] = useState(0);
  const [status, setStatus] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [countDownFinish, setCountDownFinish] = useState(false);
  const [scrollPercentPosition, setScrollPercentPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const wallet = useSelector((state: any) => state.wallet);
  const { activate } = useWeb3React();

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };

  const handeCheckCountDownFinish = () => {
    setCountDownFinish(true);
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

    try {
      await setApproveForAll(
        mboxInfo?.keyContractAddress,
        mboxInfo?.boxContractAddress,
        account,
        library
      );
      const result: number = await claimMysteryBox(
        mboxInfo?.boxContractAddress,
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
      setIsRevealed(true);
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

  // const handleScrollPercent = () => {
  //   const positionPercent =
  //     (window.pageYOffset /
  //       (document.documentElement.offsetHeight - window.innerHeight)) *
  //     100;
  //   setScrollPercentPosition(positionPercent);
  // };

  // useEffect(() => {
  //   const handler = (event: any) => {
  //     if (!ref.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };
  //   document.addEventListener('mouse-down', handler);
  //   return () => {
  //     document.removeEventListener('mouse-down', handler);
  //   };
  // });

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScrollPercent);

  //   return () => {
  //     window.removeEventListener('scroll', handleScrollPercent);
  //   };
  // }, []);

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  const fetchBalance = async () => {
    if (mboxInfo?.isCollection !== true) {
      const balance = await getKeyBalance(
        mboxInfo?.keyContractAddress,
        account,
        library
      );

      setBalance(balance);
    }

    const items = await getItemBalance(
      mboxInfo?.boxContractAddress,
      account,
      library
    );

    console.log(account, library.connection, balance);
    setItem(items);
  };

  const fetchRevealItem = async () => {
    const items = await getItemBalance(
      mboxInfo?.boxContractAddress,
      account,
      library
    );
    let tokenURI: string[] = [];
    if (items > 0) {
      tokenURI = await getItemMetadata(
        mboxInfo?.boxContractAddress,
        items,
        account,
        library
      );
    } else {
      tokenURI[0] = await getKeyMetadata(
        mboxInfo?.keyContractAddress,
        account,
        library
      );
    }

    console.log(tokenURI);
    if (tokenURI.length > 0) {
      const result = await Promise.all(
        tokenURI.map(async (uri) => {
          const res = await axios.get(uri);
          console.log(res.data);
          return res.data;
        })
      );

      console.log(result);
      setRevealItems(result);
    }
  };

  useEffect(() => {
    try {
      if (mboxInfo && account && library?.connection) {
        const targetWallet = getTargetWallet(mboxInfo?.chainId, wallet);
        const isKaikas = checkKaikas(library);
        if (
          (isKaikas && targetWallet === 'metamask') ||
          (!isKaikas && targetWallet === 'kaikas')
        ) {
          checkConnectWallet(location.state.item.chainId, wallet, activate);
          return;
        }
        fetchBalance();
        fetchRevealItem();
        const date = new Date(mboxInfo?.afterRelease);
        const lockup = date.getTime() / 1000; // Launch

        if (Date.now() / 1000 >= lockup) {
          setStatus(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
    // 리빌 버튼 표시 조건
    // reveal.status || reveal.balance === 0 || isLoading
  }, [mboxInfo, balance, account, library]);

  useEffect(() => {
    if (location.state.item) {
      setMboxInfo(location.state.item);
    }
  }, []);

  console.log(revealItems);
  return (
    <main className="collectibles-details-container min-height-content">
      <div className="collectibles-details-wp">
        <Link to={'/my-collectibles'}>
          <button className="back-button">
            <img src={arrow_btn_back} alt="arrow back" /> Back
          </button>
        </Link>
        <div className="product-details">
          <div className="showcase-box">
            <img src={mboxInfo?.packageImage} alt="" className="thumbnail" />
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
                  <div className="name">McLaren Racing</div>
                </div>
              </div>
              <div className="dropdown">
                <div
                  className="dropdown-button"
                  onClick={() =>
                    setDropdownOpen((dropdownOpen) => !dropdownOpen)
                  }
                >
                  <img src={ic_dropdown} alt="dropdown" />
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-box">
                    <li className="list-dropdown-item">
                      <button
                        className="dropdown-item "
                        onClick={() => {
                          setWarningOpen(true);
                          setDropdownOpen(false);
                        }}
                      >
                        <img
                          src={ic_send_to_my_wallet}
                          alt="send-to-my-wallet"
                        />
                        Send to Private Address
                      </button>
                    </li>
                    <li className="list-dropdown-item">
                      <button className="dropdown-item">
                        <img src={gift_token_icon} alt="gift token icon" />
                        Gift this token
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="line-banner"></div>
            {/* <div className="label-name">
              {mboxInfo.title.en}
              <div className="rarity-label">
                <img src={rare_lg} alt="rare-logo" />
                RARE
              </div>
            </div>
            <div className="description-label">{mboxInfo.introduction.en}</div> */}
            <div className="name-product">{mboxInfo?.title.en}</div>
            <div className="sub-product">{mboxInfo?.introduction.en}</div>
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
                <div className="value">49(?)</div>
              </div>
              <div className="item">
                <div className="label">Release Date</div>
                <div className="value">
                  {toStringByFormatting(new Date(mboxInfo?.releaseDatetime))}
                </div>
              </div>
              <div className="item">
                <div className="label">Date Acquired</div>
                <div className="value">9/2/2022</div>
              </div>
              <div className="item">
                <div className="label">Total Run</div>
                <div className="value">{mboxInfo?.totalAmount}</div>
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
                <div className="value">{mboxInfo?.chainId}</div>
              </div>
            </div>
            <div className="list-trade">
              {/*<button type="button" className="btn-trade status">*/}
              {/*  <img src={ic_sell} alt="sell" />*/}
              {/*  {'Sell on Drop'}*/}
              {/*</button>*/}
              {/*<button type="button" className="btn-trade status">*/}
              {/*  <img src={ic_trade} alt="trade" />*/}
              {/*  {'Trade on Drop'}*/}
              {/*</button>*/}
              {/* <Popup
                trigger={
                  <button type="button" className="btn-trade status">
                    <img src={ic_sell} alt="sell" />
                    {'Sell on Drop'}
                  </button>
                }
                position={
                  scrollPercentPosition < 60 ? 'top center' : 'bottom center'
                }
                on={['hover', 'focus']}
              >
                <div className="noti-cannot" data-id="tooltip">
                  This collectible cannot be currently sold on Sweet.
                </div>{' '}
              </Popup>
              <Popup
                trigger={
                  <button type="button" className="btn-trade status">
                    <img src={ic_trade} alt="sell" />
                    {'Trade on Drop'}
                  </button>
                }
                position={
                  scrollPercentPosition < 60 ? 'top center' : 'bottom center'
                }
                on={['hover', 'focus']}
              >
                <div className="noti-cannot" data-id="tooltip">
                  This collectible cannot be currently sold on Sweet.
                </div>{' '}
              </Popup> */}

              {/*{status || balance === 0 ? null : (*/}
              {/*  <button*/}
              {/*    className="btn-trade status"*/}
              {/*    // onClick={handleRevealClick}*/}
              {/*  >*/}
              {/*    {isLoading ? (*/}
              {/*      <CircularProgress size={30} color={'inherit'} />*/}
              {/*    ) : (*/}
              {/*      <>*/}
              {/*        <img src={ic_sell} alt="sell" />*/}
              {/*        Reveal*/}
              {/*      </>*/}
              {/*    )}*/}
              {/*    /!*<img src={ic_trade} alt="trade" />*!/*/}
              {/*  </button>*/}
              {/*)}*/}
            </div>
            <>
              {mboxInfo?.useRevealLockup ? (
                <>
                  {!countDownFinish && (
                    <CountDownTimer
                      handeCheckCountDownFinish={handeCheckCountDownFinish}
                      targetDate={new Date(mboxInfo?.afterRelease)}
                    />
                  )}
                </>
              ) : (
                <>
                  {status || balance === 0 ? null : (
                    <button
                      className="btn-trade status"
                      onClick={handleRevealClick}
                    >
                      {isLoading ? (
                        <CircularProgress size={30} color={'inherit'} />
                      ) : (
                        <>
                          <img src={ic_sell} alt="sell" />
                          Reveal
                        </>
                      )}
                      {/*<img src={ic_trade} alt="trade" />*/}
                    </button>
                  )}
                </>
              )}
            </>
          </div>
        </div>
        <div className="price-history">
          {/*<div className="price-history-label">*/}
          {/*  <img src={price_history_lg} alt="price-history" />*/}
          {/*  Price History*/}
          {/*</div>*/}
          {/*<div className="list-price-history"></div>*/}
        </div>
        <div className="my-revealed-items">My revealed items</div>
        <div className="marketplace-items">
          {mboxInfo &&
            revealItems.map((item, index) => {
              return (
                <Link to={`/sale/${index}`} key={index}>
                  <div className="item_product">
                    <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                      <div className="total_item">Total Run: 50</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                      <div>erc721</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                      <div className="card">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                      <div className="owner_product">
                        <div className="owner_product_box">
                          <span className="owner_product_avatar">
                            <img src={mboxInfo?.packageImage} alt="" />
                          </span>
                          <p className="">{mboxInfo?.title.en}</p>
                        </div>
                        {/*<Link to="/sale">*/}
                        {/*  <div className="status ">Buy Now</div>*/}
                        {/*</Link>*/}
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_KEY">
                      <div className="product_name ">{item.name}</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_BID_KEY">
                      <div className="box-price">
                        <div className="price ">Price</div>
                        <div className="currency ">{`${mboxInfo?.price} ${mboxInfo?.quote}`}</div>
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_TIME">
                      <div>
                        <div className="remaining ">Rarity</div>
                        <div className="remaining-total ">{item.rarity}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          {/*{list_products.map((item, index) => {*/}
          {/*  return (*/}
          {/*    <Link to={`/sale/${index}`} key={index}>*/}
          {/*      <div className="item_product">*/}
          {/*        <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">*/}
          {/*          <div className="total_item">Total Run: 50</div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">*/}
          {/*          <div>erc721</div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">*/}
          {/*          <div className="card">*/}
          {/*            <img src={product} alt="" />*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">*/}
          {/*          <div className="owner_product">*/}
          {/*            <div className="owner_product_box">*/}
          {/*              <span className="owner_product_avatar">*/}
          {/*                <img src={avatar} alt="" />*/}
          {/*              </span>*/}
          {/*              <p className="">{item.owner_name}</p>*/}
          {/*            </div>*/}
          {/*            <Link to="/sale">*/}
          {/*              <div className="status ">Buy Now</div>*/}
          {/*            </Link>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_NAME_KEY">*/}
          {/*          <div className="product_name ">{item.name}</div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_BID_KEY">*/}
          {/*          <div className="box-price">*/}
          {/*            <div className="price ">Price</div>*/}
          {/*            <div className="currency ">$50.00</div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="item_product_detail MARKETPLACE_NAME_TIME">*/}
          {/*          <div>*/}
          {/*            <div className="remaining ">Remaining</div>*/}
          {/*            <div className="remaining-total ">0</div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Link>*/}
          {/*  );*/}
          {/*})}*/}
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
      {/* <div className="collectibles-details-wp">
        <div className="my-product">
          {revealItems.map((item, index) => (
            <div className="product" key={index}>
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
};

export default MyCollectiblesDetails;
