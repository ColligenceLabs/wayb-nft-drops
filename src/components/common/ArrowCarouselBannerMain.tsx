import React from 'react';
import arrow_right from '../../assets/svg/arrow_right.svg';
import arrow_left from '../../assets/svg/arrow_left.svg';
import arrow_left_carousel from '../../assets/icon/arrow_left_carousel.png';
import arrow_right_carousel from '../../assets/icon/arrow_right_carousel.png';
const ArrowCarouselBannerMain = ({ next, previous }: any) => {
  return (
    <>
      <div className={'arrow-one'} onClick={() => previous()}>
        <img src={arrow_left_carousel} alt="arrow left" />
        {/* <div className="arrow-left">
          <img src={arrow_left} alt="arrow left" />
        </div> */}
      </div>
      <div className={'arrow-two'} onClick={() => next()}>
        <img src={arrow_right_carousel} alt="arrow right" />
        {/* <div className="arrow-right">
          <img src={arrow_right} alt="arrow right" />
        </div> */}
      </div>
    </>
  );
};

export default ArrowCarouselBannerMain;
