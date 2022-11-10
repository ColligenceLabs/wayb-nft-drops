import React from 'react';
import { Link } from 'react-router-dom';
import { getPrice } from 'utils/getPrice';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { MBoxTypes } from '../../types/MBoxTypes';

type MBoxItemCardProps = {
  item: MBoxItemTypes;
  chainId: number;
  mBoxInfo: MBoxTypes;
  mBoxName: string;
  mBoxImage: string;
  quote: string | null;
  price: number | null;
};
const MBoxItemCard: React.FC<MBoxItemCardProps> = ({
  item,
  chainId,
  mBoxName,
  mBoxInfo,
  mBoxImage,
  quote,
  price,
}) => {
  return (
    <div className="slide-item">
      {/*<Link to={``} className="button">*/}
      <div className="hot-ollectibles-wrapper">
        <div className="header-left hot-ollectibles-item">
          <span className="total-run fw-600">
            Total Items: {item.issueAmount}
          </span>
        </div>
        <div className="hot-ollectibles-item">
          <div>{getNetworkNameById(chainId)}</div>
        </div>
        <div className="hot-ollectibles-item">
          <div className="img-token">
            {item.originalImage.split('.').pop() === 'mp4' ? (
              <video
                playsInline
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
                <img src={mBoxInfo.featured?.company.image} alt="" />
              </div>
              <div className="name-label">
                {mBoxInfo.featured?.company.name.en}
              </div>
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
            <div className="current-price font-size-18">
              {getPrice(Number(price), quote!)}
            </div>
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
