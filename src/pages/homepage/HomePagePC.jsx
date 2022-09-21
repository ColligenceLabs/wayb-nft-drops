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
import { isMobile } from 'react-device-detect';
import HomePageMb from './HomePageMb';
const Homepage = () => {
  const carouselOption = {
    additionalTransfrom: 0,
    arrows: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
    draggable: true,
    focusOnSelect: false,
    infinite: true,
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
      image: home_02,
    },
    {
      url: '/',
      image: home_03,
    },
    {
      url: '/collection',
      image: home_04,
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
        {/* carousel pc view */}
        <Carousel
          {...carouselOption}
          centerMode
          containerClass="container-with-dots home-carousel-pc hidden-tablet hidden-mobile"
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
              partialVisibilityGutter: 40,
            },
          }}
        >
          {slideData.map((item) => {
            return (
              <div className="slide-item">
                <Link to={item.url} target={'_blank'}>
                  <div>
                    <img src={item.image} alt="" draggable={false} />
                  </div>
                </Link>
              </div>
            );
          })}
        </Carousel>
        {/* carousel tablet and mobile view */}
        <Carousel
          {...carouselOption}
          centerMode={false}
          containerClass="container-with-dots home-carousel-mb hidden-pc"
          responsive={{
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
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {slideData.map((item) => (
            <div className="slide-item">
              <Link to={item.url} target={'_blank'}>
                <div>
                  <img src={item.image} alt="" draggable={false} />
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      {/* section 02 */}
      <div className="section-02">
        <div className="grid-container">
          {/* Featured Collections */}
          <div className="wrapper-header title-header">
            <div className="header-name">Featured Collections</div>
            <Link to={'/collections'} className="show-all-item button">
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
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container hot-collectibles"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
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
                items: 5,
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
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <Link to={'/sale'} className="button custom-box">
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
            <Link to={'/sale'} className="button custom-box">
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
          </Carousel>
        </div>
        {/* Free Drops */}
        <div className="page-grid">
          <div className="title-header">Free Drops</div>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container hot-collectibles"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
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
                items: 5,
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
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <Link to={'/sale'} className="button custom-box">
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
            <Link to={'/sale'} className="button custom-box">
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
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
