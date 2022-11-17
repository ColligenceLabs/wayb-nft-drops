import React from 'react';
import talken_icon from '../../assets/img/icon_talk.png';
import verify_icon from '../../assets/img/verify-icon.png';
import info_blue from '../../assets/icon/info_blue.svg';
import image_nft from '../../assets/img/image_nft.png';
import avatar from '../../assets/img/avatar_user.webp';
import arrow_btn_back from '../../assets/img/arrow_btn_back.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Purchase_History_Detail = () => {
  return (
    <main className="purchase-detail-container min-height-content">
      <div className="wrapper-purchase-detail">
        <Link to="/purchase-history" className="back-purchase-list">
          <img src={arrow_btn_back} alt="arrow back" />
          Back
        </Link>
        <div className="collectible">
          <div className="collectible-image-container">
            <img src={image_nft} alt="" />
          </div>
          <div className="campaignBlock">
            <img height={30} src={talken_icon} alt="" />
            <div className="campaign_name">Ice Cream</div>
            <img height={19} src={verify_icon} alt="" />
          </div>
          <div className="line line-purchase"></div>
          <h1>Strawberry Shortcake Space Creampop #49</h1>
          <div className="collectibleDescription">
            <div className="description_text">
              The only thing better than ice cream is ice cream in SPACE!
            </div>
            <button>
              <img src={info_blue} alt="Information" />
              <span>Authenticity</span>
            </button>
          </div>
          <div className="current_owner">
            <div className="avt-user">
              <img id="profile_image" height={30} src={avatar} alt="" />
            </div>
            <div className="current_owner_title">Current Owner</div>
            <div className="user-name">Martin K.</div>
          </div>
          <div className="infoContainer">
            <div className="collectible-info-boxes">
              <div className="info">
                <p className="title">Total Items</p>
                <p className="value">2000</p>
              </div>
              <div className="info">
                <p className="title">Date Issued</p>
                <p className="value">08/29/2022</p>
              </div>
              <div className="info">
                <p className="title">Acquired</p>
                <p className="value">09/02/2022</p>
              </div>
              <div className="info">
                <p className="title">Token Standard</p>
                <p className="value">ERC-721</p>
              </div>
              <div className="info">
                <p className="title">Chain</p>
                <p className="value">Polygon</p>
              </div>
            </div>
          </div>
          <div className="marketPlaceBtn">
            <Link to={'/'}>
              <div className="marketplace-container">
                <span>
                  <img className="marketplace-icon" src={talken_icon} alt="" />
                </span>
                <span className="marketplace-text">Visit the Marketplace</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Purchase_History_Detail;
