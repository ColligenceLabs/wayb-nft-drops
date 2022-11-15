import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import close_icon from '../../assets/icon/close_icon.svg';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import klaytn_white from '../../assets/icon/klaytn_white.png';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_share from '../../assets/img/icon_share.png';
import PaymentWallets from 'components/modal/PaymentWallets';
import PaymentWalletsSuccess from 'components/modal/PaymentWalletsSuccess';
import { MBoxTypes } from '../../types/MBoxTypes';
import {
  getMboxItemListMboxId,
  getMysteryBoxInfo,
} from '../../services/services';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import MBoxItemCard from '../../components/card/MBoxItemCard';
import { CircularProgress, ImageList, ImageListItem } from '@mui/material';
import { getKeyRemains } from '../../utils/marketTransactions';
import { SUCCESS } from '../../config';
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
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { getItemAmountNoSigner } from '../../utils/transactions';
import ReactModal from 'react-modal';
import useOnClickOutsideDropdown from 'components/common/useOnClickOutside';
import { moveToScope } from 'utils/moveToScope';
import { FeaturedTypes } from 'types/FeaturedTypes';
import useCopyToClipBoard from 'hooks/useCopyToClipboard';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};
type LinkTypes = {
  type: string;
  url: string;
  useExternalUrl: boolean;
};
const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const SaleCollectibles = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { account, library, chainId } = useWeb3React();
  const dropsAccount = useSelector((state: any) => state.account.account);
  const [mBoxInfo, setMBoxInfo] = useState<ExMBoxType | null>(null);
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
  const [isZoomImage, setIsZoomImage] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const { copyToClipBoard, copyResult, setCopyResult } = useCopyToClipBoard();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const refdropdown = useRef() as MutableRefObject<HTMLDivElement>;
  useOnClickOutsideDropdown(refdropdown, () => setDropdownOpen(false));
  const [featuredInfo, setFeaturedInfo] = useState<FeaturedTypes | null>(null);

  const closeWarning = () => {
    setWarningOpen(false);
  };
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

  // useOnClickOutside(ref, () => setModalOpen(false));

  const handleClosePaymentWallet = async () => {
    setOpenPaymentWalletsSuccess(false);
    getAvailability(location.state.item);
  };

  const getAvailability = async (info: ExMBoxType) => {
    const left = await getKeyRemains(
      info.keyContractAddress,
      info.boxContractAddress,
      account,
      library
    );
    setRemains(left);
  };

  const moveToFeatured = () => {
    if (mBoxInfo) navigate(`/klaytn/featured/${mBoxInfo.featuredId}`);
  };

  useEffect(() => {
    const fetchMboxItemList = async () => {
      const mboxInfoRes = await getMysteryBoxInfo(params.id!);
      if (mboxInfoRes.data.status === SUCCESS) {
        setMBoxInfo(mboxInfoRes.data.data);
        const mboxItemsRes = await getMboxItemListMboxId(params.id!);
        if (mboxItemsRes.status === 200) {
          if (mboxItemsRes.data.list) {
            const newList = await Promise.all(
              mboxItemsRes.data.list.map(
                async (item: MBoxTypes, index: number) => {
                  const remaining = await getItemAmountNoSigner(
                    mboxInfoRes.data.data.boxContractAddress,
                    index,
                    item?.isCollection === true ? 2 : 1, // 1 = MysteryBox, 2 = Collection
                    account,
                    chainId ?? 8217
                  );
                  return { ...item, remainingAmount: remaining };
                }
              )
            );
            setMBoxItemList(newList);
          }
        }
      }
    };

    fetchMboxItemList();
  }, [params, library]);

  useEffect(() => {
    if (account && library?.connection && mBoxInfo) {
      const targetWallet = getTargetWallet(mBoxInfo?.chainId, wallet);
      const isKaikas = checkKaikas(library);
      if (
        (isKaikas && targetWallet === 'metamask') ||
        (!isKaikas && targetWallet === 'kaikas')
      ) {
        checkConnectWallet(mBoxInfo?.chainId, wallet, activate);
        return;
      }

      getAvailability(mBoxInfo);
    }
  }, [account, library, mBoxInfo]);

  useEffect(() => {
    if (mBoxInfo && mBoxInfo?.afterRelease) {
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
  const getSnsButtons = () => {
    if (featuredInfo && featuredInfo.links) {
      const test = featuredInfo.links.map((link: LinkTypes) => {
        return (
          <div
            style={{
              cursor: 'pointer',
            }}
            className="info-item hide-max-1024px"
            onClick={() => window.open(link.url)}
          >
            <div className="image-item hide-max-1024px">
              {link.type === 'SITE' && (
                <img src={website_icon} alt="Website Icon" />
              )}
              {link.type === 'DISCORD' && (
                <img src={icon_discord} alt="Website Icon" />
              )}
              {link.type === 'TWITTER' && (
                <img src={icon_twitter} alt="Website Icon" />
              )}
              {link.type === 'INSTAGRAM' && (
                <img src={icon_instagram} alt="Website Icon" />
              )}
            </div>
          </div>
        );
      });
      return test;
    } else {
      return null;
    }
  };

  const getSnsMobileButtons = () => {
    return (
      <ul className="dropdown-box">
        <li className="list-dropdown-item">
          <button
            className="dropdown-item-nft  button"
            onClick={() =>
              moveToScope(mBoxInfo?.chainId, mBoxInfo?.boxContractAddress, true)
            }
          >
            <div className="custom-link-sns">
              <div className="image-sns">
                <img src={klaytn_white} alt="website icon" />
              </div>
              Explorer
            </div>
          </button>
        </li>
        {featuredInfo &&
          featuredInfo.links.map((link: LinkTypes) => (
            <li className="list-dropdown-item">
              <button className="dropdown-item-nft  button">
                <a href={link.url} target="_blank" className="custom-link-sns">
                  <div className="image-sns">
                    {link.type === 'SITE' && (
                      <img src={website_icon} alt="Website Icon" />
                    )}
                    {link.type === 'DISCORD' && (
                      <img src={icon_discord} alt="Website Icon" />
                    )}
                    {link.type === 'TWITTER' && (
                      <img src={icon_twitter} alt="Website Icon" />
                    )}
                    {link.type === 'INSTAGRAM' && (
                      <img src={icon_instagram} alt="Website Icon" />
                    )}
                  </div>
                  {link.type === 'SITE' && 'Website'}
                  {link.type === 'DISCORD' && 'Discord'}
                  {link.type === 'TWITTER' && 'Twitter'}
                  {link.type === 'INSTAGRAM' && 'Instagram'}
                </a>
              </button>
            </li>
          ))}
      </ul>
    );
  };
  const refDropdown = useRef() as MutableRefObject<HTMLDivElement>;
  useOnClickOutsideDropdown(refDropdown, () => setDropdownOpen(false));
  return (
    <main className="collection-container min-height-content">
      {mBoxInfo ? (
        <div>
          <div className="price-collection-view-page">
            <div className="price-collection-box">
              <div className="token-showcase-box">
                {/* button zoom image */}
                <div
                  className="zoom-image"
                  onClick={() => setIsZoomImage(true)}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M595.2 96l129.8 129.8-499.2 499.2L96 595.2V928h332.8l-129.8-129.8 499.2-499.2 129.8 129.8V96z"></path>
                  </svg>
                </div>
                {mBoxInfo.revealAnimation === null ? (
                  // <img
                  //   style={{ objectFit: 'cover' }}
                  //   src={mBoxInfo.packageImage}
                  //   alt=""
                  // />
                  <>
                    {mBoxInfo.packageImage.indexOf('.mp4') > -1 ? (
                      <div>
                        <video muted autoPlay playsInline loop>
                          <source
                            src={mBoxInfo.packageImage}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ) : (
                      <>
                        <img
                          style={{ objectFit: 'cover' }}
                          src={mBoxInfo.packageImage}
                          alt=""
                        />
                        {/* modal zoom image */}
                        <ReactModal
                          isOpen={isZoomImage}
                          className={'modal-zoom-image'}
                        >
                          <div
                            className="close-modal"
                            onClick={() => setIsZoomImage(false)}
                          >
                            <img src={close_icon} alt="Close Icon" />
                          </div>
                          <img
                            className="image"
                            src={mBoxInfo.packageImage}
                            alt=""
                          />
                        </ReactModal>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {mBoxInfo.revealAnimation.indexOf('.mp4') > -1 ? (
                      <div>
                        <video muted autoPlay playsInline loop>
                          <source
                            src={mBoxInfo.revealAnimation}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ) : (
                      <>
                        <img src={mBoxInfo.revealAnimation} alt="" />
                        {/* modal zoom image */}
                        <ReactModal
                          isOpen={isZoomImage}
                          className={'modal-zoom-image'}
                        >
                          <div
                            className="close-modal"
                            onClick={() => setIsZoomImage(false)}
                          >
                            <img src={close_icon} alt="Close Icon" />
                          </div>
                          <img
                            className="image"
                            src={mBoxInfo.revealAnimation}
                            alt=""
                          />
                        </ReactModal>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="straight-line"></div>
              <div className="token-details-box">
                <div className="wrapper-head-token">
                  <div onClick={moveToFeatured}>
                    <div className="box-owner-product">
                      <button className="btn-avatar-owner-product">
                        <img
                          src={mBoxInfo.featured?.company.image}
                          alt={mBoxInfo.featured?.company.name.en}
                        />
                      </button>
                      <div className="name-owner-product">
                        <div className="creator-title">Creator</div>
                        <button className="btn-name-owner-product">
                          {mBoxInfo.featured?.company.name.en}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* list sns icon */}
                  <div className="collection-info-right">
                    <div className="collection-info-left-details">
                      <div className="info-item hide-max-1024px">
                        <div
                          className="image-item"
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            moveToScope(
                              mBoxInfo.chainId,
                              mBoxInfo?.boxContractAddress,
                              true
                            )
                          }
                        >
                          <img src={klaytn_white} alt="website icon" />
                        </div>
                      </div>
                      {getSnsButtons()}
                      <div
                        className="dropdown hide-min-1025px"
                        ref={refDropdown}
                      >
                        <div
                          className="dropdown-button"
                          onClick={() =>
                            setDropdownOpen((dropdownOpen) => !dropdownOpen)
                          }
                        >
                          <img src={ic_dropdown} alt="dropdown" />
                        </div>
                        {dropdownOpen && getSnsMobileButtons()}
                      </div>
                    </div>
                    <div className="line-icon" />
                    <div className="collection-info-left-details">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => copyToClipBoard(window.location.href)}
                        className="info-item"
                      >
                        <div className="image-item">
                          <img
                            src={icon_share}
                            alt="Twitter Icon"
                            width="20px"
                          />
                        </div>
                      </div>
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
                {/*<div>*/}
                {/*  <a className="authenticity-button">*/}
                {/*    <img src={ic_info} style={{ marginRight: '5px' }} alt="" />{' '}*/}
                {/*    Authenticity*/}
                {/*  </a>*/}
                {/*</div>*/}
                <div>
                  <div className="box-price-collection">
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Total Items</div>
                      <div className="lable-bottom fw-600">
                        {mBoxInfo.totalAmount}
                      </div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Availability</div>
                      <div className="lable-bottom fw-600">{remains}</div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Network</div>
                      <div className="lable-bottom fw-600">
                        {getNetworkNameById(mBoxInfo.chainId)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="box-purchase-price">
                    <div className="lable-top">Purchase price</div>
                    <div className="lable-bottom fw-600">{`${mBoxInfo.price} ${mBoxInfo.quote}`}</div>
                  </div>
                  {!countDownFinish && (
                    <CountDownTimer
                      handeCheckCountDownFinish={handeCheckCountDownFinish}
                      targetDate={new Date(mBoxInfo.releaseDatetime)}
                    />
                  )}
                  {account &&
                  library?.connection &&
                  dropsAccount.address !== '' ? (
                    <>
                      {countDownFinish && (
                        <button
                          className={'btn-sale-collection'}
                          disabled={isLoading || remains === 0}
                          onClick={() => setOpenPaymentWallets(true)}
                          // onClick={handleBuyClick}
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
                  )}
                  {/* <button className="btn-sale-collection disable">Sold out</button> */}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="title-sale-by-Collectors fw-600">
                  Items in the mystery box
                </div>
                <div className="sub-title-sale-by-Collectors fw-600">
                  You will get one of the items below.
                </div>
              </div>

              <div className="puzzle-container">
                <div>
                  <ImageList className="puzzle" cols={13}>
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
                  {/*For Sale by Collectors*/}
                </div>
                <div className="sub-title-sale-by-Collectors fw-600">
                  {/*Sold out? No problem! Check out user listings below.*/}
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
                      mBoxInfo={mBoxInfo}
                      chainId={mBoxInfo?.chainId}
                      mBoxName={mBoxInfo?.title.en}
                      mBoxImage={mBoxInfo?.packageImage}
                      quote={mBoxInfo?.quote}
                      price={mBoxInfo?.price}
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
            itemInfo={mBoxInfo!}
            isCollection={false}
            show={openPaymentWallets}
            onHide={() => setOpenPaymentWallets(false)}
            openPaymentWalletsSuccess={() => setOpenPaymentWalletsSuccess(true)}
          />
          <PaymentWalletsSuccess
            itemInfo={mBoxInfo!}
            isCollection={false}
            show={openPaymentWalletsSuccess}
            onHide={handleClosePaymentWallet}
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
