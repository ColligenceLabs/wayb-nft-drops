import React from 'react';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { Link } from 'react-router-dom';

type FeaturedCardProps = {
  item: FeaturedTypes;
};
const FeaturedCard: React.FC<FeaturedCardProps> = ({ item }) => {
  return (
    <Link to={`/collection/${item.id}`} className="custom-link">
      <button className="grid-item button">
        <div className="banner-image">
          <img src={item.banner} alt="" />
        </div>
        <div className="wrapper-content">
          <div className="avatar">
            <img
              src={item.image}
              data-qa-component="campaign-avatar-image"
              alt={item.name.en}
            />
          </div>
          <div className="name-label">{item.name.en}</div>
        </div>
      </button>
    </Link>
  );
};

export default FeaturedCard;
