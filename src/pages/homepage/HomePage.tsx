import React, { useEffect, useState, useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import background from '../../assets/img/home_01.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScreenSize from 'components/common/useScreenSize';
import {
  getAirdropList,
  getCollectibleList,
  getCollectionList,
  getEventList,
  getFeaturedCollections,
} from '../../services/services';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import FeaturedCard from '../../components/card/FeaturedCard';
import ArrowCarouselCollections from 'components/common/ArrowCarouselCollections';
import CustomArrowCarousel from 'components/common/CustomArrowCarousel';
import { MBoxTypes } from '../../types/MBoxTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getPrice } from '../../utils/getPrice';
import ArrowCarouselBannerMain from 'components/common/ArrowCarouselBannerMain';
import { getRarityToString } from '../../utils/getRarityToString';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import Skeleton from 'components/common/skeleton/Skeleton';
import { useMediaQuery } from 'react-responsive';

type ExMBoxType = MBoxTypes & {
  remainingAmount: number | null;
};

const Homepage = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });
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
      window.open(`/creator/${item.id}`, item.newWindow ? '_blank' : '_self');
    }
  };

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const params = useQuery();
  const uid = params.get('uid');

  const storeTalkenData = (uid: string) => {
    const storeSet = { uid: uid };
    const _storeSet = JSON.stringify(storeSet);
    localStorage.setItem('talken.data', _storeSet);
  };

  useEffect(() => {
    if (uid) {
      storeTalkenData(uid);
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
            // const remainFrChain = await getItemRemainsNoSigner(
            //   item.boxContractAddress,
            //   account,
            //   chainId
            // );
            const remaining = item.totalAmount! - item.soldAmount!;
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              remainingAmount: remaining,
              onsale: milliseconds >= 0 ? true : false,
            };
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
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              itemId: id,
              onsale: milliseconds >= 0 ? true : false,
            };
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
            const remaining = item.totalAmount! - item.soldAmount!;
            const milliseconds =
              new Date().getTime() - Date.parse(item.releaseDatetime);
            return {
              ...item,
              remainingAmount: remaining,
              onsale: milliseconds >= 0 ? true : false,
            };
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

  return (
    <div className="home-page min-height-content">
      {/* section 01 */}
      <div className="section-01">
        <div className="background-section-01">
          <img src={background} alt="" />
        </div>
        {/* <img src={background} alt="" /> */}
        <div className="content-header">
          <div className="text-head">Talken Drops</div>
          <div className="text-bottom">
            Check out NFTs and Collectibles from popular teams,&nbsp;
            <br className="text-head-pc" />
            famous brands&nbsp;
            <br className="text-head-mobile" />
            and world renown artists
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
              containerClass="container-with-dots home-carousel banner-main-carousel"
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
              {slideData.length
                ? slideData.map((item: FeaturedTypes, index) => {
                    return (
                      <div
                        className="slide-item"
                        key={index}
                        onClick={() => navigateToUrl(item)}
                      >
                        <div>
                          <img
                            src={
                              isMobile && item.eventMobileBanner
                                ? item.eventMobileBanner
                                : item.eventBanner!
                            }
                            alt=""
                            draggable={false}
                          />
                        </div>
                      </div>
                    );
                  })
                : [1, 2, 3].map((item) => (
                    <div className="slide-item" key={item}>
                      <div>
                        <Skeleton
                          style={{
                            width: '100%',
                            aspectRatio: '24/7',
                            height: 'unset',
                          }}
                        />
                      </div>
                    </div>
                  ))}
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
            <Link to={'/creators'} className="show-all-item button">
              See all
            </Link>
          </div>

          <Carousel
            {...carouselOption}
            customButtonGroup={<ArrowCarouselCollections />}
            keyBoardControl
            removeArrowOnDeviceType=""
            containerClass="grid-container-featured"
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1367,
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
                  max: 1367,
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
            {featuredCollections?.length
              ? featuredCollections.map((item: FeaturedTypes, index) => (
                  <FeaturedCard key={item.id} item={item} />
                ))
              : [1, 2, 3, 4, 5].map((item) => (
                  <div className="custom-link" key={item}>
                    <Skeleton key={item} />
                  </div>
                ))}
          </Carousel>
        </div>

        <div className="page-grid">
          <div className="title-header">Talken Drops</div>
          {!!collectionList?.length && (
            <Carousel
              {...carouselOption}
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="hot-collectibles"
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1367,
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
                    max: 1367,
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
                        ? `/collection/${item.id}/${item.mysteryboxItems[0]?.id}`
                        : `/collections/${item.id}`
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
                          {item.packageImage.split('.').pop() === 'mp4' ? (
                            <video
                              playsInline
                              autoPlay
                              controls
                              muted
                              loop
                              controlsList="nodownload"
                              width={'100%'}
                            >
                              <source
                                src={item.packageImage}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <img
                              src={item.packageImage}
                              alt=""
                              draggable={false}
                            />
                          )}
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
                            <div className="mb-0 mt-0">
                              {item.featured.company.name.en}
                            </div>
                          </div>
                          <div className="content-right">
                            {item.onsale ? 'Buy Now' : 'Waiting'}
                          </div>
                        </div>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div className="product-name">{item.title.en}</div>
                      </div>
                      {/* <div className="hot-ollectibles-item">
                        <div className="name-label">{item.details}</div>
                      </div> */}
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
                            {!item.isSoldOut && item.remainingAmount
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
          {!!collectibleList?.length && (
            <Carousel
              {...carouselOption}
              arrows={false}
              renderButtonGroupOutside
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="hot-collectibles"
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1367,
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
                    max: 1367,
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
                  console.log('123', item);
                  return (
                    <Link
                      to={`/${getNetworkNameById(item.chainId).toLowerCase()}/${
                        item.boxContractAddress
                      }/${item.mysteryboxItems[0]?.no}/${item.itemId}`}
                      // to={`/klaytn/${item.boxContractAddress}/${item.mysteryboxItems[0]?.no}/${item.itemId}`}
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
                            {item?.mysteryboxItems[0]?.itemImage
                              .split('.')
                              .pop() === 'mp4' ? (
                              <video
                                playsInline
                                autoPlay
                                // controls
                                muted
                                loop
                                controlsList="nodownload"
                                width={'100%'}
                              >
                                <source
                                  src={item?.mysteryboxItems[0]?.itemImage}
                                  type="video/mp4"
                                />
                              </video>
                            ) : item?.mysteryboxItems[0]?.itemImage
                                .split('.')
                                .pop() === 'gif' ? (
                              <img
                                src={item.mysteryboxItems[0]?.itemImage}
                                alt=""
                                draggable={false}
                              />
                            ) : (
                              <img
                                src={item.mysteryboxItems[0]?.itemImage}
                                alt=""
                                draggable={false}
                              />
                            )}
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
                            <div className="content-right">
                              {item.onsale ? 'Buy Now' : 'Waiting'}
                            </div>
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="product-name">
                            {item.mysteryboxItems[0]?.name}
                          </div>
                        </div>
                        {/* <div className="hot-ollectibles-item">
                          <div className="name-label">{item.details}</div>
                        </div> */}
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
          {!!airdropList?.length && (
            <Carousel
              {...carouselOption}
              arrows={false}
              renderButtonGroupOutside
              customButtonGroup={<CustomArrowCarousel />}
              keyBoardControl
              removeArrowOnDeviceType=""
              containerClass="hot-collectibles"
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1367,
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
                    max: 1367,
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
                      to={`/airdrop/${item.id}/${item.mysteryboxItems[0].id}`}
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
                            {item.packageImage.split('.').pop() === 'mp4' ? (
                              <video
                                playsInline
                                autoPlay
                                controls
                                muted
                                loop
                                controlsList="nodownload"
                                width={'100%'}
                              >
                                <source
                                  src={item.packageImage}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <img
                                src={item.packageImage}
                                alt=""
                                draggable={false}
                              />
                            )}
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
                            <div className="content-right">
                              {item.onsale ? 'Get Now' : 'Waiting'}
                            </div>
                          </div>
                        </div>
                        <div className="hot-ollectibles-item">
                          <div className="product-name">{item.title.en}</div>
                        </div>
                        {/* <div className="hot-ollectibles-item">
                          <div className="name-label">{item.details}</div>
                        </div> */}
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
                              {!item.isSoldOut && item.remainingAmount
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
