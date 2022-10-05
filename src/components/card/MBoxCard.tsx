import React from 'react';
import home_10_avt from '../../assets/img/home_10_avt.jpg';
import { MBoxTypes } from '../../types/MBoxTypes';
import { Link } from 'react-router-dom';
import ic_collectible_2 from '../../assets/svg/icon-collectible-2.svg';

type MBoxCardProps = {
  item: MBoxTypes;
};

const MBoxCard: React.FC<MBoxCardProps> = ({ item }) => {
  return (
    <Link to={`/my-collectibles/details/${item.id}`} state={{ item }}>
      <div className="item-product">
        <div className="item-product-detail">
          <div className="card">
            <img src={item.packageImage} alt="" />
          </div>
        </div>

        <div className="item-product-detail" style={{ padding: '0px' }}>
          <div className="box-info">
            <div className="box-product-name">
              <div className="product-type">Sweet</div>
              <div className="product-name">{item.title.en}</div>
            </div>
            <img src={ic_collectible_2} alt="" />
          </div>
        </div>

        <div className="item-product-detail"></div>
      </div>
    </Link>
  );
};

export default MBoxCard;
