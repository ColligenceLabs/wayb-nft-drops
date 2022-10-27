import React from 'react';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { Link } from 'react-router-dom';
import { splitString } from '../../utils/splitString';
import LazyImage from '../common/LazyImage';

type FeaturedCardProps = {
  item: FeaturedTypes;
};
const FeaturedCard: React.FC<FeaturedCardProps> = ({ item }) => {
  return (
    <Link to={`/klaytn/featured/${item.id}`} className="custom-link">
      <button className="grid-item button">
        <div className="banner-image">
          <img src={item.banner} alt="" style={{ objectFit: 'cover' }} />
          {/*<LazyImage src={item.banner} />*/}
        </div>
        <div className="wrapper-content">
          <div className="avatar">
            <img
              src={item.image}
              data-qa-component="campaign-avatar-image"
              alt={item.name.en}
            />
          </div>
          <div className="name-label">{splitString(item.name.en, 20)}</div>
        </div>
      </button>
    </Link>
  );
};

export default FeaturedCard;
