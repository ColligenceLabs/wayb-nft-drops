import React, { useEffect, useState, useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import background from '../../assets/img/home_01.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScreenSize from 'components/common/useScreenSize';
import { hotCollectiblesTestData } from './mockData';
import {
  getAirdropList,
  getCollectibleList,
  getCollectionList,
  getEventList,
  getFeaturedCollections,
  getFeaturedList,
} from '../../services/services';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import FeaturedCard from '../../components/card/FeaturedCard';
import ArrowCarouselCollections from 'components/common/ArrowCarouselCollections';
import CustomArrowCarousel from 'components/common/CustomArrowCarousel';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getItemRemains, getItemRemainsNoSigner } from 'utils/transactions';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getPrice } from '../../utils/getPrice';
import ArrowCarouselBannerMain from 'components/common/ArrowCarouselBannerMain';
import { getRarityToString } from '../../utils/getRarityToString';
import { getNetworkNameByChainId } from 'utils/getNetworkNameByChainId';
import { getNetworkNameById } from '../../utils/getNetworkNameById';

type ExMBoxType = MBoxTypes & {
  remainingAmount: number | null;
};

const Homepage = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [slideData, setSlideData] = useState<FeaturedTypes[]>([]);
  const [featuredCollections, setFeaturedCollections] = useState<
    FeaturedTypes[]
  >([]);
  const [collectionList, setCollectionList] = useState<ExMBoxType[]>([]);
  const [collectibleList, setCollectibleList] = useState<ExMBoxType[]>([]);
  const [airdropList, setAirdropList] = useState<ExMBoxType[]>([]);
  const navigateToUrl = (item: FeaturedTypes) => {
    if (item.eventUrl) {
      window.open(item.eventUrl, item.newWindow ? '_blank' : '_self');
    } else {
      window.open(
        `/klaytn/featured/${item.id}`,
        item.newWindow ? '_blank' : '_self'
      );
    }
  };

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const params = useQuery();
  const uid = params.get('uid');
  const ethAddress = params.get('ethAddress');

  const storeTalkenData = (uid: string, ethAddress: string) => {
    const storeSet = { uid: uid, ethAddress: ethAddress.toLowerCase() };
    const _storeSet = JSON.stringify(storeSet);
    localStorage.setItem('talken.data', _storeSet);
  };

  useEffect(() => {
    if (uid && ethAddress) {
      storeTalkenData(uid, ethAddress);
    }
    navigate('/');
  }, []);

  useEffect(() => {
    const fetchSlideData = async () => {
      const res = await getEventList();
      if (res.data.status === 1) {
        setSlideData(res.data.data.list);
      }
    };

    const fetchFeaturedCollections = async () => {
      const res = await getFeaturedCollections(10);
      if (res.data.status === 1) {
        setFeaturedCollections(res.data.data.list);
      }
    };

    const fetchCollectionList = async () => {
      const res = await getCollectionList(true);
      if (res.data.data.list) {
        const newList = await Promise.all(
          res.data.data.list.map(async (item: MBoxTypes) => {
            const remaining = await getItemRemainsNoSigner(
              item.boxContractAddress,
              account,
              chainId
            );
            return { ...item, remainingAmount: remaining };
          })
        );
        setCollectionList(newList);
      }
    };

    const fetchCollectibleList = async () => {
      const res = await getCollectibleList();
      if (res.data.data) {
        const newList = await Promise.all(
          res.data.data.map(async (item: any) => {
            const id = Math.floor(
              Math.random() * item.mysteryboxItems[0].issueAmount
            );
            return { ...item, itemId: id };
          })
        );
        setCollectibleList(newList);
      }
    };

    const fetchAirdropList = async () => {
      const res = await getAirdropList();
      if (res.data.data.list) {
        const newList = await Promise.all(
          res.data.data.list.map(async (item: MBoxTypes) => {
            const remaining = await getItemRemainsNoSigner(
              item.boxContractAddress,
              account,
              chainId
            );
            return { ...item, remainingAmount: remaining };
          })
        );
        setAirdropList(newList);
      }
    };

    fetchSlideData();
    fetchFeaturedCollections();
    fetchCollectibleList();
    fetchCollectionList();
    fetchAirdropList();
  }, [library]);

  const carouselOption = {
    additionalTransfrom: 0,
    arrows: false,
    autoPlay: true,
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
    slidesToSlide: 1,
    swipeable: true,
    infinite: true,
  };

  return (
    <div className="home-page min-height-content">
      {/* <div className="section001">
        <img src={background} alt="" />
        <div className="content-header">
          <div className="text-head">
            OFFICIALLY <br />
            LICENSED
          </div>
          <div className="text-bottom">
            NFTs and Collectibles from the world&apos;s
            <br />
            leading teams, brands, and artists
          </div>
        </div>
      </div> */}
      {/* section 01 */}
      <div className="section-01">
        <div className="background-section-01">
          <img src={background} alt="" />
        </div>
        {/* <img src={background} alt="" /> */}
        <div className="content-header">
          <div className="text-head">
            OFFICIALLY <br />
            LICENSED
          </div>
          <div className="text-bottom">
            NFTs and Collectibles from the world&apos;s
            <br />
            leading teams, brands, and artists
          </div>
        </div>
        <div>
          <div className="carousel-main-page">
            <Carousel
              {...carouselOption}
              customButtonGroup={<ArrowCarouselBannerMain />}
              renderButtonGroupOutside={false}
              centerMode={screenSize > 1023}
              dotListClass="custom-dot"
              containerClass="container-with-dots home-carousel"
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 40,
                },
              }}
            >
              {slideData !== null &&
                slideData.map((item: FeaturedTypes, index) => {
                  return (
                    <div
                      className="slide-item"
                      key={index}
                      onClick={() => navigateToUrl(item)}
                    >
                      <div>
                        <img src={item.eventBanner!} alt="" draggable={false} />
                      </div>
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </div>
        {/* <div className="wrapper-section01">

        </div> */}
      </div>
      {/* section 02 */}
      <div className="section-02">
        {/* Featured Collections */}
        <div className="featured-collections">
          <div className="wrapper-header title-header">
            <div className="header-name">Featured Creators</div>
            <Link to={'/klaytn/featureds'} className="show-all-item button">
              See all
            </Link>
          </div>

          {featuredCollections && (
            <Carousel
              {...carouselOption}
              customButtonGroup={<ArrowCarouselCollections />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="container grid-container"
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
                  items: 1,
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
              showDots={false}
            >
              {featuredCollections.map((item: FeaturedTypes, index) => (
                <FeaturedCard key={item.id} item={item} />
              ))}
            </Carousel>
          )}
        </div>

        <div className="page-grid">
          <div className="title-header">Talken Drops</div>
          {collectionList && (
            <Carousel
              {...carouselOption}
              // arrows={false}
              // renderButtonGroupOutside
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="container hot-collectibles"
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
                  items: 1,
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
              showDots={false}
            >
              {collectionList.map((item: any, index) => {
                return (
                  <Link
                    to={
                      item.itemAmount === 1 && item.mysteryboxItems
                        ? `/klaytn/collection/${item.id}/${item.mysteryboxItems[0]?.id}`
                        : `/klaytn/collections/${item.id}`
                    }
                    // state={
                    //   item.itemAmount === 1
                    //     ? {
                    //         item: {
                    //           collectionInfo: item,
                    //           ...item.mysteryboxItems[0],
                    //           companyLogo: item.featured.company.image,
                    //           companyName: item.featured.company.name.en,
                    //           quote: item.quote,
                    //         },
                    //       }
                    //     : {
                    //         item: {
                    //           ...item,
                    //           companyLogo: item.featured.company.image,
                    //           companyName: item.featured.companyId,
                    //           quote: item.quote,
                    //         },
                    //       }
                    // }
                    className="button custom-box"
                    key={index}
                  >
                    <div className="hot-ollectibles-wrapper">
                      <div className="header-left hot-ollectibles-item">
                        <span className="total-run">
                          Total Items: {item.totalAmount}
                        </span>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div>{getNetworkNameById(item.chainId)}</div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="img-token">
                          <img
                            src={item.packageImage}
                            alt=""
                            draggable={false}
                          />
                        </div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="wrapper-item">
                          <div className="content-left">
                            <div className="avatar">
                              <img
                                src={item.featured.company.image}
                                alt=""
                                draggable={false}
                              />
                            </div>
                            <p className="">{item.featured.company.name.en}</p>
                          </div>
                          <div className="content-right">Buy Now</div>
                        </div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="product-name">{item.title.en}</div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="name-label">{item.details}</div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="wrapper-price">
                          <div className="price-header">Price</div>
                          <div className="current-price">
                            {getPrice(item.price, item.quote)}
                          </div>
                        </div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="wrapper-remaining">
                          <div className="remaining-header">Remaining</div>
                          <div className="quantity-remaining">
                            {item.remainingAmount ? item.remainingAmount : '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Carousel>
          )}
          {/*{hotCollectiblesTestData && (*/}
          {/*  <Carousel*/}
          {/*    {...carouselOption}*/}
          {/*    arrows={false}*/}
          {/*    renderButtonGroupOutside*/}
          {/*    customButtonGroup={<CustomArrowCarousel />}*/}
          {/*    keyBoardControl*/}
          {/*    removeArrowOnDeviceType=""*/}
          {/*    containerClass="container hot-collectibles"*/}
          {/*    responsive={{*/}
          {/*      desktop: {*/}
          {/*        breakpoint: {*/}
          {/*          max: 3000,*/}
          {/*          min: 1420,*/}
          {/*        },*/}
          {/*        items: 5,*/}
          {/*        partialVisibilityGutter: 40,*/}
          {/*      },*/}
          {/*      mobile: {*/}
          {/*        breakpoint: {*/}
          {/*          max: 640,*/}
          {/*          min: 0,*/}
          {/*        },*/}
          {/*        items: 1,*/}
          {/*        partialVisibilityGutter: 30,*/}
          {/*      },*/}
          {/*      tablet: {*/}
          {/*        breakpoint: {*/}
          {/*          max: 1024,*/}
          {/*          min: 640,*/}
          {/*        },*/}
          {/*        items: 2,*/}
          {/*        partialVisibilityGutter: 30,*/}
          {/*      },*/}
          {/*      laptopLarge: {*/}
          {/*        breakpoint: {*/}
          {/*          max: 1420,*/}
          {/*          min: 1180,*/}
          {/*        },*/}
          {/*        items: 4,*/}
          {/*        partialVisibilityGutter: 30,*/}
          {/*      },*/}
          {/*      laptop: {*/}
          {/*        breakpoint: {*/}
          {/*          max: 1180,*/}
          {/*          min: 1024,*/}
          {/*        },*/}
          {/*        items: 3,*/}
          {/*        partialVisibilityGutter: 30,*/}
          {/*      },*/}
          {/*    }}*/}
          {/*    showDots={false}*/}
          {/*  >*/}
          {/*    {hotCollectiblesTestData.map((item: any, index) => (*/}
          {/*      <Link*/}
          {/*        to={`/sale/${item.id}`}*/}
          {/*        className="button custom-box"*/}
          {/*        key={index}*/}
          {/*      >*/}
          {/*        <div className="hot-ollectibles-wrapper">*/}
          {/*          <div className="header-left hot-ollectibles-item">*/}
          {/*            <span className="total-run">Total Run: 35000</span>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div>erc721</div>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div className="img-token">*/}
          {/*              <img src={item.image} alt="" draggable={false} />*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div className="wrapper-item">*/}
          {/*              <div className="content-left">*/}
          {/*                <div className="avatar">*/}
          {/*                  <img src={item.imageAvt} alt="" draggable={false} />*/}
          {/*                </div>*/}
          {/*                <div className="name-label">연동필요</div>*/}
          {/*              </div>*/}
          {/*              <div className="content-right">Buy Now</div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div className="name-label">{item.details}</div>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div className="wrapper-price">*/}
          {/*              <div className="price-header">Price</div>*/}
          {/*              <div className="current-price">*/}
          {/*                ${item.currentPrice}*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <div className="hot-ollectibles-item">*/}
          {/*            <div className="wrapper-remaining">*/}
          {/*              <div className="remaining-header">Remaining </div>*/}
          {/*              <div className="quantity-remaining">*/}
          {/*                {item.quantityRemaining}*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </Link>*/}
          {/*    ))}*/}
          {/*  </Carousel>*/}
          {/*)}*/}
        </div>
        {/* Free Drops */}
        <div className="page-grid">
          <div className="title-header">Hot Collectibles</div>
          {collectibleList && (
            <Carousel
              {...carouselOption}
              arrows={false}
              renderButtonGroupOutside
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="container hot-collectibles"
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
                  items: 1,
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
              showDots={false}
            >
              {collectibleList
                // .filter((item) => item.price === null || item.price === 0)
                .map((item: any, index) => {
                  console.log(item);
                  return (
                    <Link
                      to={`/klaytn/${item.boxContractAddress}/${item.mysteryboxItems[0]?.no}/${item.itemId}`}
                      state={{
                        item: {
                          ...item,
                          companyLogo: item.featured.company.image,
                          companyName: item.featured.companyId,
                          quote: item.quote,
                        },
                      }}
                      className="button custom-box"
                      key={index}
                    >
                      <div className="hot-ollectibles-wrapper">
                        <div className="header-left hot-ollectibles-item">
                          <span className="total-run">
                            {`#${item.itemId}/${item.mysteryboxItems[0]?.issueAmount}`}
                          </span>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div>{getNetworkNameById(item.chainId)}</div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="img-token">
                            <img
                              src={item.mysteryboxItems[0]?.itemImage}
                              alt=""
                              draggable={false}
                            />
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="wrapper-item">
                            <div className="content-left">
                              <div className="avatar">
                                <img
                                  src={item.packageImage}
                                  alt=""
                                  draggable={false}
                                />
                              </div>
                              <div className="name-label">
                                {item.featured.company.name.en}
                              </div>
                            </div>
                            <div className="content-right">Buy Now</div>
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="product-name">
                            {item.mysteryboxItems[0]?.name}
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="name-label">{item.details}</div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="wrapper-price">
                            <div className="price-header">Price</div>
                            <div className="current-price">
                              {getPrice(item.price, item.quote)}
                            </div>
                          </div>
                        </div>

                        <div className="hot-ollectibles-item">
                          <div className="wrapper-remaining">
                            <div className="remaining-header">Rarity</div>
                            <div className="quantity-remaining">
                              {getRarityToString(
                                item.mysteryboxItems[0].rarity
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </Carousel>
          )}
        </div>
        {/* Free Drops */}
        <div className="page-grid">
          <div className="title-header">Free Drops</div>
          {airdropList && (
            <Carousel
              {...carouselOption}
              arrows={false}
              renderButtonGroupOutside
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="container hot-collectibles"
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
                  items: 1,
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
              showDots={false}
            >
              {airdropList
                // .filter((item) => item.price === null || item.price === 0)
                .map((item: any, index) => {
                  return (
                    <Link
                      to={`/klaytn/airdrop/${item.id}/${item.mysteryboxItems[0].id}`}
                      state={{
                        item: {
                          ...item,
                          companyLogo: item.featured.company.image,
                          companyName: item.featured.companyId,
                          quote: item.quote,
                        },
                      }}
                      className="button custom-box"
                      key={index}
                    >
                      <div className="hot-ollectibles-wrapper">
                        <div className="header-left hot-ollectibles-item">
                          <span className="total-run">
                            Total Items: {item.totalAmount}
                          </span>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div>{getNetworkNameById(item.chainId)}</div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="img-token">
                            <img
                              src={item.packageImage}
                              alt=""
                              draggable={false}
                            />
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="wrapper-item">
                            <div className="content-left">
                              <div className="avatar">
                                <img
                                  src={item.featured.company.image}
                                  alt=""
                                  draggable={false}
                                />
                              </div>
                              <div className="name-label">
                                {item.featured.company.name.en}
                              </div>
                            </div>
                            <div className="content-right">Get Now</div>
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="product-name">{item.title.en}</div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="name-label">{item.details}</div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="wrapper-price">
                            <div className="price-header">Price</div>
                            <div className="current-price">
                              {getPrice(item.price, item.quote)}
                            </div>
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="wrapper-remaining">
                            <div className="remaining-header">Remaining</div>
                            <div className="quantity-remaining">
                              {item.remainingAmount
                                ? item.remainingAmount
                                : '-'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </Carousel>
          )}
          {/* <Carousel
            {...carouselOption}
            keyBoardControl
            arrows={false}
            renderButtonGroupOutside
            customButtonGroup={<CustomArrowCarousel />}
            removeArrowOnDeviceType=""
            containerClass="container hot-collectibles"
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
                items: 1,
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
            showDots={false}
          >
            {hotCollectiblesTestData.map((item, index) => (
              <Link to={item.url} className="button custom-box" key={index}>
                <div className="hot-ollectibles-wrapper">
                  <div className="header-left hot-ollectibles-item">
                    <span className="total-run">Total Run: 35000</span>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div>erc721</div>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div className="img-token">
                      <img src={item.image} alt="" draggable={false} />
                    </div>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div className="wrapper-item">
                      <div className="content-left">
                        <div className="avatar">
                          <img src={item.imageAvt} alt="" draggable={false} />
                        </div>
                        <div className="name-label">{item.nameLabel}</div>
                      </div>
                      <div className="content-right">Buy Now</div>
                    </div>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div className="name-label">{item.details}</div>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div className="wrapper-price">
                      <div className="price-header">Price</div>
                      <div className="current-price">${item.currentPrice}</div>
                    </div>
                  </div>
                  <div className="hot-ollectibles-item">
                    <div className="wrapper-remaining">
                      <div className="remaining-header">Remaining </div>
                      <div className="quantity-remaining">
                        {item.quantityRemaining}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
