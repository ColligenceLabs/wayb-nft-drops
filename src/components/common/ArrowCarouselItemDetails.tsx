import React from 'react';
import arrow_right from '../../assets/svg/arrow_right.svg';
import arrow_left from '../../assets/svg/arrow_left.svg';
import arrow_left_carousel from '../../assets/icon/arrow_left_carousel.png';
import arrow_right_carousel from '../../assets/icon/arrow_right_carousel.png';

const ArrowCarouselItemDetails = ({ goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide, slidesToShow },
  } = rest;

  return (
    <div className="arrow-item-details">
      <div
        className={'arrow-one'}
        onClick={() => goToSlide(currentSlide - slidesToShow)}
      >
        <img src={arrow_left_carousel} alt="arrow left" />
        {/* <div className="arrow-left">
          <img src={arrow_left} alt="arrow left" />
        </div> */}
      </div>
      <div
        className={'arrow-two'}
        onClick={() => goToSlide(currentSlide + slidesToShow)}
      >
        <img src={arrow_right_carousel} alt="arrow right" />
        {/* <div className="arrow-right">
          <img src={arrow_right} alt="arrow right" />
        </div> */}
      </div>
    </div>
  );
};

export default ArrowCarouselItemDetails;
