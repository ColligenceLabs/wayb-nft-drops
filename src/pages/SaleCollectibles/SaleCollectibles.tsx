import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import not_found from '../../assets/img/not_found.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import ic_info from '../../assets/icon/info_blue.svg';
import ic_search from '../../assets/icon/search.svg';
import PaymentWallets from 'components/modal/PaymentWallets';
import PaymentWalletsSuccess from 'components/modal/PaymentWalletsSuccess';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getMboxItemListMboxId, registerBuy } from '../../services/services';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import MBoxItemCard from '../../components/card/MBoxItemCard';
import { CircularProgress, ImageList, ImageListItem } from '@mui/material';
import { buyKey, getKeyRemains } from '../../utils/marketTransactions';
import { parseEther } from 'ethers/lib/utils';
import contracts from '../../config/constants/contracts';
import { SUCCESS, targetNetwork } from '../../config';
import { useWeb3React } from '@web3-react/core';
import {
  checkConnectWallet,
  checkKaikas,
  getTargetWallet,
} from '../../utils/wallet';
import WalletConnector from '../../components/auth/WalletConnector/WalletConnector';
import Popup from 'reactjs-popup';
import CSnackbar from '../../components/common/CSnackbar';
import CountDownTimer from '../../components/TimeCounter/CountDownTimer';
import { useSelector } from 'react-redux';

type MBoxTypesWithCompany = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const SaleCollectibles = () => {
  const location = useLocation();

  const { account, library } = useWeb3React();

  const [mBoxInfo, setMBoxInfo] = useState<MBoxTypesWithCompany | null>(null);
  const [remains, setRemains] = useState(0);
  const [mBoxItemList, setMBoxItemList] = useState<MBoxItemTypes[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openPaymentWallets, setOpenPaymentWallets] = useState(false);
  const [openPaymentWalletsSuccess, setOpenPaymentWalletsSuccess] =
    useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countDownFinish, setCountDownFinish] = useState(false);
  const wallet = useSelector((state: any) => state.wallet);
  const { activate } = useWeb3React();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handeCheckCountDownFinish = () => {
    setCountDownFinish(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };
  const closeSignup = () => {
    setSignupOpen(false);
  };

  const ref = useRef();
  const useOnClickOutside = (ref: any, handler: any) => {
    useEffect(() => {
      const listener = (event: any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  };

  useOnClickOutside(ref, () => setModalOpen(false));

  const handleBuyClick = async () => {
    setIsLoading(true);
    try {
      if (mBoxInfo) {
        // chainid 로 네트워크 확인(eth, klaytn) 후 해당 지갑 연결 체크
        const check = await checkConnectWallet(
          mBoxInfo.chainId,
          wallet,
          activate
        );
        if (!check) {
          // 지갑 연결 화면띄우고 종료
          setIsLoading(false);
          setLoginOpen(true);
          return;
        }
        const amount = 1;
        const price = mBoxInfo.price ?? 0;
        const payment = parseEther((price * amount).toString()).toString();
        const result = await buyKey(
          mBoxInfo.boxContractAddress,
          1,
          payment,
          mBoxInfo.quote === 'klay'
            ? contracts.klay[targetNetwork]
            : contracts.wklay[targetNetwork],
          account,
          library
        );

        if (result === SUCCESS) {
          const left = await getKeyRemains(
            mBoxInfo.keyContractAddress,
            mBoxInfo.boxContractAddress,
            account,
            library
          );
          setRemains(left);

          const data = {
            mysterybox_id: mBoxInfo.id,
            buyer: '',
            buyer_address: account,
          };

          const res = await registerBuy(data);
          if (res.data.status === SUCCESS) {
            setOpenSnackbar({
              open: true,
              type: 'success',
              message: 'Success',
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      setOpenSnackbar({
        open: true,
        type: 'error',
        message: 'Failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMboxItemList = async () => {
      const res = await getMboxItemListMboxId(location.state.item.id);
      if (res.status === 200) {
        setMBoxItemList(res.data.list);
      }
    };
    if (location.state.item) {
      setMBoxInfo(location.state.item);
      fetchMboxItemList();
    }
  }, [location]);

  useEffect(() => {
    const getAvailability = async (info: MBoxTypesWithCompany) => {
      const left = await getKeyRemains(
        info.keyContractAddress,
        info.boxContractAddress,
        account,
        library
      );
      setRemains(left);
    };
    if (account && library?.connection) {
      const targetWallet = getTargetWallet(location.state.item.chainId, wallet);
      const isKaikas = checkKaikas(library);
      if (
        (isKaikas && targetWallet === 'metamask') ||
        (!isKaikas && targetWallet === 'kaikas')
      ) {
        checkConnectWallet(location.state.item.chainId, wallet, activate);
        return;
      }
      getAvailability(location.state.item);
    }
  }, [account, library]);

  useEffect(() => {
    if (mBoxInfo?.afterRelease) {
      const today = new Date();
      const targetDate = new Date(mBoxInfo.afterRelease);

      if (today < targetDate) setShowCountDown(true);
      else {
        setShowCountDown(false);
      }
    } else {
      setShowCountDown(false);
    }
  }, [mBoxInfo?.afterRelease, showCountDown, new Date()]);

  return (
    <main className="collection-container min-height-content">
      {mBoxInfo ? (
        <div>
          <div className="price-collection-view-page">
            <div className="price-collection-box">
              <div className="token-showcase-box">
                {mBoxInfo.revealAnimation.indexOf('.mp4') > -1 ? (
                  <div>
                    <video muted autoPlay playsInline loop>
                      <source src={mBoxInfo.revealAnimation} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <img src={mBoxInfo.revealAnimation} alt="" />
                )}
              </div>
              <div className="straight-line"></div>
              <div className="token-details-box">
                <div>
                  <div className="box-owner-product">
                    <button className="btn-avatar-owner-product">
                      <img
                        src={mBoxInfo.companyLogo}
                        alt={mBoxInfo.companyName}
                      />
                    </button>
                    <div className="name-owner-product">
                      <button className="btn-name-owner-product">
                        {mBoxInfo.companyName}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="btn-buy-now">Buy Now</div>
                </div>
                <div>
                  <div className="box-name-collection">
                    <div className="name-collection fw-600">
                      {mBoxInfo.title.en}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="content-collection">
                    {mBoxInfo.introduction.en}
                  </div>
                </div>
                <div>
                  <a className="authenticity-button">
                    <img src={ic_info} style={{ marginRight: '5px' }} alt="" />{' '}
                    Authenticity
                  </a>
                </div>
                <div>
                  <div className="box-price-collection">
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Total Run</div>
                      <div className="lable-bottom fw-600">
                        {mBoxInfo.totalAmount}
                      </div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Availability</div>
                      <div className="lable-bottom fw-600">{remains}</div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Token Type</div>
                      <div className="lable-bottom fw-600">erc721</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="box-purchase-price">
                    <div className="lable-top">Purchase price</div>
                    <div className="lable-bottom fw-600">{`${mBoxInfo.price} ${mBoxInfo.quote}`}</div>
                  </div>
                  {/* {!countDownFinish && (
                    <CountDownTimer
                      handeCheckCountDownFinish={handeCheckCountDownFinish}
                      targetDate={new Date(mBoxInfo.afterRelease)}
                    />
                  )}
                  {account && library?.connection ? (
                    <>
                      {countDownFinish && (
                        <button
                          className={'btn-sale-collection'}
                          disabled={isLoading || remains === 0}
                          // onClick={() => setOpenPaymentWallets(true)}
                          onClick={handleBuyClick}
                        >
                          {isLoading ? (
                            <CircularProgress size={30} color={'inherit'} />
                          ) : remains === 0 ? (
                            'Sold out'
                          ) : (
                            'Buy Now'
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className={'btn-sale-collection'}
                      onClick={() => setLoginOpen(true)}
                    >
                      Connect Wallet
                    </button>
                  )} */}
                  <button
                    className={'btn-sale-collection'}
                    disabled={isLoading || remains === 0}
                    onClick={() => setOpenPaymentWallets(true)}
                    // onClick={handleBuyClick}
                  >
                    Buy Now
                  </button>
                  {/* <button className="btn-sale-collection disable">Sold out</button> */}
                </div>
              </div>
            </div>
            <div>
              <div className="puzzle-container">
                <div>
                  <ImageList className="puzzle" cols={11}>
                    {mBoxItemList.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={item.itemImage}
                          srcSet={item.itemImage}
                          alt={''}
                          loading="lazy"
                        />
                        {/*<div style={{ position: 'absolute', color: 'white' }}>*/}
                        {/*  {index}*/}
                        {/*</div>*/}
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
              <div>
                <div className="title-sale-by-Collectors fw-600">
                  For Sale by Collectors
                </div>
                <div className="sub-title-sale-by-Collectors fw-600">
                  Sold out? No problem! Check out user listings below.
                </div>
              </div>
              <div className="userSales">
                {/* <div className="filter-box">
                  <div className="search-box">
                    <img
                      src={ic_search}
                      style={{ margin: '0px 5px 0px 20px' }}
                      alt=""
                    />
                    <input
                      className="marketplace-search-textbox"
                      placeholder="Search NFT"
                    />
                  </div>
                  <div className="type-filter-box">
                    <div className="type-filter-box-left">
                      <div className="type-filter-item active">All</div>
                      <div className="type-filter-item">Buy Now</div>
                      <div className="type-filter-item">Auction</div>
                    </div>
                    <div className="type-filter-box-right">
                      <div className="dropdown-sort-type-collection"></div>
                      <div className=""></div>
                    </div>
                  </div>
                </div> */}
                <div className="marketplace-items">
                  {mBoxItemList.map((item, index) => (
                    <MBoxItemCard
                      key={index}
                      item={item}
                      mBoxName={mBoxInfo?.title.en}
                      mBoxImage={mBoxInfo?.packageImage}
                    />
                  ))}
                  <div className="list-carousel">
                    {/* {list_products.map((item, index) => (*/}
                    {/*  <div className="slide-item" key={index}>*/}
                    {/*    <Link to={'/sale'} className="button">*/}
                    {/*      <div className="hot-ollectibles-wrapper">*/}
                    {/*        <div className="header-left hot-ollectibles-item">*/}
                    {/*          <span className="total-run fw-600">*/}
                    {/*            Total Run: 35000*/}
                    {/*          </span>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div>erc721</div>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div className="img-token">*/}
                    {/*            <img src={home_11} alt="" />*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div className="wrapper-item">*/}
                    {/*            <div className="content-left">*/}
                    {/*              <div className="avatar">*/}
                    {/*                <img src={home_13_avt} alt="" />*/}
                    {/*              </div>*/}
                    {/*              <div className="name-label">Elton John</div>*/}
                    {/*            </div>*/}
                    {/*            <div className="content-right">Buy Now</div>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div className="name-label">*/}
                    {/*            Elton John Rocket NFT Club Pass*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div className="wrapper-price">*/}
                    {/*            <div className="price-header font-size-14">*/}
                    {/*              Price*/}
                    {/*            </div>*/}
                    {/*            <div className="current-price font-size-18">*/}
                    {/*              $29.99*/}
                    {/*            </div>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="hot-ollectibles-item">*/}
                    {/*          <div className="wrapper-remaining">*/}
                    {/*            <div className="remaining-header font-size-14">*/}
                    {/*              Remaining{' '}*/}
                    {/*            </div>*/}
                    {/*            <div className="quantity-remaining font-size-18">*/}
                    {/*              26008*/}
                    {/*            </div>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*      </div>*/}
                    {/*    </Link>*/}
                    {/*  </div>*/}
                    {/*))} */}
                  </div>

                  {/* not found item */}
                  {/* <div className="not-found">
                    <div className="image-not-found">
                      <img src={not_found} alt="" />
                    </div>
                    <div className="token-not-found">No tokens found...</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <PaymentWallets
            show={openPaymentWallets}
            onHide={() => setOpenPaymentWallets(false)}
            openPaymentWalletsSuccess={() => setOpenPaymentWalletsSuccess(true)}
          />
          <PaymentWalletsSuccess
            show={openPaymentWalletsSuccess}
            onHide={() => setOpenPaymentWalletsSuccess(false)}
          />
          <Popup
            modal
            open={loginOpen}
            onOpen={closeSignup}
            onClose={closeLogin}
            {...{ overlayStyle, closeOnDocumentClick, lockScroll }}
          >
            {/* <LoginForm close={closeLogin} onConfirm={() => setSignupOpen(true)} /> */}
            <WalletConnector
              close={closeLogin}
              onConfirm={() => setSignupOpen(true)}
            />
          </Popup>
          <CSnackbar
            open={openSnackbar.open}
            type={openSnackbar.type}
            message={openSnackbar.message}
            handleClose={handleCloseSnackbar}
          />
        </div>
      ) : null}
    </main>
  );
};

export default SaleCollectibles;
