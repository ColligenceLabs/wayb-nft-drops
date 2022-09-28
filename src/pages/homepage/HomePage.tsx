import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import useScreenSize from 'components/common/useScreenSize';
import {
  slideTestData,
  featuredCollectionsTestData,
  hotCollectiblesTestData,
} from './mockData';
import { getSlideData } from '../../services/services';
import { MBoxTypes } from '../../types/MBoxTypes';

const Homepage = () => {
  const screenSize = useScreenSize();
  const [mboxData, setMBox] = useState<MBoxTypes[] | null>(null);

  useEffect(() => {
    const fetchSlideData = async () => {
      const res = await getSlideData();

      if (res.data.status === 1) {
        setMBox(res.data.data.list);
      }
    };

    fetchSlideData();
  }, []);

  useEffect(() => {
    console.log(mboxData);
  }, [mboxData]);

  const carouselOption = {
    additionalTransfrom: 0,
    arrows: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
    draggable: true,
    focusOnSelect: false,
    keyBoardControl: true,
    minimumTouchDrag: 80,
    pauseOnHover: true,
    renderArrowsWhenDisabled: false,
    renderButtonGroupOutside: false,
    renderDotsOutside: false,
    rewind: false,
    rewindWithAnimation: false,
    rtl: false,
    shouldResetAutoplay: true,
    showDots: true,
    slidesToSlide: 1,
    swipeable: true,
  };

  return (
    <div className="home-page">
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
        <Carousel
          {...carouselOption}
          centerMode={screenSize > 1023}
          containerClass="container-with-dots home-carousel"
          infinite
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
          {slideTestData.map((item, index) => (
            <div className="slide-item" key={index}>
              <Link to={item.url} target={'_blank'}>
                <div>
                  <img
                    src={screenSize > 520 ? item.imagePC : item.imageMb}
                    alt=""
                    draggable={false}
                  />
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      {/* section 02 */}
      <div className="section-02">
        {/* Featured Collections */}
        <div className="featured-collections">
          <div className="wrapper-header title-header">
            <div className="header-name">Featured Collections</div>
            <Link to={'/collections'} className="show-all-item button">
              See all
            </Link>
          </div>

          <div className="grid-container">
            {featuredCollectionsTestData.map((item, index) => (
              <Link to={item.url} className="custom-link" key={index}>
                <button className="grid-item button">
                  <div className="banner-image">
                    <img src={item.imageBanner} alt="" />
                  </div>
                  <div className="wrapper-content">
                    <div className="avatar">
                      <img
                        src={item.imageAvatar}
                        data-qa-component="campaign-avatar-image"
                        alt={item.nameLabel}
                      />
                    </div>
                    <div className="name-label">{item.nameLabel}</div>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
        {/* Hot Collectibles */}
        <div className="page-grid">
          <div className="title-header">Hot Collectibles</div>
          {mboxData && (
            <Carousel
              {...carouselOption}
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
              {mboxData.map((item: MBoxTypes, index) => (
                <Link
                  to={`/sale/${item.id}`}
                  className="button custom-box"
                  key={index}
                >
                  <div className="hot-ollectibles-wrapper">
                    <div className="header-left hot-ollectibles-item">
                      <span className="total-run">Total Run: 35000</span>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div>erc721</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="img-token">
                        <img src={item.packageImage} alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-item">
                        <div className="content-left">
                          <div className="avatar">
                            <img src={''} alt="" draggable={false} />
                          </div>
                          <div className="name-label">연동필요</div>
                        </div>
                        <div className="content-right">Buy Now</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="name-label">{item.introduction.en}</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-price">
                        <div className="price-header">Price</div>
                        <div className="current-price">${item.price}</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-remaining">
                        <div className="remaining-header">Remaining </div>
                        <div className="quantity-remaining">{0}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          )}
        </div>
        {/* Free Drops */}
        <div className="page-grid">
          <div className="title-header">Free Drops</div>
          <Carousel
            {...carouselOption}
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
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
