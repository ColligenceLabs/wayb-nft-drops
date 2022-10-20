import React from 'react';
import { Link } from 'react-router-dom';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';

type MBoxItemCardProps = {
  item: MBoxItemTypes;
  mBoxName: string;
  mBoxImage: string;
  quote: string | null;
  price: number | null;
};
const MBoxItemCard: React.FC<MBoxItemCardProps> = ({
  item,
  mBoxName,
  mBoxImage,
  quote,
  price,
}) => {
  console.log(item);
  return (
    <div className="slide-item">
      {/*<Link to={``} className="button">*/}
      <div className="hot-ollectibles-wrapper">
        <div className="header-left hot-ollectibles-item">
          <span className="total-run fw-600">
            Total Run: {item.issueAmount}
          </span>
        </div>
        <div className="hot-ollectibles-item">
          <div>erc721</div>
        </div>
        <div className="hot-ollectibles-item">
          <div className="img-token">
            {item.originalImage.split('.').pop() === 'mp4' ? (
              <video
                autoPlay
                controls
                muted
                loop
                controlsList="nodownload"
                width={'100%'}
              >
                <source src={item.originalImage} type="video/mp4" />
              </video>
            ) : (
              <img src={item.itemImage} alt="" />
            )}
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
            <div className="current-price font-size-18">{`${quote} ${price}`}</div>
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
      {/*</Link>*/}
    </div>
  );
};

export default MBoxItemCard;
