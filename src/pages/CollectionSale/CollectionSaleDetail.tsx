import React, { useEffect, useRef, useState } from 'react';
import ic_info from '../../assets/icon/info_blue.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import icon_seemore from '../../assets/icon/icon_seemore.png';
import icon_close_seemore from '../../assets/icon/icon_close_seemore.png';
import { CircularProgress } from '@mui/material';
import PaymentWallets from '../../components/modal/PaymentWallets';
import PaymentWalletsSuccess from '../../components/modal/PaymentWalletsSuccess';
import Popup from 'reactjs-popup';
import WalletConnector from '../../components/auth/WalletConnector/WalletConnector';
import CSnackbar from '../../components/common/CSnackbar';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import CountDownTimer from '../../components/TimeCounter/CountDownTimer';
import {
  buyItem,
  getItemAmount,
  getItemAmountNoSigner,
} from '../../utils/transactions';
import contracts from '../../config/constants/contracts';
import { ChainId, SUCCESS } from '../../config';
import { getKeyRemains } from '../../utils/marketTransactions';
import { getCollectionInfo, registerBuy } from '../../services/services';
import { parseEther } from 'ethers/lib/utils';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { MBoxTypes } from '../../types/MBoxTypes';
import { hotCollectiblesTestData } from 'pages/homepage/mockData';

type ExMBoxItemTypes = MBoxItemTypes & {
  collectionInfo: any;
  companyLogo: string;
  companyName: string;
  price: number;
  quote: string;
  index: number;
};

const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
const closeOnDocumentClick = false;
const lockScroll = true;

const CollectionSaleDetail = () => {
  const dropsAccount = useSelector((state: any) => state.account.account);
  const params = useParams();
  const navigate = useNavigate();
  const { account, library, chainId } = useActiveWeb3React();
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
  const [countDownFinish, setCountDownFinish] = useState(false);
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
    const contract = collectionItemInfo?.collectionInfo?.boxContractAddress;
    const quote = collectionItemInfo?.collectionInfo?.quote;
    const index = collectionItemInfo?.index ?? 0;
    const amount = 1;
    const payment = parseEther(collectionItemInfo?.price.toString() ?? '0').mul(
      amount
    );

    const result = await buyItem(
      contract,
      index,
      1,
      payment.toString(),
      quote === 'klay' ? contracts.klay[chainId] : contracts.wklay[chainId],
      account,
      library
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

  // useEffect(() => {
  //   console.log(location.state.item);
  //   setCollectionItemInfo(location.state.item);
  //   if (location.state.item.remainingAmount === undefined) {
  //     getRemaining();
  //   } else {
  //     setRemainingAmount(location.state.item.remainingAmount);
  //   }
  // }, [location.state]);

  const getItemUrl = (infoId: number, itemId: number, item: MBoxTypes) => {
    let url = '/';
    if (item.isCollection === false) {
      if (item.isAirdrop === false) {
        url = `/klaytn/mbox/${item.id}`;
      } else {
        url = `/klaytn/airdrop/${item.id}`;
      }
    } else {
      url = `/klaytn/collection/${infoId}/${item.id}`;
    }
    return url;
  };

  const moveToFeatured = () => {
    navigate(
      `/klaytn/featured/${collectionItemInfo?.collectionInfo.featuredId}`
    );
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
      setCollectionItemInfo(data);
    }
  };

  useEffect(() => {
    fetchCollectionItemInfo();
  }, [params]);

  return (
    <main className="collection-container min-height-content">
      <div>
        <div className="price-collection-view-page">
          <div className="price-collection-box">
            <div className="token-showcase-box">
              {/*<img*/}
              {/*  style={{ objectFit: 'cover' }}*/}
              {/*  src={collectionItemInfo?.originalImage}*/}
              {/*  alt=""*/}
              {/*/>*/}
              {collectionItemInfo &&
              collectionItemInfo?.originalImage!.indexOf('.mp4') > -1 ? (
                <div>
                  <video muted autoPlay playsInline loop>
                    <source
                      src={collectionItemInfo?.originalImage}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ) : (
                <>
                  <img src={collectionItemInfo?.itemImage} alt="" />
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
                    {/* <div style={{ width: '100%', height: '100%' }}>
                      <div>Close</div>
                      <div>

                      </div>
                    </div> */}
                  </ReactModal>
                </>
              )}
            </div>
            <div className="straight-line"></div>
            <div className="token-details-box">
              <div onClick={moveToFeatured}>
                <div className="box-owner-product">
                  <button className="btn-avatar-owner-product">
                    <img
                      src={collectionItemInfo?.companyLogo}
                      alt={collectionItemInfo?.companyName}
                    />
                  </button>
                  <div className="name-owner-product">
                    <button className="btn-name-owner-product">
                      {collectionItemInfo?.companyName}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="btn-buy-now">
                  {collectionItemInfo?.collectionInfo.onsale
                    ? collectionItemInfo?.price === 0
                      ? 'Get Now'
                      : 'Buy Now'
                    : 'Waiting'}
                </div>
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
                    <div className="lable-bottom fw-600">{remainingAmount}</div>
                  </div>
                  <div className="box-price-detail-collection">
                    <div className="lable-top">Network</div>
                    <div className="lable-bottom fw-600">
                      {getNetworkNameById(
                        collectionItemInfo?.collectionInfo.chainId
                      )}
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
                      {/* <ul>
                      {collectionItemInfo?.collectionInfo.whitelists &&
                        collectionItemInfo?.collectionInfo.whitelists.map(
                          (item: MBoxTypes) => (
                            // <Link
                            //   to={getItemUrl(
                            //     collectionItemInfo.infoId,
                            //     collectionItemInfo.id!,
                            //     item
                            //   )}
                            // >
                            <li key={item.id}>{item.title.en}</li>
                            // </Link>
                          )
                        )}
                    </ul> */}
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
                            {/* <div className="icon-close-seemore">
                              <img
                                src={icon_close_seemore}
                                alt="close see more"
                              />
                            </div> */}
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
                  <div className="lable-bottom fw-600">{`${collectionItemInfo?.price} ${collectionItemInfo?.quote}`}</div>
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
                    {countDownFinish && (
                      <button
                        className={'btn-sale-collection'}
                        disabled={isLoading || remainingAmount === 0}
                        onClick={() => setOpenPaymentWallets(true)}
                        // onClick={handleBuyClick}
                      >
                        {isLoading ? (
                          <CircularProgress size={30} color={'inherit'} />
                        ) : remainingAmount === 0 ? (
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

                {/*{account && library?.connection ? (*/}
                {/*  <>*/}
                {/*    <button*/}
                {/*      className={'btn-sale-collection'}*/}
                {/*      // disabled={isLoading || remains === 0}*/}
                {/*      disabled={isLoading}*/}
                {/*      // onClick={() => setOpenPaymentWallets(true)}*/}
                {/*      onClick={handleBuyClick}*/}
                {/*    >*/}
                {/*      {isLoading ? (*/}
                {/*        <CircularProgress size={30} color={'inherit'} />*/}
                {/*      ) : (*/}
                {/*        'Buy Now'*/}
                {/*      )}*/}
                {/*    </button>*/}
                {/*  </>*/}
                {/*) : (*/}
                {/*  <button*/}
                {/*    className={'btn-sale-collection'}*/}
                {/*    onClick={() => setLoginOpen(true)}*/}
                {/*  >*/}
                {/*    Connect Wallet*/}
                {/*  </button>*/}
                {/*)}*/}
                {/* <button className="btn-sale-collection disable">Sold out</button> */}
              </div>
            </div>
          </div>
          {/*<div>*/}
          {/*  <div>*/}
          {/*    <div className="title-sale-by-Collectors fw-600">*/}
          {/*      Items in the mystery box*/}
          {/*    </div>*/}
          {/*    <div className="sub-title-sale-by-Collectors fw-600">*/}
          {/*      You will get one of the items below.*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="puzzle-container">*/}
          {/*    <div>*/}
          {/*      <ImageList className="puzzle" cols={11}>*/}
          {/*        {mBoxItemList.map((item, index) => (*/}
          {/*          <ImageListItem key={index}>*/}
          {/*            <img*/}
          {/*              src={item.itemImage}*/}
          {/*              srcSet={item.itemImage}*/}
          {/*              alt={''}*/}
          {/*              loading="lazy"*/}
          {/*            />*/}
          {/*            /!*<div style={{ position: 'absolute', color: 'white' }}>*!/*/}
          {/*            /!*  {index}*!/*/}
          {/*            /!*</div>*!/*/}
          {/*          </ImageListItem>*/}
          {/*        ))}*/}
          {/*      </ImageList>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="userSales">*/}
          {/*    <div className="filter-box">*/}
          {/*      <div className="search-box">*/}
          {/*        <img*/}
          {/*          src={ic_search}*/}
          {/*          style={{ margin: '0px 5px 0px 20px' }}*/}
          {/*          alt=""*/}
          {/*        />*/}
          {/*        <input*/}
          {/*          className="marketplace-search-textbox"*/}
          {/*          placeholder="Search NFT"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="type-filter-box">*/}
          {/*        <div className="type-filter-box-left">*/}
          {/*          <div className="type-filter-item active">All</div>*/}
          {/*          <div className="type-filter-item">Buy Now</div>*/}
          {/*          <div className="type-filter-item">Auction</div>*/}
          {/*        </div>*/}
          {/*        <div className="type-filter-box-right">*/}
          {/*          <div className="dropdown-sort-type-collection"></div>*/}
          {/*          <div className=""></div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="marketplace-items">*/}
          {/*      {mBoxItemList.map((item, index) => (*/}
          {/*        <MBoxItemCard*/}
          {/*          key={index}*/}
          {/*          item={item}*/}
          {/*          mBoxName={mBoxInfo?.title.en}*/}
          {/*          mBoxImage={mBoxInfo?.packageImage}*/}
          {/*          quote={mBoxInfo?.quote}*/}
          {/*          price={mBoxInfo?.price}*/}
          {/*        />*/}
          {/*      ))}*/}
          {/*      <div className="list-carousel">*/}
          {/*        {list_products.map((item, index) => (*/}
          {/*          <div className="slide-item" key={index}>*/}
          {/*            <Link to={'/sale'} className="button">*/}
          {/*              <div className="hot-ollectibles-wrapper">*/}
          {/*                <div className="header-left hot-ollectibles-item">*/}
          {/*                  <span className="total-run fw-600">*/}
          {/*                    Total Run: 35000*/}
          {/*                  </span>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div>erc721</div>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div className="img-token">*/}
          {/*                    <img src={home_11} alt="" />*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div className="wrapper-item">*/}
          {/*                    <div className="content-left">*/}
          {/*                      <div className="avatar">*/}
          {/*                        <img src={home_13_avt} alt="" />*/}
          {/*                      </div>*/}
          {/*                      <div className="name-label">Elton John</div>*/}
          {/*                    </div>*/}
          {/*                    <div className="content-right">Buy Now</div>*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div className="name-label">*/}
          {/*                    Elton John Rocket NFT Club Pass*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div className="wrapper-price">*/}
          {/*                    <div className="price-header font-size-14">*/}
          {/*                      Price*/}
          {/*                    </div>*/}
          {/*                    <div className="current-price font-size-18">*/}
          {/*                      $29.99*/}
          {/*                    </div>*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*                <div className="hot-ollectibles-item">*/}
          {/*                  <div className="wrapper-remaining">*/}
          {/*                    <div className="remaining-header font-size-14">*/}
          {/*                      Remaining{' '}*/}
          {/*                    </div>*/}
          {/*                    <div className="quantity-remaining font-size-18">*/}
          {/*                      26008*/}
          {/*                    </div>*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            </Link>*/}
          {/*          </div>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*      /!* not found item *!/*/}
          {/*      /!*<div className="not-found">*!/*/}
          {/*      /!*  <div className="image-not-found">*!/*/}
          {/*      /!*    <img src={not_found} alt="" />*!/*/}
          {/*      /!*  </div>*!/*/}
          {/*      /!*  <div className="token-not-found">No tokens found...</div>*!/*/}
          {/*      /!*</div>*!/*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
