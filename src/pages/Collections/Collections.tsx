import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { getFeaturedCollections } from '../../services/services';
import FeaturedCard from '../../components/card/FeaturedCard';

const Collections = () => {
  const [featuredCollections, setFeaturedCollections] = useState<
    FeaturedTypes[]
  >([]);

  useEffect(() => {
    const fetchFeaturedCollections = async () => {
      const res = await getFeaturedCollections(20);
      if (res.data.status === 1) {
        setFeaturedCollections(res.data.data.list);
      }
    };

    fetchFeaturedCollections();
  }, []);

  return (
    <div className="home-page min-height-content">
      <div className="section-02">
        {/* Featured Collections */}
        <div className="featured-collections">
          <div className="wrapper-header title-header">
            <div className="header-name">All Collections</div>
          </div>
          <div className="grid-container">
            {featuredCollections.map((item: FeaturedTypes, index) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
