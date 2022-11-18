import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import see_collection from '../../assets/icon/see_collection.png';
import icon_properties from '../../assets/svg/icon_properties.svg';
import icon_details from '../../assets/svg/icon_details.svg';
import klaytn_white from '../../assets/icon/klaytn_white.png';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_share from '../../assets/img/icon_share.png';
import ic_dropdown from '../../assets/svg/dropdown_button_dots.svg';
import { getNetworkNameByChainId } from '../../utils/getNetworkNameByChainId';
import useOnClickOutside from 'components/common/useOnClickOutside';
import {
  getFeaturedById,
  getMysteryBoxInfo,
  getRandomItemListByCompanyId,
} from '../../services/services';
import { SUCCESS } from '../../config';
import { MBoxTypes } from '../../types/MBoxTypes';
import { useWeb3React } from '@web3-react/core';
import { Accordion } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import ArrowCarouselItemDetails from 'components/common/ArrowCarouselItemDetails';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import splitAddress from '../../utils/splitAddress';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { getPrice } from '../../utils/getPrice';
import useCopyToClipBoard from '../../hooks/useCopyToClipboard';
import CSnackbar from '../../components/common/CSnackbar';
import { moveToScope } from '../../utils/moveToScope';
import useOnClickOutsideDropdown from 'components/common/useOnClickOutside';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import ReactTooltip from 'react-tooltip';
import env from '../../env';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

type LinkTypes = {
  type: string;
  url: string;
  useExternalUrl: boolean;
};

type ExMBoxItemTypes = MBoxItemTypes & {
  boxContractAddress: string;
};

const carouselOption = {
  additionalTransfrom: 0,
  arrows: false,
  autoPlay: false,
  autoPlaySpeed: 5000,
  draggable: true,
  focusOnSelect: false,
  keyBoardControl: true,
  minimumTouchDrag: 80,
  pauseOnHover: true,
  renderArrowsWhenDisabled: false,
  renderButtonGroupOutside: true,
  renderDotsOutside: true,
  rewind: false,
  rewindWithAnimation: false,
  rtl: false,
  shouldResetAutoplay: true,
  showDots: true,
  // slidesToSlide: 1,
  swipeable: true,
  infinite: true,
};

const CollectionSale = () => {
  const params = useParams();

  const navigate = useNavigate();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const { copyToClipBoard, copyResult, setCopyResult } = useCopyToClipBoard();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // useOnClickOutside(ref, () => setDropdownOpen(false));
  const videoRef = useRef<HTMLVideoElement>(null);

  const { library } = useWeb3React();
  const [mBoxInfo, setMBoxInfo] = useState<ExMBoxType | null>(null);
  const [randomItems, setRandomItems] = useState<ExMBoxItemTypes[] | null>(
    null
  );
  const [itemInfo, setItemInfo] = useState<MBoxItemTypes | null>(null);
  const [featuredInfo, setFeaturedInfo] = useState<FeaturedTypes | null>(null);
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
    setCopyResult(false);
  };

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  const handleClickSeeMore = () => {
    if (mBoxInfo) {
      if (mBoxInfo?.isCollection) {
        if (mBoxInfo?.mysteryboxItems && mBoxInfo?.mysteryboxItems[0].id) {
          navigate(
            `/collection/${mBoxInfo.id}/${mBoxInfo?.mysteryboxItems[0].id}`
          );
        }
      } else {
        if (mBoxInfo?.isAirdrop) {
          if (mBoxInfo?.mysteryboxItems && mBoxInfo?.mysteryboxItems[0].id) {
            navigate(
              `/airdrop/${mBoxInfo.id}/${mBoxInfo?.mysteryboxItems[0].id}`
            );
          }
        } else {
          navigate(`/mbox/${mBoxInfo.id}`);
        }
      }
    }
  };

  const getSnsButtons = () => {
    if (featuredInfo && featuredInfo.links) {
      const test = featuredInfo.links.map((link: LinkTypes) => {
        return (
          <div
            style={{
              cursor: 'pointer',
            }}
            key={link.type}
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
  useEffect(() => {
    setOpenSnackbar({
      open: copyResult,
      type: 'success',
      message: 'Copied!',
    });
  }, [copyResult]);

  useEffect(() => {
    const fetchMboxItemList = async () => {
      const mboxInfoRes = await getMysteryBoxInfo(params.contractAddress!);
      if (mboxInfoRes.data.status === SUCCESS) {
        const item = mboxInfoRes.data.data.mysteryboxItems.filter(
          (item: MBoxItemTypes) => item.no.toString() === params.itemNo
        );

        const featuredRes = await getFeaturedById(
          mboxInfoRes.data.data.featuredId
        );

        if (featuredRes.data !== '') {
          setFeaturedInfo(featuredRes.data);
        }

        const randomItemsRes = await getRandomItemListByCompanyId(
          mboxInfoRes.data.data.featured.companyId
        );

        setMBoxInfo(mboxInfoRes.data.data);
        setItemInfo({ ...item[0] });
        setRandomItems(randomItemsRes.data.data);
      }
    };

    fetchMboxItemList();
  }, [params, library]);

  useEffect(() => {
    videoRef.current?.load();
  }, [itemInfo]);

  const refDropdown = useRef() as MutableRefObject<HTMLDivElement>;
  // useOnClickOutsideDropdown(refDropdown, () => setDropdownOpen(false));
  return (
    <main className="collectibles-item-details-container min-height-content">
      {mBoxInfo && itemInfo && (
        <div className="collectibles-details-wp">
          {/* <button className="back-button" onClick={() => navigate(-1)}>
            <img src={arrow_btn_back} alt="arrow back" /> Back
          </button> */}
          <div className="product-details">
            <div className="details-box-mobile">
              <div className="banner-dropdown" ref={ref}>
                <div className="logo">
                  <img
                    src={mBoxInfo.featured?.company.image}
                    alt={mBoxInfo.featured?.company.name.en}
                    className="logo-img"
                  />
                  <div className="logo-info">
                    <div className="creator">Creator</div>
                    <div className="name">
                      {mBoxInfo.featured?.company.name.en}
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
              <div className="line-banner"></div>
            </div>
            <div className="wrapper-left">
              <div className="showcase-box">
                {/*<img src={itemInfo.itemImage} alt="" className="thumbnail" />*/}
                {itemInfo.originalImage.split('.').pop() === 'mp4' ? (
                  <video
                    ref={videoRef}
                    muted
                    autoPlay
                    playsInline
                    loop
                    className="thumbnail"
                  >
                    <source src={itemInfo.originalImage} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    className="thumbnail"
                    // style={{ objectFit: 'cover' }}
                    src={itemInfo.originalImage}
                    alt=""
                  />
                )}
                {/* <canvas className="canvas-card" width="1125" height="1125" style={{ width: '900px', height: '900px' }}></canvas> */}
              </div>
              {/* dropdown change color */}
              {/*<Accordion defaultActiveKey={['0']} alwaysOpen>*/}
              <Accordion defaultActiveKey={['1']} alwaysOpen>
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
                      {itemInfo.properties &&
                        itemInfo.properties.map((property) => (
                          <div className="item-properties">
                            <div className="content-01">{property.type}</div>
                            <div className="content-02">{property.name}</div>
                            {/*<div className="content-03">*/}
                            {/*  35% have this trait*/}
                            {/*</div>*/}
                          </div>
                        ))}
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
                        <div
                          className="info-name"
                          onClick={() =>
                            moveToScope(
                              mBoxInfo?.chainId,
                              mBoxInfo?.boxContractAddress,
                              true
                            )
                          }
                        >
                          {splitAddress(mBoxInfo.boxContractAddress)}
                        </div>
                      </div>
                      <div className="item-details">
                        <div className="name">Token ID</div>
                        <div
                          className="info-name"
                          onClick={() =>
                            window.open(
                              `https://www.klaytnfinder.io/nft/${mBoxInfo?.boxContractAddress}/${params.id}`
                            )
                          }
                        >
                          {params.id}
                        </div>
                      </div>
                      <div className="item-details">
                        <div className="name">Token Standard</div>
                        <div className="info-name">ERC-721</div>
                      </div>
                      <div className="item-details">
                        <div className="name">Chain</div>
                        <div
                          className="info-name"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {getNetworkNameById(mBoxInfo.chainId)?.toLowerCase()}
                        </div>
                      </div>
                      {/* <div className="item-details">
                        <div className="name">Last Updated</div>
                        <div className="info-name">
                          {toStringByFormatting(new Date(mBoxInfo.updatedAt!))}
                        </div>
                      </div> */}
                      {/* <div className="item-details">
                        <div className="name">Creator Earnings</div>
                        <div className="info-name">2.5%</div>
                      </div> */}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="details-box">
              <div className="banner-dropdown" ref={ref}>
                <div className="logo">
                  <img
                    src={mBoxInfo.featured?.company.image}
                    alt={mBoxInfo.featured?.company.name.en}
                    className="logo-img"
                  />
                  <div className="logo-info">
                    <div className="creator">Creator</div>
                    <div className="name">
                      {mBoxInfo.featured?.company.name.en}
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
              <div className="line-banner"></div>
              <div className="name-product">{itemInfo.name}</div>
              <div className="sub-product">{itemInfo.description}</div>
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
                  <div className="label">Created Date</div>
                  <div className="value">
                    {toStringByFormatting(new Date(mBoxInfo.createdAt!))}
                  </div>
                </div>
                <div className="item">
                  <div className="label">Release Date</div>
                  <div className="value">
                    {toStringByFormatting(new Date(mBoxInfo.releaseDatetime!))}
                  </div>
                </div>
                <div className="item">
                  <div className="label">Total Items</div>
                  <div className="value">{itemInfo.issueAmount}</div>
                </div>
                <div className="item">
                  <div className="label" data-qa-component="token-type-label">
                    Token Standard
                  </div>
                  <div className="value" data-qa-component="token-type-value">
                    ERC-721
                  </div>
                </div>
                <div className="item">
                  <div className="label">Chain</div>
                  <div
                    className="value"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {getNetworkNameByChainId(
                      env.REACT_APP_TARGET_NETWORK_KLAY ?? 8217
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="list-trade"></div> */}
              <div className="wrapper-detail-box-mobile">
                <Accordion defaultActiveKey={['1']} alwaysOpen>
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
                        {itemInfo.properties &&
                          itemInfo.properties.map((property) => (
                            <div className="item-properties">
                              <div className="content-01">{property.type}</div>
                              <div className="content-02">{property.name}</div>
                              {/*<div className="content-03">*/}
                              {/*  35% have this trait*/}
                              {/*</div>*/}
                            </div>
                          ))}
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
                          <div
                            className="info-name"
                            onClick={() =>
                              moveToScope(
                                mBoxInfo?.chainId,
                                mBoxInfo?.boxContractAddress,
                                true
                              )
                            }
                          >
                            {splitAddress(mBoxInfo.boxContractAddress)}
                          </div>
                        </div>
                        <div className="item-details">
                          <div className="name">Token ID</div>
                          <div
                            className="info-name"
                            onClick={() =>
                              window.open(
                                `https://www.klaytnfinder.io/nft/${mBoxInfo?.boxContractAddress}/${params.id}`
                              )
                            }
                          >
                            {params.id}
                          </div>
                        </div>
                        <div className="item-details">
                          <div className="name">Token Standard</div>
                          <div className="info-name">ERC-721</div>
                        </div>
                        <div className="item-details">
                          <div className="name">Chain</div>
                          <div
                            className="info-name"
                            style={{ textTransform: 'capitalize' }}
                          >
                            {getNetworkNameById(
                              mBoxInfo.chainId
                            )?.toLowerCase()}
                          </div>
                        </div>
                        {/* <div className="item-details">
                        <div className="name">Last Updated</div>
                        <div className="info-name">
                          {toStringByFormatting(new Date(mBoxInfo.updatedAt!))}
                        </div>
                      </div> */}
                        {/* <div className="item-details">
                        <div className="name">Creator Earnings</div>
                        <div className="info-name">2.5%</div>
                      </div> */}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="wrapper-user-details">
                <div className="title-details">
                  Collection this item belongs to
                </div>
                <div className="wrapper-content-details">
                  <div className="wrapper-user">
                    <div className="avt-user">
                      <img src={itemInfo.itemImage} alt="icon avatar" />
                    </div>
                    <div className="user-name">{mBoxInfo.title.en}</div>
                  </div>
                  <div
                    // to={`/collection/${itemInfo.infoId}/${itemInfo.id}`}
                    onClick={handleClickSeeMore}
                  >
                    <div className="wrapper-see-collection">
                      {/* <div className="image-see-collection">
                        <img src={see_collection} alt="Icon See Collection" />
                      </div> */}
                      <div className="title">See this collection</div>
                    </div>
                  </div>
                </div>
                <div className="details-info">{mBoxInfo.introduction.en}</div>
              </div>
              <div className="wrapper-other-items">
                <div className="wrapper-head">
                  <div className="title-items">Other Items</div>
                  <Link
                    className="seemore-otheritems"
                    to={`/creator/${mBoxInfo.featured?.companyId}`}
                  >
                    See more
                  </Link>
                </div>
                <Carousel
                  additionalTransfrom={0}
                  arrows={false}
                  autoPlay={false}
                  autoPlaySpeed={5000}
                  draggable
                  focusOnSelect={false}
                  keyBoardControl
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={true}
                  renderDotsOutside={true}
                  rewind={false}
                  rewindWithAnimation={false}
                  rtl={false}
                  shouldResetAutoplay
                  showDots={false}
                  // slidesToSlide={1}
                  swipeable
                  infinite
                  customButtonGroup={<ArrowCarouselItemDetails />}
                  removeArrowOnDeviceType=""
                  dotListClass="dot-other-items"
                  // centerMode={false}
                  className="carousel-other-items"
                  // itemClass=""
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1420,
                      },
                      items: 5,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 640,
                        min: 0,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 640,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                    laptopLarge: {
                      breakpoint: {
                        max: 1420,
                        min: 1180,
                      },
                      items: 4,
                      partialVisibilityGutter: 30,
                    },
                    laptop: {
                      breakpoint: {
                        max: 1180,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 30,
                    },
                  }}
                >
                  {randomItems &&
                    randomItems.map((item, index) => {
                      return (
                        <Link
                          to={`/klaytn/${item.boxContractAddress}/${item.no}/${item.id}`}
                          className="item-other button"
                          key={index}
                        >
                          <div className="item-image">
                            <img src={item.itemImage} alt="Image Item" />
                          </div>
                          <div className="info-item-detail">
                            <div className="id-card">{item.name}</div>
                            <div className="price-item">
                              {getPrice(
                                Number(mBoxInfo.price),
                                mBoxInfo.quote!
                              )}
                            </div>
                          </div>
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
          {/*                  <div className="">{mboxInfo?.title.en}</d>*/}
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
          <CSnackbar
            open={openSnackbar.open}
            type={openSnackbar.type}
            message={openSnackbar.message}
            handleClose={handleCloseSnackbar}
          />
        </div>
      )}
    </main>
  );
};

export default CollectionSale;
