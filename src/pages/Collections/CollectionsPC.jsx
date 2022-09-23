import React from 'react';
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
import CollectionsMb from './CollectionsMB';
import { isMobile } from 'react-device-detect';
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
  {
    url: '/collection',
    imageBanner: home_07_banner,
    imageAvatar: home_10_avt,
    nameLabel: 'Old Navy',
  },
];
const Collections = () => {
  return isMobile ? (
    <CollectionsMb />
  ) : (
    <div className="home-page">
      <div className="section-02">
        {/* Featured Collections */}
        <div className="featured-collections">
          <div className="wrapper-header title-header">
            <div className="header-name">All Collections</div>
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
      </div>
    </div>
  );
};

export default Collections;
