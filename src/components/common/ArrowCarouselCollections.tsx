import React from 'react';
import arrow_right from '../../assets/svg/arrow_right.svg';
import arrow_left from '../../assets/svg/arrow_left.svg';

const ArrowCarouselCollections = ({ next, previous, ...rest }: any) => {
  const {
    carouselState: { currentSlide, totalItems, slidesToShow },
  } = rest;

  return (
    <div className="arrow-featured-collections">
      {' '}
      <div
        className={`arrow-one ${currentSlide === 0 ? 'remove-arrow' : ''}`}
        onClick={() => previous()}
      >
        <div className="arrow-left">
          <img src={arrow_left} alt="arrow left" />
        </div>
      </div>
      <div
        className={`arrow-two ${
          currentSlide === totalItems - slidesToShow ? 'remove-arrow' : ''
        }`}
        onClick={() => next()}
      >
        <div className="arrow-right">
          <img src={arrow_right} alt="arrow right" />
        </div>
      </div>
    </div>
  );
};

export default ArrowCarouselCollections;
