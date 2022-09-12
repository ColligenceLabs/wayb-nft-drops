import React, { useEffect, useState } from 'react';
import home_02 from '../../assets/img/home_02.jpeg';
import home_03 from '../../assets/img/home_03.jpeg';
import home_04 from '../../assets/img/home_04.jpeg';
import home_05_banner from '../../assets/img/home_05_banner.png';
import home_06_banner from '../../assets/img/home_06_banner.jpg';
import home_07_banner from '../../assets/img/home_07_banner.jpeg';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import home_11 from '../../assets/img/home_11.png';
import home_12 from '../../assets/img/home_12.png';
import home_13_avt from '../../assets/img/home_13_avt.jpg';
import home_14_avt from '../../assets/img/home_14_avt.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import HomePageMb from './HomePageMb'
const Homepage = () => {

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '500px',
    slidesToShow: 1,
    speed: 500,
  };
  return (
      isMobile ? <HomePageMb />
      :
      <div className="home-page">
      {/* section 01 */}
      <div className="section-01">
        <div className="content-header">
          <div className="text-head">
            OFFICIALLY <br />
            LICENSED
          </div>
          <div className="text-bottom">
            NFTs and Collectibles from the world's
            <br />
            leading teams, brands, and artists
          </div>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={1000}
          centerMode={false}
          className=""
          containerClass="container-with-dots home-carousel"
          dotListClass="custom-dots"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <div className="slide-item">
            <div>
              <img src={home_02} alt="" draggable={false} />
            </div>
          </div>
          <div className="slide-item">
            <div>
              <img src={home_03} alt="" draggable={false} />
            </div>
          </div>
          <div className="slide-item">
            <Link to={'/collection'}>
              <div>
                <img src={home_04} alt="" draggable={false} />
              </div>
            </Link>
          </div>
        </Carousel>
      </div>
      {/* section 02 */}
      <div className="section-02">
        <div className="grid-container">
          {/* Featured Collections */}
          <div className="wrapper-header title-header">
            <div className="header-name">Featured Collections</div>
            <Link to={"/collections"} className="show-all-item button">
              See all
            </Link>
          </div>
          <Link to={'/collection'} className="custom-link">
            <button className="grid-item button">
              <div className="banner-image">
                <img src={home_05_banner} alt="" />
              </div>
              <div className="wrapper-content">
                <div className="avatar">
                  <img
                    src={home_08_avt}
                    data-qa-component="campaign-avatar-image"
                    alt="Fear the Deer NFTs"
                  />
                </div>
                <div className="name-label">Fear the Deer NFTs</div>
              </div>
            </button>
          </Link>
          <Link to={'/'} className="custom-link">
            <button className="grid-item button">
              <div className="banner-image">
                <img src={home_06_banner} alt="" />
              </div>
              <div className="wrapper-content">
                <div className="avatar">
                  <img
                    src={home_09_avt}
                    data-qa-component="campaign-avatar-image"
                    alt="Kia"
                  />
                </div>
                <div className="name-label">Kia</div>
              </div>
            </button>
          </Link>
          <Link to={'/'} className="custom-link">
            <button className="grid-item button">
              <div className="banner-image">
                <img src={home_07_banner} alt="" />
              </div>
              <div className="wrapper-content">
                <div className="avatar">
                  <img
                    src={home_10_avt}
                    data-qa-component="campaign-avatar-image"
                    alt="Old Navy"
                  />
                </div>
                <div className="name-label">Old Navy</div>
              </div>
            </button>
          </Link>
        </div>
        {/* Hot Collectibles */}
        <div className="page-grid">
          <div className="title-header">Hot Collectibles</div>
          <div className="wrapper">
            <div className="list-carousel">
              <div className="slide-item">
                <Link to={'/'} className="button">
                  <div className="hot-ollectibles-wrapper">
                    <div className="header-left hot-ollectibles-item">
                      <span className="total-run">Total Run: 35000</span>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div>erc721</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="img-token">
                        <img src={home_11} alt="" />
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-item">
                        <div className="content-left">
                          <div className="avatar">
                            <img src={home_13_avt} alt="" />
                          </div>
                          <div className="name-label">Elton John</div>
                        </div>
                        <div className="content-right">Buy Now</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="name-label">
                        Elton John Rocket NFT Club Pass
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-price">
                        <div className="price-header">Price</div>
                        <div className="current-price">$29.99</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-remaining">
                        <div className="remaining-header">Remaining </div>
                        <div className="quantity-remaining">26008</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="slide-item">
                <Link to={'/'} className="button">
                  <div className="hot-ollectibles-wrapper">
                    <div className="header-left hot-ollectibles-item">
                      <span className="total-run">Total Run: 35000</span>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div>erc721</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="img-token">
                        <img src={home_12} alt="" />
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-item">
                        <div className="content-left">
                          <div className="avatar">
                            <img src={home_14_avt} alt="" />
                          </div>
                          <div className="name-label">Old Navy</div>
                        </div>
                        <div className="content-right">Buy Now</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="name-label">Generative Magic the Dog</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-price">
                        <div className="price-header">Price</div>
                        <div className="current-price">$0.094</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-remaining">
                        <div className="remaining-header">Remaining </div>
                        <div className="quantity-remaining">0</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Free Drops */}
        <div className="page-grid">
          <div className="title-header">Free Drops</div>
          <div className="wrapper">
            <div className="list-carousel">
              <div className="slide-item">
                <Link to={'/'} className="button">
                  <div className="hot-ollectibles-wrapper">
                    <div className="header-left hot-ollectibles-item">
                      <span className="total-run">Total Run: 35000</span>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div>erc721</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="img-token">
                        <img src={home_11} alt="" />
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-item">
                        <div className="content-left">
                          <div className="avatar">
                            <img src={home_13_avt} alt="" />
                          </div>
                          <div className="name-label">Elton John</div>
                        </div>
                        <div className="content-right">Buy Now</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="name-label">
                        Elton John Rocket NFT Club Pass
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-price">
                        <div className="price-header">Price</div>
                        <div className="current-price">$29.99</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-remaining">
                        <div className="remaining-header">Remaining </div>
                        <div className="quantity-remaining">26008</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="slide-item">
                <Link to={'/'} className="button">
                  <div className="hot-ollectibles-wrapper">
                    <div className="header-left hot-ollectibles-item">
                      <span className="total-run">Total Run: 35000</span>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div>erc721</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="img-token">
                        <img src={home_12} alt="" />
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-item">
                        <div className="content-left">
                          <div className="avatar">
                            <img src={home_14_avt} alt="" />
                          </div>
                          <div className="name-label">Old Navy</div>
                        </div>
                        <div className="content-right">Buy Now</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="name-label">Generative Magic the Dog</div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-price">
                        <div className="price-header">Price</div>
                        <div className="current-price">$0.094</div>
                      </div>
                    </div>
                    <div className="hot-ollectibles-item">
                      <div className="wrapper-remaining">
                        <div className="remaining-header">Remaining </div>
                        <div className="quantity-remaining">0</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Homepage;
