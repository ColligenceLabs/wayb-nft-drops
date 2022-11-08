import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import testImg from '../../assets/img/collectibles_test.png';
import testAvatarImg from '../../assets/img/avatar.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import arrow_btn_back from '../../assets/img/arrow_btn_back.png';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import ic_authenticity from '../../assets/icon/info_blue.svg';
import icon_properties from '../../assets/svg/icon_properties.svg';
import icon_details from '../../assets/svg/icon_details.svg';
import klaytn_white from '../../assets/icon/klaytn_white.png';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_share from '../../assets/img/icon_share.png';
import { getNetworkNameByChainId } from '../../utils/getNetworkNameByChainId';
import useOnClickOutside from 'components/common/useOnClickOutside';
import { getMysteryBoxInfo } from '../../services/services';
import { SUCCESS } from '../../config';
import { MBoxTypes } from '../../types/MBoxTypes';
import { useWeb3React } from '@web3-react/core';
import { Accordion } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { hotCollectiblesTestData } from '../homepage/mockData';
import ArrowCarouselItemDetails from 'components/common/ArrowCarouselItemDetails';
type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};
const CollectionSale = () => {
  const params = useParams();

  const navigate = useNavigate();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useOnClickOutside(ref, () => setDropdownOpen(false));

  const { account, library, chainId } = useWeb3React();
  const [mBoxInfo, setMBoxInfo] = useState<ExMBoxType | null>(null);

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  console.log('===>', params);

  useEffect(() => {
    const fetchMboxItemList = async () => {
      const mboxInfoRes = await getMysteryBoxInfo(params.contractAddress!);
      if (mboxInfoRes.data.status === SUCCESS) {
        setMBoxInfo(mboxInfoRes.data.data);
      }
    };

    fetchMboxItemList();
  }, [params, library]);

  console.log('=====>', mBoxInfo);
  return (
    <main className="collectibles-item-details-container min-height-content">
      <div className="collectibles-details-wp">
        {/*<Link to={'/my-collectibles'}>*/}
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={arrow_btn_back} alt="arrow back" /> Back
        </button>
        {/*</Link>*/}
        <div className="product-details">
          <div className="wrapper-left">
            <div className="showcase-box">
              <img src={testImg} alt="" className="thumbnail" />
              {/* <canvas className="canvas-card" width="1125" height="1125" style={{ width: '900px', height: '900px' }}></canvas> */}
            </div>
            {/* dropdown change color */}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="content-left">
                    <div className="image-properties">
                      <img src={icon_properties} alt="Properties" />
                    </div>
                    <div className="title-properties">Properties</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accordion-properties">
                  <div className="padding-content">
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                    <div className="item-properties">
                      <div className="content-01">Accessory</div>
                      <div className="content-02">Attributes</div>
                      <div className="content-03">35% have this trait</div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="content-left">
                    <div className="image-details">
                      <img src={icon_details} alt="Details" />
                    </div>
                    <div className="title-details">Details</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accordion-details">
                  <div className="padding-content">
                    <div className="item-details">
                      <div className="name">Contract Address</div>
                      <div className="info-name">0x12...ab12</div>
                    </div>
                    <div className="item-details">
                      <div className="name">Token ID</div>
                      <div className="info-name">{params.id}</div>
                    </div>
                    <div className="item-details">
                      <div className="name">Token Standard</div>
                      <div className="info-name">ERC-721</div>
                    </div>
                    <div className="item-details">
                      <div className="name">Chain</div>
                      <div className="info-name">Klaytn</div>
                    </div>
                    <div className="item-details">
                      <div className="name">Last Updated</div>
                      <div className="info-name">07/11/2022</div>
                    </div>
                    <div className="item-details">
                      <div className="name">Creator Earnings</div>
                      <div className="info-name">5%</div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="details-box">
            <div className="banner-dropdown" ref={ref}>
              <div className="logo">
                <img src={testAvatarImg} alt="Sweet" className="logo-img" />
                <div className="logo-info">
                  <div className="creator">Creator</div>
                  <div className="name">{'helloljho'}</div>
                </div>
              </div>

              <div className="list-sns">
                <a href="/" className="custom-sns hide-max-1024px">
                  <div className="image-sns">
                    <img src={klaytn_white} alt="website icon" />
                  </div>
                </a>
                <div className="custom-sns hide-max-1024px">
                  <div className="image-sns">
                    <img src={website_icon} alt="website icon" />
                  </div>
                </div>
                <div className="custom-sns hide-max-1024px">
                  <div className="image-sns">
                    <img src={icon_discord} alt="website icon" />
                  </div>
                </div>
                <div className="custom-sns hide-max-1024px">
                  <div className="image-sns">
                    <img src={icon_twitter} alt="website icon" />
                  </div>
                </div>
                <div className="custom-sns hide-max-1024px">
                  <div className="image-sns">
                    <img src={icon_instagram} alt="website icon" />
                  </div>
                </div>
                <div className="custom-sns">
                  <div className="image-sns">
                    <img src={icon_share} alt="website icon" />
                  </div>
                </div>
                <div className="custom-sns">
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
                        <li className="list-dropdown-item on-hide">
                          <button className="dropdown-item-nft  button">
                            <a href="/" className="custom-link-sns">
                              <div className="image-sns">
                                <img src={klaytn_white} alt="website icon" />
                              </div>
                              Etherscan Link
                            </a>
                          </button>
                        </li>
                        <li className="list-dropdown-item on-hide">
                          <button className="dropdown-item-nft  button">
                            <a href="/" className="custom-link-sns">
                              <div className="image-sns">
                                <img src={website_icon} alt="website icon" />
                              </div>
                              Website
                            </a>
                          </button>
                        </li>
                        <li className="list-dropdown-item on-hide">
                          <button className="dropdown-item-nft  button">
                            <a href="/" className="custom-link-sns">
                              <div className="image-sns">
                                <img src={icon_discord} alt="website icon" />
                              </div>
                              Discord
                            </a>
                          </button>
                        </li>
                        <li className="list-dropdown-item on-hide">
                          <button className="dropdown-item-nft  button">
                            <a href="/" className="custom-link-sns">
                              <div className="image-sns">
                                <img src={icon_twitter} alt="website icon" />
                              </div>
                              Twitter
                            </a>
                          </button>
                        </li>
                        <li className="list-dropdown-item on-hide">
                          <button className="dropdown-item-nft  button">
                            <a href="/" className="custom-link-sns">
                              <div className="image-sns">
                                <img src={icon_instagram} alt="website icon" />
                              </div>
                              Instagram
                            </a>
                          </button>
                        </li>
                        <li className="list-dropdown-item ds-flex">
                          <button
                            className="dropdown-item-nft  button"
                            onClick={() => {
                              setWarningOpen(true);
                              setDropdownOpen(false);
                            }}
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
                        <li className="list-dropdown-item ds-flex">
                          <button
                            className="dropdown-item-nft button"
                            onClick={() => {
                              setDropdownOpen(false);
                            }}
                          >
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
              </div>
            </div>
            <div className="line-banner"></div>
            <div className="name-product">{'Item Name'}</div>
            <div className="sub-product">{'Item Description'}</div>
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
                <div className="label">Token ID</div>
                <div className="value">{params.id}</div>
              </div>
              <div className="item">
                <div className="label">Release Date</div>
                <div className="value">{toStringByFormatting(new Date())}</div>
              </div>
              <div className="item">
                <div className="label">Date Acquired</div>
                <div className="value">{toStringByFormatting(new Date())}</div>
              </div>
              <div className="item">
                <div className="label">Total Items</div>
                <div className="value">{'10'}</div>
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
                <div className="value">{getNetworkNameByChainId(1001)}</div>
              </div>
            </div>
            {/* <div className="list-trade"></div> */}
            <div className="wrapper-user-details">
              <div className="title-details">이 아이템이 속한 컬렉션</div>
              <div className="wrapper-content-details">
                <div className="wrapper-user">
                  <div className="avt-user">
                    <img src={testAvatarImg} alt="icon avatar" />
                  </div>
                  <div className="user-name">Unnamed</div>
                </div>
                <div className="details-info">
                  Welcome to Relief Herb Club, the second NFT project of 'Repo',
                  a beauty brand that believes that herbs save the world.
                </div>
              </div>
            </div>
            <div className="wrapper-other-items">
              <div className="wrapper-head">
                <div className="title-items">Other Items</div>
                <div className="seemore-otheritems">See more</div>
              </div>
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlay
                autoPlaySpeed={5000}
                dotListClass="dot-other-items"
                centerMode={false}
                className="carousel-other-items"
                customButtonGroup={<ArrowCarouselItemDetails />}
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={true}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 5,
                    partialVisibilityGutter: 40,
                  },
                  mobileBigLarge: {
                    breakpoint: {
                      max: 600,
                      min: 460,
                    },
                    items: 4,
                    partialVisibilityGutter: 30,
                  },
                  mobileLarge: {
                    breakpoint: {
                      max: 461,
                      min: 376,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                  },
                  mobileMedium: {
                    breakpoint: {
                      max: 375,
                      min: 0,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 601,
                    },
                    items: 5,
                    partialVisibilityGutter: 30,
                  },
                  laptop: {
                    breakpoint: {
                      max: 1100,
                      min: 850,
                    },
                    items: 4,
                    partialVisibilityGutter: 30,
                  },
                  tabletLarge: {
                    breakpoint: {
                      max: 849,
                      min: 769,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={true}
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {hotCollectiblesTestData.map((item, index) => {
                  return (
                    <Link to="/" className="item-other button" key={index}>
                      <div className="item-image">
                        <img src={item.image} alt="Image Item" />
                      </div>
                      <div className="id-card">#{item.quantityRemaining}</div>
                      <div className="price-item">{item.currentPrice}pKLAY</div>
                    </Link>
                  );
                })}
              </Carousel>
            </div>
            {/*{mboxInfo?.useRevealLockup && !countDownFinish ? (*/}
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
          </div>
        </div>
        <div className="price-history">
          {/*<div className="price-history-label">*/}
          {/*  <img src={price_history_lg} alt="price-history" />*/}
          {/*  Price History*/}
          {/*</div>*/}
          {/*<div className="list-price-history"></div>*/}
        </div>
        {/*<div className="my-revealed-items">My revealed items</div>*/}
        {/*<div className="marketplace-items">*/}
        {/*  {mboxInfo &&*/}
        {/*    revealItems.map((item, index) => {*/}
        {/*      return (*/}
        {/*        <Link to={`/klaytn/nft/${index}`} key={index}>*/}
        {/*          <div className="item_product" key={index}>*/}
        {/*            <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">*/}
        {/*              /!*<div className="total_item">Total Run: 50</div>*!/*/}
        {/*              <div className="total_item">Index: {item.no}</div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">*/}
        {/*              <div>erc721</div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">*/}
        {/*              <div className="card-image">*/}
        {/*                {item.extension === 'mp4' ? (*/}
        {/*                  <video*/}
        {/*                    autoPlay*/}
        {/*                    controls*/}
        {/*                    controlsList="nodownload"*/}
        {/*                    muted*/}
        {/*                    loop*/}
        {/*                    width={'100%'}*/}
        {/*                  >*/}
        {/*                    <source src={item.image} type="video/mp4" />*/}
        {/*                  </video>*/}
        {/*                ) : (*/}
        {/*                  <img src={item.image} alt="" />*/}
        {/*                )}*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">*/}
        {/*              <div className="owner_product">*/}
        {/*                <div className="owner_product_box">*/}
        {/*                  <div className="owner_product_avatar">*/}
        {/*                    <img src={mboxInfo?.packageImage} alt="" />*/}
        {/*                  </div>*/}
        {/*                  <div className="">{mboxInfo?.title.en}</div>*/}
        {/*                </div>*/}
        {/* <div> */}
        {/* <Link to="/sale"> */}
        {/* <div className="status ">Buy Now</div> */}
        {/* </Link> */}
        {/* </div> */}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_NAME_KEY">*/}
        {/*              <div className="product_name ">{item.name}</div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_BID_KEY">*/}
        {/*              <div className="box-price">*/}
        {/*                <div className="price ">Price</div>*/}
        {/*                <div className="currency ">{`${*/}
        {/*                  mboxInfo.isCollection ? item?.price : mboxInfo.price*/}
        {/*                } ${mboxInfo?.quote}`}</div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*            <div className="item_product_detail MARKETPLACE_NAME_TIME">*/}
        {/*              <div>*/}
        {/*                <div className="remaining ">Rarity</div>*/}
        {/*                <div className="remaining-total ">*/}
        {/*                  {getRarityToString(item.rarity)}*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </Link>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*</div>*/}
      </div>
    </main>
  );
};

export default CollectionSale;
