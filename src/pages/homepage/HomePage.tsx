import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import useScreenSize from 'components/common/useScreenSize';
import { hotCollectiblesTestData } from './mockData';
import {
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
    fetchSlideData();
    fetchFeaturedCollections();
    fetchCollectionList();
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
    renderDotsOutside: false,
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
      {/* section 01 */}
      <div className="section-01">
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
        <div className="carousel-main-page">
          <Carousel
            {...carouselOption}
            customButtonGroup={<ArrowCarouselBannerMain />}
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
              slideData.map((item: FeaturedTypes, index) => (
                <div className="slide-item" key={index}>
                  <Link to={'/'} target={'_blank'}>
                    <div>
                      <img
                        // src={screenSize > 520 ? item.image : item.imageMb}
                        src={item.banner}
                        alt=""
                        draggable={false}
                      />
                    </div>
                  </Link>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
      {/* section 02 */}
      <div className="section-02">
        {/* Featured Collections */}
        <div className="featured-collections">
          <div className="wrapper-header title-header">
            <div className="header-name">Featured Collections</div>
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
        {/* Hot Collectibles */}
        <div className="page-grid">
          <div className="title-header">Hot Collectibles</div>
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
                          Total Run: {item.totalAmount}
                        </span>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div>erc721</div>
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
                            <div className="name-label">{item.title.en}</div>
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
          <div className="title-header">Free Drops</div>
          {collectionList && (
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
              {collectionList
                .filter((item) => item.price === null || item.price === 0)
                .map((item: any, index) => (
                  <Link
                    to={`/collection-sale/${item.id}`}
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
                          Total Run: {item.totalAmount}
                        </span>
                      </div>
                      <div className="hot-ollectibles-item">
                        <div>erc721</div>
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
                            <div className="name-label">{item.title.en}</div>
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
                          <div className="current-price">
                            {`${item.quote?.toUpperCase()} ${item.price}`}
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
                ))}
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
