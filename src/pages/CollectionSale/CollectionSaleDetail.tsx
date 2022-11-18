import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import close_icon from '../../assets/icon/close_icon.svg';
import icon_seemore from '../../assets/icon/icon_seemore.png';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import klaytn_white from '../../assets/icon/klaytn_white.png';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_share from '../../assets/img/icon_share.png';
import { CircularProgress } from '@mui/material';
import PaymentWallets from '../../components/modal/PaymentWallets';
import PaymentWalletsSuccess from '../../components/modal/PaymentWalletsSuccess';
import Popup from 'reactjs-popup';
import WalletConnector from '../../components/auth/WalletConnector/WalletConnector';
import CSnackbar from '../../components/common/CSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import CountDownTimer from '../../components/TimeCounter/CountDownTimer';
import { buyItem, getItemAmountNoSigner } from '../../utils/transactions';
import contracts from '../../config/constants/contracts';
import { SUCCESS } from '../../config';
import {
  getCollectionInfo,
  getFeaturedById,
  registerBuy,
  getFreeDroppedCount,
} from '../../services/services';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { MBoxTypes } from '../../types/MBoxTypes';
import useOnClickOutsideDropdown from 'components/common/useOnClickOutside';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { moveToScope } from '../../utils/moveToScope';
import useCopyToClipBoard from '../../hooks/useCopyToClipboard';
import { BigNumber } from 'ethers';
import { checkKaikasWallet, getTargetNetworkName } from '../../utils/wallet';
import ReactTooltip from 'react-tooltip';

type ExMBoxItemTypes = MBoxItemTypes & {
  collectionInfo: any;
  companyLogo: string;
  companyName: string;
  price: number;
  quote: string;
  index: number;
};

type LinkTypes = {
  type: string;
  url: string;
  useExternalUrl: boolean;
};

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const CollectionSaleDetail = () => {
  const dropsAccount = useSelector((state: any) => state.account.account);
  const params = useParams();
  const navigate = useNavigate();
  const { account, library, chainId } = useActiveWeb3React();
  const { copyToClipBoard, copyResult, setCopyResult } = useCopyToClipBoard();

  const [isLoading, setIsLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [isZoomImage, setIsZoomImage] = React.useState(false);
  const [openPaymentWallets, setOpenPaymentWallets] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [openPaymentWalletsSuccess, setOpenPaymentWalletsSuccess] =
    useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [collectionItemInfo, setCollectionItemInfo] =
    useState<ExMBoxItemTypes | null>(null);
  const [featuredInfo, setFeaturedInfo] = useState<FeaturedTypes | null>(null);
  const [countDownFinish, setCountDownFinish] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [freedropAble, setFreedropAble] = useState(false);
  const wallet = useSelector((state: any) => state.wallet);
  const closeWarning = () => {
    setWarningOpen(false);
  };
  const refDropdown = useRef() as MutableRefObject<HTMLDivElement>;
  // useOnClickOutsideDropdown(refDropdown, () => setDropdownOpen(false));
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

  const handleClosePaymentWallet = async () => {
    setOpenPaymentWalletsSuccess(false);
    fetchRemaining();
  };

  const fetchRemaining = async () => {
    // const remaining = await getItemAmount(
    //   collectionItemInfo?.collectionInfo.boxContractAddress,
    //   collectionItemInfo?.index ? collectionItemInfo?.index : 0,
    //   2, // 1 = MysteryBox, 2 = Collection
    //   account,
    //   library
    // );
    const remaining = await getItemAmountNoSigner(
      collectionItemInfo?.collectionInfo.boxContractAddress,
      collectionItemInfo?.index ? collectionItemInfo?.index : 0,
      2, // 1 = MysteryBox, 2 = Collection
      account,
      chainId
    );
    setRemainingAmount(remaining);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };
  const closeSignup = () => {
    setSignupOpen(false);
  };

  const handleBuyClick = async () => {
    setIsLoading(true);
    const isKaikas = checkKaikasWallet(
      wallet,
      getTargetNetworkName(collectionItemInfo?.collectionInfo?.chainId) ?? ''
    );
    const contract = collectionItemInfo?.collectionInfo?.boxContractAddress;
    const quote = collectionItemInfo?.collectionInfo?.quote;
    const index = collectionItemInfo?.index ?? 0;
    const amount = 1;

    let quoteToken: string;
    let payment: BigNumber;
    if (quote === 'klay' || quote === 'wklay') {
      quoteToken =
        quote === 'klay' ? contracts.klay[chainId] : contracts.wklay[chainId];
      payment = parseEther(collectionItemInfo?.price.toString() ?? '0').mul(
        amount
      );
    } else if (quote === 'usdt' || quote === 'usdc') {
      quoteToken =
        quote === 'usdt' ? contracts.usdt[chainId] : contracts.usdc[chainId];
      payment = parseUnits(collectionItemInfo?.price.toString() ?? '0', 6).mul(
        amount
      );
    }
    const result = await buyItem(
      contract,
      index,
      1,
      payment!.toString(),
      quoteToken!,
      account,
      library,
      isKaikas
    );

    if (result.status === SUCCESS) {
      const data = {
        mysterybox_id: collectionItemInfo?.collectionInfo?.id,
        buyer: '',
        buyer_address: account,
        isSent: true,
        txHash: result?.txHash,
        price: collectionItemInfo?.price,
        itemId: collectionItemInfo?.id,
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
    setIsLoading(false);
  };

  const getRemaining = async (
    boxContractAddress: string,
    isAirdrop: boolean
  ) => {
    const remaining = await getItemAmountNoSigner(
      boxContractAddress,
      0,
      isAirdrop ? 3 : 2, // 1 = MysteryBox, 2 = Collection, 3 = AirDrop
      account,
      // library
      chainId
    );
    setRemainingAmount(remaining);
  };
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
                <img
                  src={website_icon}
                  alt="Website Icon"
                  data-for="tooltip-website"
                  data-tip
                />
              )}
              {link.type === 'DISCORD' && (
                <img
                  src={icon_discord}
                  alt="Website Icon"
                  data-for="tooltip-discord"
                  data-tip
                />
              )}
              {link.type === 'TWITTER' && (
                <img
                  src={icon_twitter}
                  alt="Website Icon"
                  data-for="tooltip-twitter"
                  data-tip
                />
              )}
              {link.type === 'INSTAGRAM' && (
                <img
                  src={icon_instagram}
                  alt="Website Icon"
                  data-for="tooltip-instagram"
                  data-tip
                />
              )}
            </div>
            <ReactTooltip
              id="tooltip-website"
              getContent={(dataTip) => 'Website'}
              type={'light'}
              offset={{ top: 25 }}
            />
            <ReactTooltip
              id="tooltip-discord"
              getContent={(dataTip) => 'Discord'}
              type={'light'}
              offset={{ top: 25 }}
            />
            <ReactTooltip
              id="tooltip-twitter"
              getContent={(dataTip) => 'Twitter'}
              type={'light'}
              offset={{ top: 25 }}
            />
            <ReactTooltip
              id="tooltip-instagram"
              getContent={(dataTip) => 'Instagram'}
              type={'light'}
              offset={{ top: 25 }}
            />
          </div>
        );
      });
      return test;
    } else {
      return null;
    }
  };
  const getSnsButtonsPopup = () => {
    if (featuredInfo && featuredInfo.links) {
      const test = featuredInfo.links.map((link: LinkTypes) => {
        return (
          <li
            className="list-dropdown-item"
            onClick={() => window.open(link.url)}
          >
            <button
              className="dropdown-item-nft  button"
              style={{ cursor: 'pointer' }}
            >
              {link.type === 'SITE' && (
                <div className="custom-link-sns">
                  <div className="image-sns">
                    <img src={website_icon} alt="website icon" />
                  </div>
                  Website
                </div>
              )}
              {link.type === 'DISCORD' && (
                <div className="custom-link-sns">
                  <div className="image-sns">
                    <img src={icon_discord} alt="website icon" />
                  </div>
                  Discord
                </div>
              )}
              {link.type === 'TWITTER' && (
                <div className="custom-link-sns">
                  <div className="image-sns">
                    <img src={icon_twitter} alt="website icon" />
                  </div>
                  Twitter
                </div>
              )}
              {link.type === 'INSTAGRAM' && (
                <div className="custom-link-sns">
                  <div className="image-sns">
                    <img src={icon_instagram} alt="website icon" />
                  </div>
                  Instagram
                </div>
              )}
            </button>
          </li>
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
              moveToScope(
                collectionItemInfo?.collectionInfo.chainId,
                collectionItemInfo?.collectionInfo?.boxContractAddress,
                true
              )
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

  const getItemUrl = (infoId: number, itemId: number, item: MBoxTypes) => {
    let url = '/';
    if (item.isCollection === false) {
      if (item.isAirdrop === false) {
        url = `/mbox/${item.id}`;
      } else {
        url = `/airdrop/${item.id}`;
      }
    } else {
      url = `/collection/${infoId}/${item.id}`;
    }
    return url;
  };

  const moveToFeatured = () => {
    navigate(`/creator/${collectionItemInfo?.collectionInfo.featuredId}`);
  };

  const fetchCollectionItemInfo = async () => {
    const res = await getCollectionInfo(params.collectionId!);
    if (res.data.status === SUCCESS) {
      const collectionInfo = res.data.data;
      const collectionItem = collectionInfo.mysteryboxItems.find(
        (item: any) => item.id.toString() === params.id
      );
      const milliseconds =
        new Date().getTime() - Date.parse(collectionInfo.releaseDatetime);
      collectionInfo.onsale = milliseconds >= 0 ? true : false;
      const data = {
        collectionInfo: collectionInfo,
        ...collectionItem,
        companyLogo: collectionInfo.featured.company.image,
        companyName: collectionInfo.featured.company.name.en,
        quote: collectionInfo.quote,
      };
      if (collectionInfo.remainingAmount === undefined) {
        getRemaining(
          collectionInfo.boxContractAddress,
          collectionInfo.isAirdrop
        );
      } else {
        setRemainingAmount(collectionInfo.remainingAmount);
      }
      const featuredInfoRes = await getFeaturedById(res.data.data.featuredId);
      if (featuredInfoRes.data !== '') {
        setFeaturedInfo(featuredInfoRes.data);
      }
      setCollectionItemInfo(data);
    }
  };

  const checkFreedropAble = async () => {
    if (account) {
      const freedropAbleRes = await getFreeDroppedCount(
        collectionItemInfo?.collectionInfo?.id,
        account
      );
      if (freedropAbleRes.data != '') {
        if (freedropAbleRes.data?.data === 0) {
          setFreedropAble(true);
        }
      }
    }
  };

  useEffect(() => {
    setOpenSnackbar({
      open: copyResult,
      type: 'success',
      message: 'Copied!',
    });
  }, [copyResult]);

  useEffect(() => {
    fetchCollectionItemInfo();
  }, [params]);

  useEffect(() => {
    checkFreedropAble();
  }, [account, collectionItemInfo]);

  return (
    <main className="collection-container min-height-content">
      <div>
        <div className="price-collection-view-page">
          <div className="price-collection-box">
            <div className="token-details-box-mobile">
              <div className="wrapper-head-token">
                <div className="box-owner-product" onClick={moveToFeatured}>
                  <button className="btn-avatar-owner-product">
                    <img
                      src={collectionItemInfo?.companyLogo}
                      alt={collectionItemInfo?.companyName}
                    />
                  </button>
                  <div className="name-owner-product">
                    <div className="creator-title">Creator</div>
                    <button className="btn-name-owner-product">
                      {collectionItemInfo?.companyName}
                    </button>
                  </div>
                </div>
                <div className="collection-info-right">
                  <div className="collection-info-left-details">
                    <div className="info-item hide-max-1024px">
                      <div
                        className="image-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          moveToScope(
                            collectionItemInfo?.collectionInfo.chainId,
                            collectionItemInfo?.collectionInfo
                              ?.boxContractAddress,
                            true
                          )
                        }
                        data-for="tooltip-explorer"
                        data-tip
                      >
                        <img src={klaytn_white} alt="website icon" />
                      </div>
                    </div>
                    {getSnsButtons()}
                    <div className="dropdown hide-min-1025px" ref={refDropdown}>
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
                        <img src={icon_share} alt="Twitter Icon" width="20px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="token-showcase-box">
              {collectionItemInfo &&
              collectionItemInfo?.originalImage!.indexOf('.mp4') > -1 ? (
                <div>
                  <video controls muted autoPlay playsInline loop>
                    <source
                      src={collectionItemInfo?.originalImage}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ) : (
                <>
                  <img src={collectionItemInfo?.originalImage} alt="" />
                  {/* modal zoom image */}
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
                      src={collectionItemInfo?.originalImage}
                      alt=""
                    />
                  </ReactModal>
                </>
              )}
            </div>
            <div className="straight-line"></div>
            <div className="token-details-box">
              <div className="wrapper-head-token">
                <div className="box-owner-product" onClick={moveToFeatured}>
                  <button className="btn-avatar-owner-product">
                    <img
                      src={collectionItemInfo?.companyLogo}
                      alt={collectionItemInfo?.companyName}
                    />
                  </button>
                  <div className="name-owner-product">
                    <div className="creator-title">Creator</div>
                    <button className="btn-name-owner-product">
                      {collectionItemInfo?.companyName}
                    </button>
                  </div>
                </div>
                <div className="collection-info-right">
                  <div className="collection-info-left-details">
                    <div className="info-item hide-max-1024px">
                      <div
                        className="image-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          moveToScope(
                            collectionItemInfo?.collectionInfo.chainId,
                            collectionItemInfo?.collectionInfo
                              ?.boxContractAddress,
                            true
                          )
                        }
                        data-for="tooltip-explorer"
                        data-tip
                      >
                        <img src={klaytn_white} alt="website icon" />
                      </div>
                      <ReactTooltip
                        id="tooltip-explorer"
                        getContent={(dataTip) => 'Explorer'}
                        type={'light'}
                        offset={{ top: 25 }}
                      />
                    </div>
                    {getSnsButtons()}
                    <div className="dropdown hide-min-1025px" ref={refDropdown}>
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
                      data-for="tooltip-copy"
                      data-tip
                    >
                      <div className="image-item">
                        <img src={icon_share} alt="Twitter Icon" width="20px" />
                      </div>
                      <ReactTooltip
                        id="tooltip-copy"
                        getContent={(dataTip) => 'Copy'}
                        type={'light'}
                        offset={{ top: 25 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-line" />
              <div>
                {freedropAble && (
                  <div className="btn-buy-now">
                    {collectionItemInfo?.collectionInfo.onsale
                      ? collectionItemInfo?.price === 0
                        ? 'Get Now'
                        : 'Buy Now'
                      : 'Waiting'}
                  </div>
                )}
              </div>
              <div>
                <div className="box-name-collection">
                  <div className="name-collection fw-600">
                    {collectionItemInfo?.name}
                  </div>
                </div>
              </div>
              <div>
                <div className="content-collection">
                  {collectionItemInfo?.description}
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
                      {collectionItemInfo?.issueAmount}
                    </div>
                  </div>
                  <div className="box-price-detail-collection">
                    <div className="lable-top">Availability</div>
                    <div className="lable-bottom fw-600">
                      {collectionItemInfo?.collectionInfo.isSoldOut
                        ? '0'
                        : remainingAmount}
                    </div>
                  </div>
                  <div className="box-price-detail-collection">
                    <div className="lable-top">Chain</div>
                    <div
                      className="lable-bottom fw-600"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {getNetworkNameById(
                        collectionItemInfo?.collectionInfo.chainId
                      )?.toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
              {collectionItemInfo?.collectionInfo.isCollection === false &&
                collectionItemInfo?.collectionInfo.isAirdrop === true && (
                  <>
                    <div className="airdrop-condition">
                      {collectionItemInfo?.collectionInfo.whitelists.length >
                      0 ? (
                        collectionItemInfo?.collectionInfo.useAndCondition ? (
                          <span>
                            Please purchase all of the NFTs below first.
                          </span>
                        ) : (
                          <span>
                            Please purchase at least one of the NFTs below
                            first.{' '}
                          </span>
                        )
                      ) : null}
                    </div>
                    {collectionItemInfo?.collectionInfo.whitelists && (
                      <>
                        <div className="grid-list-nft">
                          {collectionItemInfo?.collectionInfo.whitelists &&
                            collectionItemInfo?.collectionInfo.whitelists
                              .filter((item: MBoxTypes, index: number) =>
                                seeMore ? item : index < 3
                              )
                              .map((item: MBoxTypes) => (
                                <div className="grid-item-nft" key={item.id}>
                                  <div className="image-nft">
                                    <img
                                      src={item.packageImage}
                                      alt={item.title.en}
                                    />
                                  </div>
                                  <div className="title-nft">
                                    {item.title.en}
                                  </div>
                                </div>
                              ))}
                        </div>
                        {collectionItemInfo?.collectionInfo.whitelists.length >
                          3 && (
                          <button
                            className="see-more button"
                            onClick={() => setSeeMore((cur) => !cur)}
                          >
                            <div className="title-see-more">See more</div>
                            <div className="icon-see-more">
                              <img src={icon_seemore} alt="icon see more" />
                            </div>
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              <div></div>
              <div>
                <div className="box-purchase-price">
                  <div className="lable-top">Purchase price</div>
                  <div className="lable-bottom fw-600">
                    {collectionItemInfo?.price === 0
                      ? 'FREE'
                      : `${collectionItemInfo?.price} ${collectionItemInfo?.quote}`}
                  </div>
                </div>
                {!countDownFinish && (
                  <CountDownTimer
                    handeCheckCountDownFinish={handeCheckCountDownFinish}
                    targetDate={
                      new Date(
                        collectionItemInfo?.collectionInfo?.releaseDatetime
                      )
                    }
                  />
                )}

                {account &&
                library?.connection &&
                dropsAccount.address !== '' ? (
                  <>
                    {countDownFinish && freedropAble && (
                      <button
                        className={'btn-sale-collection'}
                        disabled={
                          isLoading ||
                          remainingAmount === 0 ||
                          collectionItemInfo?.collectionInfo.isSoldOut
                        }
                        onClick={() => setOpenPaymentWallets(true)}
                        // onClick={handleBuyClick}
                      >
                        {isLoading ? (
                          <CircularProgress size={30} color={'inherit'} />
                        ) : remainingAmount === 0 ||
                          collectionItemInfo?.collectionInfo.isSoldOut ? (
                          'Sold out'
                        ) : collectionItemInfo?.price === 0 ? (
                          'Get Now'
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
              </div>
            </div>
          </div>
        </div>
        <PaymentWallets
          itemInfo={collectionItemInfo!}
          isCollection={true}
          show={openPaymentWallets}
          onHide={() => setOpenPaymentWallets(false)}
          openPaymentWalletsSuccess={() => setOpenPaymentWalletsSuccess(true)}
        />
        <PaymentWalletsSuccess
          itemInfo={collectionItemInfo!}
          isCollection={true}
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
    </main>
  );
};

export default CollectionSaleDetail;
