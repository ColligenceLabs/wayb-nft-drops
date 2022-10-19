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
import useOnClickOutside from 'components/common/useOnClickOutside';
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
  // const [mboxInfo, setMboxInfo] = useState<MBoxTypes>(location.state.item);
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
  const [scrollPercentPosition, setScrollPercentPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const wallet = useSelector((state: any) => state.wallet);
  const { activate } = useWeb3React();
  useOnClickOutside(ref, () => setDropdownOpen(false));

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

  // const handleRevealClick = async () => {
  //   setIsLoading(true);

  //   try {
  //     await setApproveForAll(
  //       mboxInfo.keyContractAddress,
  //       mboxInfo.boxContractAddress,
  //       account,
  //       library
  //     );
  //     const result: number = await claimMysteryBox(
  //       mboxInfo.boxContractAddress,
  //       balance,
  //       account,
  //       library
  //     );
  //     console.log(result);
  //     // setOpenSnackbar({
  //     //   show: true,
  //     //   color: result === SUCCESS ? 'green' : 'red',
  //     //   message: result === SUCCESS ? 'Success Reveal.' : 'Failed Reveal',
  //     // });
  //     setOpenSnackbar({
  //       open: true,
  //       type: 'success',
  //       message: 'Success',
  //     });
  //     fetchBalance();
  //     setIsRevealed(true);
  //     console.log('success');
  //   } catch (error) {
  //     console.log(error);
  //     setOpenSnackbar({
  //       open: true,
  //       type: 'error',
  //       message: 'Failed.',
  //     });
  //     // setOpenSnackbar({ show: true, color: 'red', message: 'Failed Reveal.' });
  //   }
  //   setIsLoading(false);
  // };

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

  // const fetchBalance = async () => {
  //   const balance = await getKeyBalance(
  //     mboxInfo.keyContractAddress,
  //     account,
  //     library
  //   );

  //   const items = await getItemBalance(
  //     mboxInfo.boxContractAddress,
  //     account,
  //     library
  //   );

  //   setBalance(balance);
  //   console.log(account, library.connection, balance);
  //   setItem(items);
  // };

  // const fetchRevealItem = async () => {
  //   const items = await getItemBalance(
  //     mboxInfo.boxContractAddress,
  //     account,
  //     library
  //   );
  //   let tokenURI: string[] = [];
  //   if (items > 0) {
  //     tokenURI = await getItemMetadata(
  //       mboxInfo.boxContractAddress,
  //       items,
  //       account,
  //       library
  //     );
  //   } else {
  //     tokenURI[0] = await getKeyMetadata(
  //       mboxInfo.keyContractAddress,
  //       account,
  //       library
  //     );
  //   }

  //   if (tokenURI.length > 0) {
  //     const result = await Promise.all(
  //       tokenURI.map(async (uri) => {
  //         const res = await axios.get(uri);
  //         return res.data;
  //       })
  //     );
  //     console.log(result);

  //     setRevealItems(result);
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     if (account && library?.connection) {
  //       const targetWallet = getTargetWallet(
  //         location.state.item.chainId,
  //         wallet
  //       );
  //       const isKaikas = checkKaikas(library);
  //       if (
  //         (isKaikas && targetWallet === 'metamask') ||
  //         (!isKaikas && targetWallet === 'kaikas')
  //       ) {
  //         checkConnectWallet(location.state.item.chainId, wallet, activate);
  //         return;
  //       }
  //       fetchBalance();
  //       const date = new Date(mboxInfo.afterRelease);
  //       const lockup = date.getTime() / 1000; // Launch

  //       if (Date.now() / 1000 >= lockup) {
  //         setStatus(false);
  //       }

  //       console.log(status);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // 리빌 버튼 표시 조건
  //   // reveal.status || reveal.balance === 0 || isLoading
  // }, [location, balance, account, library]);

  // useEffect(() => {
  //   fetchRevealItem();
  // }, []);

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
                        onClick={() => setWarningOpen(true)}
                      >
                        {/* <img
                          src={ic_send_to_my_wallet}
                          alt="send-to-my-wallet"
                        /> */}
                        <svg
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 15V16C18 17.1 17.1 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16C17.1 0 18 0.9 18 2V3H9C8.46957 3 7.96086 3.21071 7.58579 3.58579C7.21071 3.96086 7 4.46957 7 5V13C7 13.5304 7.21071 14.0391 7.58579 14.4142C7.96086 14.7893 8.46957 15 9 15H18ZM9 13H19V5H9V13ZM13 10.5C12.17 10.5 11.5 9.83 11.5 9C11.5 8.17 12.17 7.5 13 7.5C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5Z"
                            fill="white"
                          />
                        </svg>
                        Send to Private Address
                      </button>
                    </li>
                    <li className="list-dropdown-item">
                      <button className="dropdown-item">
                        {/* <img src={gift_token_icon} alt="gift token icon" /> */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.75 18.9531C1.75 19.368 2.08516 19.7031 2.5 19.7031H9.20312V10.8906H1.75V18.9531ZM10.7969 19.7031H17.5C17.9148 19.7031 18.25 19.368 18.25 18.9531V10.8906H10.7969V19.7031ZM18.625 5.26562H15.1656C15.4844 4.76406 15.6719 4.16875 15.6719 3.53125C15.6719 1.74766 14.2211 0.296875 12.4375 0.296875C11.4672 0.296875 10.593 0.728125 10 1.40781C9.40703 0.728125 8.53281 0.296875 7.5625 0.296875C5.77891 0.296875 4.32812 1.74766 4.32812 3.53125C4.32812 4.16875 4.51328 4.76406 4.83438 5.26562H1.375C0.960156 5.26562 0.625 5.60078 0.625 6.01562V9.29688H9.20312V5.26562H10.7969V9.29688H19.375V6.01562C19.375 5.60078 19.0398 5.26562 18.625 5.26562ZM9.20312 5.17188H7.5625C6.65781 5.17188 5.92188 4.43594 5.92188 3.53125C5.92188 2.62656 6.65781 1.89062 7.5625 1.89062C8.46719 1.89062 9.20312 2.62656 9.20312 3.53125V5.17188ZM12.4375 5.17188H10.7969V3.53125C10.7969 2.62656 11.5328 1.89062 12.4375 1.89062C13.3422 1.89062 14.0781 2.62656 14.0781 3.53125C14.0781 4.43594 13.3422 5.17188 12.4375 5.17188Z"
                            fill="white"
                          />
                        </svg>
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
            <div className="name-product">GENERATIVE MAGIC THE DOG</div>
            <div className="sub-product">
              Old Navy’s collection of algorithmically generated, stylistically
              curated NFTs co-created with Boys & Girls Clubs of America. We
              invite you to join the pile and spread playfulness with us!
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
              </Popup> */}
              <button type="button" className="btn-trade status">
                <img src={ic_sell} alt="sell" />
                {'Sell on Drop'}
              </button>
              <button type="button" className="btn-trade status">
                <img src={ic_trade} alt="trade" />
                {'Trade on Drop'}
              </button>
              {/* {status || balance === 0 ? null : (
                <button
                  className="btn-trade status"
                  onClick={handleRevealClick}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color={'inherit'} />
                  ) : (
                    <>Reveal</>
                  )}
                  <img src={ic_trade} alt="trade" />
                </button>
              )} */}
            </div>
          </div>
        </div>
        <div className="price-history">
          <div className="price-history-label">
            <img src={price_history_lg} alt="price-history" />
            Price History
          </div>
          <div className="list-price-history"></div>
        </div>
        <div className="my-revealed-items">My revealed items</div>
        <div className="marketplace-items">
          {list_products.map((item, index) => {
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
                      <img src={product} alt="" />
                    </div>
                  </div>
                  <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                    <div className="owner_product">
                      <div className="owner_product_box">
                        <span className="owner_product_avatar">
                          <img src={avatar} alt="" />
                        </span>
                        <p className="">{item.owner_name}</p>
                      </div>
                      <Link to="/sale">
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                  <div className="item_product_detail MARKETPLACE_NAME_KEY">
                    <div className="product_name ">{item.name}</div>
                  </div>
                  <div className="item_product_detail MARKETPLACE_BID_KEY">
                    <div className="box-price">
                      <div className="price ">Price</div>
                      <div className="currency ">$50.00</div>
                    </div>
                  </div>
                  <div className="item_product_detail MARKETPLACE_NAME_TIME">
                    <div>
                      <div className="remaining ">Remaining</div>
                      <div className="remaining-total ">0</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
