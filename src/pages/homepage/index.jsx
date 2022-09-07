import React from 'react';
import Slider from 'react-slick';
import home_02 from '../../assets/img/home_02.jpeg';
import home_03 from '../../assets/img/home_03.jpeg';
import home_04 from '../../assets/img/home_04.jpeg';
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
        {/* <div className="carousel-home">
          <div className="list-carousel">

          </div>
        </div> */}
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode
          className=""
          containerClass="home-carousel"
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
              items: 1,
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
            <div>
              <img src={home_04} alt="" draggable={false} />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Homepage;
