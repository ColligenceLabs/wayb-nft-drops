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
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const CollectionsMb = () => {
  return (
    <div className="homepage-mb">
      <div className="section-02">
        <div className="grid-container">
          {/* Featured Collections */}
          <div className="wrapper-header title-header">
            <div className="header-name">All Collections</div>
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
          <Link to={'/collection'} className="custom-link">
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
          <Link to={'/collection'} className="custom-link">
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
      </div>
    </div>
  );
};

export default CollectionsMb;
