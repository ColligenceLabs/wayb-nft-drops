import React from 'react';
import { Link } from 'react-router-dom';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';

type MBoxItemCardProps = {
  item: MBoxItemTypes;
  mBoxName: string;
  mBoxImage: string;
};
const MBoxItemCard: React.FC<MBoxItemCardProps> = ({
  item,
  mBoxName,
  mBoxImage,
}) => {
  return (
    <div className="slide-item">
      <Link to={'/sale'} className="button">
        <div className="hot-ollectibles-wrapper">
          <div className="header-left hot-ollectibles-item">
            <span className="total-run fw-600">Total Run: 35000</span>
          </div>
          <div className="hot-ollectibles-item">
            <div>erc721</div>
          </div>
          <div className="hot-ollectibles-item">
            <div className="img-token">
              <img src={item.itemImage} alt="" />
            </div>
          </div>
          <div className="hot-ollectibles-item">
            <div className="wrapper-item">
              <div className="content-left">
                <div className="avatar">
                  <img src={mBoxImage} alt="" />
                </div>
                <div className="name-label">{mBoxName}</div>
              </div>
              <div className="content-right">Buy Now</div>
            </div>
          </div>
          <div className="hot-ollectibles-item">
            <div className="name-label">{item.name}</div>
          </div>
          <div className="hot-ollectibles-item">
            <div className="wrapper-price">
              <div className="price-header font-size-14">Price</div>
              <div className="current-price font-size-18">$29.99</div>
            </div>
          </div>
          <div className="hot-ollectibles-item">
            <div className="wrapper-remaining">
              <div className="remaining-header font-size-14">Remaining </div>
              <div className="quantity-remaining font-size-18">
                {item.remainingAmount!}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MBoxItemCard;
