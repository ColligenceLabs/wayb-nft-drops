import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ic_send_to_my_wallet from '../../assets/svg/send_my_wallet_icon.svg';
import gift_token_icon from '../../assets/svg/gift_token_icon.svg';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import ic_authenticity from '../../assets/icon/info_blue.svg';
// import price_history_lg from '../../assets/svg/price_history_logo.svg';
// import ic_trade from '../../assets/svg/trade_icon.svg';
import ic_sell from '../../assets/svg/sell_icon.svg';
import klaytn_white from '../../assets/icon/klaytn_white.png';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_share from '../../assets/img/icon_share.png';
import arrow_btn_back from '../../assets/img/arrow_btn_back.png';
import WarningForm from 'components/collectibles_modals/warning';
import SendingForm from '../../components/collectibles_modals/sending';
import SuccessForm from 'components/collectibles_modals/success';
import Popup from 'reactjs-popup';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import {
  claimMysteryBox,
  getItemBalance,
  getItemMetadata,
  getKeyBalance,
  // getKeyMetadata,
  getTokenIds,
} from '../../utils/marketTransactions';

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
import CountDownTimer from '../../components/TimeCounter/CountDownTimer';
import { getRarityToString } from '../../utils/getRarityToString';
import { getNetworkNameByChainId } from '../../utils/getNetworkNameByChainId';
import useOnClickOutside from 'components/common/useOnClickOutside';
import {
  getItemPrice,
  getClaimableCount,
  requestClaim,
  getFeaturedById,
} from '../../services/services';
import { getPrice } from '../../utils/getPrice';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { moveToScope } from '../../utils/moveToScope';
import useCopyToClipBoard from '../../hooks/useCopyToClipboard';

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

type ExMBoxTypes = MBoxTypes & {
  companyimage: string;
  companyname: { ko: string; en: string };
};

const MyCollectiblesDetails = () => {
  const { account, library } = useActiveWeb3React();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const location = useLocation();
  const [mboxInfo, setMboxInfo] = useState<ExMBoxTypes | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [sendingOpen, setSendingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealItems, setRevealItems] = useState<ResRevealItemType[]>([]);
  const [balance, setBalance] = useState(0);
  const [item, setItem] = useState(0);
  const [claimableCount, setClaimableCount] = useState(0);
  const [status, setStatus] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [countDownFinish, setCountDownFinish] = useState(false);
  const [scrollPercentPosition, setScrollPercentPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredInfo, setFeaturedInfo] = useState<FeaturedTypes | null>(null);
  const { copyToClipBoard, copyResult, setCopyResult } = useCopyToClipBoard();
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

  const getSnsButtons = () => {
    if (featuredInfo && featuredInfo.links) {
      const test = featuredInfo.links.map((link: any) => {
        return (
          <div onClick={() => window.open(link.url)}>
            {link.type === 'SITE' && (
              <div className="custom-sns hide-max-1024px">
                <div className="image-sns">
                  <img src={website_icon} alt="website icon" />
                </div>
              </div>
            )}

            {link.type === 'DISCORD' && (
              <div className="custom-sns hide-max-1024px">
                <div className="image-sns">
                  <img src={icon_discord} alt="website icon" />
                </div>
              </div>
            )}

            {link.type === 'TWITTER' && (
              <div className="custom-sns hide-max-1024px">
                <div className="image-sns">
                  <img src={icon_twitter} alt="website icon" />
                </div>
              </div>
            )}
            {link.type === 'INSTAGRAM' && (
              <div className="custom-sns hide-max-1024px">
                <div className="image-sns">
                  <img src={icon_instagram} alt="website icon" />
                </div>
              </div>
            )}
          </div>
        );
      });
      return test;
    } else {
      return null;
    }
  };

  const handleClaimClick = async () => {
    setIsLoading(true);
    try {
      const talkenData = localStorage.getItem('talken.data');
      let _talkenData;
      let talkenUid = null,
        talkenEthAddress = null;
      if (talkenData) {
        _talkenData = JSON.parse(talkenData);
        talkenUid = _talkenData.uid;
        talkenEthAddress = account?.toLowerCase();
      }
      const signature = await library
        .getSigner()
        .signMessage(`${talkenUid} Claims ${claimableCount}NFTs`);
      const data = {
        mysterybox_id: mboxInfo?.id,
        buyer: talkenUid,
        buyer_address: talkenEthAddress,
        contract: mboxInfo?.boxContractAddress,
        signature,
      };
      const res = await requestClaim(data);
      setOpenSnackbar({
        open: true,
        type: 'success',
        message: 'Success',
      });
      fetchBalance();
    } catch (error) {
      console.log(error);
      setOpenSnackbar({
        open: true,
        type: 'error',
        message: 'Failed.',
      });
    }
    setIsLoading(false);
  };

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  const fetchBalance = async () => {
    if (
      mboxInfo?.isCollection !== true &&
      mboxInfo?.keyContractAddress !== null
    ) {
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

    const talkenData = localStorage.getItem('talken.data');
    let _talkenData;
    let talkenUid = null;
    if (talkenData) {
      _talkenData = JSON.parse(talkenData);
      talkenUid = _talkenData.uid;
    }
    if (talkenUid) {
      const claimableCount = await getClaimableCount(
        mboxInfo?.id || 0,
        talkenUid
      );
      setClaimableCount(claimableCount.data?.data || 0);
    }
  };

  const fetchRevealItem = async () => {
    const items = await getItemBalance(
      mboxInfo?.boxContractAddress,
      account,
      library
    );
    let tokenURI: string[] = [];
    let tokenIds: number[] = [];
    if (items > 0) {
      tokenURI = await getItemMetadata(
        mboxInfo?.boxContractAddress,
        items,
        account,
        library
      );
      // TODO : Comment out to display only revealed items
      // } else {
      //   tokenURI[0] = await getKeyMetadata(
      //     mboxInfo?.keyContractAddress,
      //     account,
      //     library
      //   );
      tokenIds = await getTokenIds(
        mboxInfo?.boxContractAddress,
        items,
        account,
        library
      );
    }

    if (tokenURI.length > 0) {
      const result = await Promise.all(
        tokenURI.map(async (uri, index) => {
          const res = await axios.get(uri);
          const rlt = await getItemPrice(uri);
          res.data.price = rlt.data?.data?.price ?? '-';
          res.data.no = rlt.data?.data?.no;
          res.data.tokenId = tokenIds[index];
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

  useEffect(() => {
    setOpenSnackbar({
      open: copyResult,
      type: 'success',
      message: 'copied!',
    });
  }, [copyResult]);

  useEffect(() => {
    const fetchFeatured = async () => {
      if (mboxInfo?.featuredId) {
        const featuredRes = await getFeaturedById(mboxInfo.featuredId);
        if (featuredRes.data !== '') {
          setFeaturedInfo(featuredRes.data);
        }
      }
    };

    fetchFeatured();
  }, [mboxInfo]);

  console.log('mbox???', featuredInfo);
  return (
    <main className="collectibles-details-container min-height-content">
      <div className="collectibles-details-wp">
        {/* <Link to={'/my-collectibles'}>
          <button className="back-button">
            <img src={arrow_btn_back} alt="arrow back" /> Back
          </button>
        </Link> */}
        <div className="product-details">
          <div className="showcase-box">
            <img src={mboxInfo?.packageImage} alt="" className="thumbnail" />
            {/* <canvas className="canvas-card" width="1125" height="1125" style={{ width: '900px', height: '900px' }}></canvas> */}
          </div>
          <div className="details-box">
            <div className="banner-dropdown" ref={ref}>
              <div className="logo">
                <img
                  src={mboxInfo?.companyimage}
                  alt="Sweet"
                  className="logo-img"
                />
                <div className="logo-info">
                  <div className="creator">Creator</div>
                  <div className="name">{mboxInfo?.companyname.en}</div>
                </div>
              </div>
              <div className="list-sns">
                <div
                  className="custom-sns hide-max-1024px"
                  onClick={() =>
                    moveToScope(
                      mboxInfo?.chainId,
                      mboxInfo?.boxContractAddress,
                      true
                    )
                  }
                >
                  <div className="image-sns">
                    <img src={klaytn_white} alt="website icon" />
                  </div>
                </div>
                {getSnsButtons()}
                {/*<div className="custom-sns hide-max-1024px">*/}
                {/*  <div className="image-sns">*/}
                {/*    <img src={website_icon} alt="website icon" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="custom-sns hide-max-1024px">*/}
                {/*  <div className="image-sns">*/}
                {/*    <img src={icon_discord} alt="website icon" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="custom-sns hide-max-1024px">*/}
                {/*  <div className="image-sns">*/}
                {/*    <img src={icon_twitter} alt="website icon" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="custom-sns hide-max-1024px">*/}
                {/*  <div className="image-sns">*/}
                {/*    <img src={icon_instagram} alt="website icon" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div*/}
                {/*  className="custom-sns"*/}
                {/*  onClick={() => copyToClipBoard(window.location.href)}*/}
                {/*>*/}
                {/*  <div className="image-sns">*/}
                {/*    <img src={icon_share} alt="website icon" />*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              {/* <div className="dropdown">
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
                        className="dropdown-item-nft "
                        onClick={() => {
                          setWarningOpen(true);
                          setDropdownOpen(false);
                        }}
                      >
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
                        Send to My Wallet
                      </button>
                    </li>
                    <li className="list-dropdown-item">
                      <button
                        className="dropdown-item-nft"
                        onClick={() => {
                          setDropdownOpen(false);
                        }}
                      >
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
              </div> */}
            </div>
            <div className="line-banner"></div>
            <div className="name-product">{mboxInfo?.title.en}</div>
            <div className="sub-product">{mboxInfo?.introduction.en}</div>
            {/*<a*/}
            {/*  target="_blank"*/}
            {/*  href="https://polygonscan.com/token/0xF3e34e2022029A7eCb38d7373f7171f478670B20?a=48"*/}
            {/*  className="authenticity-button"*/}
            {/*  rel="noreferrer"*/}
            {/*>*/}
            {/*  <img src={ic_authenticity} alt="authenticity-icon" />*/}
            {/*  Authenticity*/}
            {/*</a>*/}
            <div className="list-item">
              <div className="item">
                <div className="label">
                  {mboxInfo?.isCollection
                    ? 'Amount'
                    : status || balance !== 0
                    ? 'Reveal Amount'
                    : 'Amount'}
                </div>
                <div className="value">
                  {mboxInfo?.isCollection
                    ? `${item}`
                    : status || balance !== 0
                    ? `${balance}`
                    : `${item}`}
                </div>
              </div>
              <div className="item">
                <div className="label">Release Date</div>
                <div className="value">
                  {toStringByFormatting(new Date(mboxInfo?.releaseDatetime))}
                </div>
              </div>
              <div className="item">
                <div className="label">Date Acquired</div>
                <div className="value">
                  {toStringByFormatting(
                    new Date(
                      mboxInfo?.createdAt ? mboxInfo.createdAt.toString() : ''
                    )
                  )}
                </div>
              </div>
              <div className="item">
                <div className="label">Total Items</div>
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
                <div className="value">
                  {getNetworkNameByChainId(mboxInfo?.chainId)}
                </div>
              </div>
            </div>
            <div className="list-trade"></div>

            {/*{mboxInfo?.useRevealLockup ? (*/}
            {/*  <>*/}
            {/*    {!countDownFinish && (*/}
            {/*      <CountDownTimer*/}
            {/*        handeCheckCountDownFinish={handeCheckCountDownFinish}*/}
            {/*        targetDate={new Date(mboxInfo?.afterRelease)}*/}
            {/*      />*/}
            {/*    )}*/}
            {/*  </>*/}
            {/*) : (*/}
            {/*  <>*/}
            {/*    {status || balance === 0 ? null : (*/}
            {/*      <button*/}
            {/*        className="btn-trade status"*/}
            {/*        onClick={handleRevealClick}*/}
            {/*      >*/}
            {/*        {isLoading ? (*/}
            {/*          <CircularProgress size={30} color={'inherit'} />*/}
            {/*        ) : (*/}
            {/*          <>*/}
            {/*            <img src={ic_sell} alt="sell" />*/}
            {/*            Reveal*/}
            {/*          </>*/}
            {/*        )}*/}
            {/*        /!*<img src={ic_trade} alt="trade" />*!/*/}
            {/*      </button>*/}
            {/*    )}*/}
            {/*  </>*/}
            {/*)}*/}
            {mboxInfo?.useRevealLockup && !countDownFinish ? (
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
                {claimableCount > 0 ? (
                  <button
                    className="btn-trade status"
                    onClick={handleClaimClick}
                  >
                    {isLoading ? (
                      <CircularProgress size={30} color={'inherit'} />
                    ) : (
                      <>Claim</>
                    )}
                    {/*<img src={ic_trade} alt="trade" />*/}
                  </button>
                ) : status || balance === 0 ? null : (
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
          </div>
        </div>
        <div className="price-history">
          {/*<div className="price-history-label">*/}
          {/*  <img src={price_history_lg} alt="price-history" />*/}
          {/*  Price History*/}
          {/*</div>*/}
          {/*<div className="list-price-history"></div>*/}
        </div>
        <div className="my-revealed-items">My items</div>
        <div className="marketplace-items">
          {mboxInfo &&
            revealItems.map((item, index) => {
              return (
                <Link
                  to={`/klaytn/${mboxInfo.boxContractAddress}/${item.no}/${item.tokenId}`}
                  key={index}
                >
                  <div className="item_product" key={index}>
                    <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                      {/*<div className="total_item">Total Run: 50</div>*/}
                      <div className="total_item">Index: {item.no}</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                      <div>erc721</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                      <div className="card-image">
                        {item.extension === 'mp4' ? (
                          <video
                            playsInline
                            autoPlay
                            // controls
                            controlsList="nodownload"
                            muted
                            loop
                            width={'100%'}
                          >
                            <source src={item.image} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={item.image} alt="" />
                        )}
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                      <div className="owner_product">
                        <div className="owner_product_box">
                          <div className="owner_product_avatar">
                            <img src={mboxInfo?.packageImage} alt="" />
                          </div>
                          <div className="">{mboxInfo?.companyname.en}</div>
                        </div>
                        <div>
                          <Link to="/sale">
                            <div className="status ">Buy Now</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_KEY">
                      <div className="product_name ">{item.name}</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_BID_KEY">
                      <div className="box-price">
                        <div className="price ">Price</div>
                        <div className="currency ">{`${
                          mboxInfo.isCollection
                            ? getPrice(Number(item?.price), mboxInfo.quote!)
                            : getPrice(Number(mboxInfo.price), mboxInfo.quote!)
                        }`}</div>
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_TIME">
                      <div>
                        <div className="remaining ">Rarity</div>
                        <div className="remaining-total ">
                          {getRarityToString(item.rarity)}
                        </div>
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
    </main>
  );
};

export default MyCollectiblesDetails;
