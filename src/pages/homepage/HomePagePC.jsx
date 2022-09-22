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
import home_15 from '../../assets/img/home_15.jpg';
import home_16 from '../../assets/img/home_16.jpg';
import home_17 from '../../assets/img/home_17.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import HomePageMb from './HomePageMb';
import useScreenSize from 'components/common/useScreenSize';
const Homepage = () => {
  const screenSize = useScreenSize();
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
  const slideData = [
    {
      url: '/oldnavy',
      imagePC: home_02,
      imageMb: home_15,
    },
    {
      url: '/',
      imagePC: home_03,
      imageMb: home_16,
    },
    {
      url: '/collection',
      imagePC: home_04,
      imageMb: home_17,
    },
  ];
  const featuredCollectionsData = [
    {
      url: '/collection',
      imageBanner: home_05_banner,
      imageAvatar: home_08_avt,
      nameLabel: 'Fear the Deer NFTs',
    },
    {
      url: '/collection',
      imageBanner: home_06_banner,
      imageAvatar: home_09_avt,
      nameLabel: 'Kia',
    },
    {
      url: '/collection',
      imageBanner: home_07_banner,
      imageAvatar: home_10_avt,
      nameLabel: 'Old Navy',
    },
    {
      url: '/collection',
      imageBanner: home_05_banner,
      imageAvatar: home_08_avt,
      nameLabel: 'Fear the Deer NFTs',
    },
    {
      url: '/collection',
      imageBanner: home_06_banner,
      imageAvatar: home_09_avt,
      nameLabel: 'Kia',
    },
  ];
  const hotCollectiblesData = [
    {
      url: '/sale',
      image: home_11,
      imageAvt: home_13_avt,
      nameLabel: 'Elton John',
      details: 'Elton John Rocket NFT Club Pass',
      currentPrice: 29.99,
      quantityRemaining: 26008,
    },
    {
      url: '/sale',
      image: home_12,
      imageAvt: home_14_avt,
      nameLabel: 'Old Navy',
      details: 'Generative Magic the Dog',
      currentPrice: 0.094,
      quantityRemaining: 0,
    },
    {
      url: '/sale',
      image: home_11,
      imageAvt: home_13_avt,
      nameLabel: 'Elton John',
      details: 'Elton John Rocket NFT Club Pass',
      currentPrice: 29.99,
      quantityRemaining: 26008,
    },
    {
      url: '/sale',
      image: home_12,
      imageAvt: home_14_avt,
      nameLabel: 'Old Navy',
      details: 'Generative Magic the Dog',
      currentPrice: 0.094,
      quantityRemaining: 0,
    },
    {
      url: '/sale',
      image: home_11,
      imageAvt: home_13_avt,
      nameLabel: 'Elton John',
      details: 'Elton John Rocket NFT Club Pass',
      currentPrice: 29.99,
      quantityRemaining: 26008,
    },
  ];
  return isMobile ? (
    <HomePageMb />
  ) : (
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
          {slideData.map((item, index) => (
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
            {featuredCollectionsData.map((item, index) => (
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
            {hotCollectiblesData.map((item, index) => (
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
            {hotCollectiblesData.map((item, index) => (
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
