import React from 'react';
import arrow_right from '../../assets/svg/arrow_right.svg';
import arrow_left from '../../assets/svg/arrow_left.svg';

const ArrowCarouselCollections = ({ goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide, slidesToShow },
  } = rest;
  return (
    <div className="arrow-featured-collections">
      <div
        className={'arrow-one'}
        onClick={() => goToSlide(currentSlide - slidesToShow)}
      >
        <div className="arrow-left">
          <img src={arrow_left} alt="arrow left" />
        </div>
      </div>
      <div
        className={'arrow-two'}
        onClick={() => goToSlide(currentSlide + slidesToShow)}
      >
        <div className="arrow-right">
          <img src={arrow_right} alt="arrow right" />
        </div>
      </div>
    </div>
  );
};

export default ArrowCarouselCollections;
