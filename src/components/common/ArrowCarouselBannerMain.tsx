import React from 'react';
import arrow_right from '../../assets/svg/arrow_right.svg';
import arrow_left from '../../assets/svg/arrow_left.svg';
const ArrowCarouselBannerMain = ({ next, previous }: any) => {
  return (
    <div className="arrow-banner-mainpage">
      <div className={'arrow-one'} onClick={() => previous()}>
        <div className="arrow-left">
          <img src={arrow_left} alt="arrow left" />
        </div>
      </div>
      <div className={'arrow-two'} onClick={() => next()}>
        <div className="arrow-right">
          <img src={arrow_right} alt="arrow right" />
        </div>
      </div>
    </div>
  );
};

export default ArrowCarouselBannerMain;
