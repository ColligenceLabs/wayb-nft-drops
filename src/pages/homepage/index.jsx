import React from 'react';
import home_02 from '../../assets/img/home_02.jpeg';
import home_03 from '../../assets/img/home_03.jpeg';
import home_04 from '../../assets/img/home_04.jpeg';
import home_05_banner from '../../assets/img/home_05_banner.png';
import home_06_banner from '../../assets/img/home_06_banner.jpg';
import home_07_banner from '../../assets/img/home_07_banner.jpeg';
import home_08_avt from '../../assets/img/home_08_avt.png';
import home_09_avt from '../../assets/img/home_09_avt.jpg';
import home_10_avt from '../../assets/img/home_10_avt.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel, { WithStyles } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
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
            <div>
              <img src={home_04} alt="" draggable={false} />
            </div>
          </div>
        </Carousel>
      </div>
      {/* section 02 */}
      <div className="section-02">
        <div className="grid-container">
        {/* Featured Collections */}
          <div className="wrapper-header">
            <div className="header-name">Featured Collections</div>
            <a href='/' className="show-all-item button">See all</a>
          </div>
          <button className="grid-item button">
            <div className="banner-image">
              <img src={home_05_banner} alt="" />
            </div>
            <div className="wrapper-content">
              <div className="avatar">
                <img src={home_08_avt} data-qa-component="campaign-avatar-image" alt="Fear the Deer NFTs" />
              </div>
              <div className="name-label">Fear the Deer NFTs</div>
            </div>
          </button>
          <button className="grid-item button">
            <div className="banner-image">
            <img src={home_06_banner} alt="" />
            </div>
            <div className="wrapper-content">
              <div className="avatar">
                <img src={home_09_avt} data-qa-component="campaign-avatar-image" alt="Kia" />
              </div>
              <div className="name-label">Kia</div>
            </div>
          </button>
          <button className="grid-item button">
            <div className="banner-image">
            <img src={home_07_banner} alt="" />
            </div>
            <div className="wrapper-content">
              <div className="avatar">
                <img src={home_10_avt} data-qa-component="campaign-avatar-image" alt="Old Navy" />
              </div>
              <div className="name-label">Old Navy</div>
            </div>
          </button>
        </div>
         {/* Hot Collectibles */}
        <div className="page-grid">
          <div className='hot-collectibles title-header'>Hot Collectibles</div>
          <div className="list-carousel"></div>
          </div>
      </div>
    </div>
  );
};

export default Homepage;
