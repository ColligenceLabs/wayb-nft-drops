import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
// import etherscan_view from '../../assets/icon/etherscan_view.svg';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_twitter from '../../assets/img/icon_twitter.png';

import { useNavigate, useParams } from 'react-router-dom';
import { FeaturedTypes } from '../../types/FeaturedTypes';
import { getFeaturedById } from '../../services/services';
import CollectionList from './CollectionList';

type LinkTypes = {
  type: string;
  url: string;
  useExternalUrl: boolean;
};

const Collection = () => {
  const params = useParams();
  const [featured, setFeatured] = useState<FeaturedTypes | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await getFeaturedById(params.id!);
      if (res.status === 200) {
        setFeatured(res.data);
      }
    };

    fetchFeatured();
  }, []);

  const getUrl = (type: string) => {
    let result;
    if (featured?.links) {
      result = featured?.links.find((sns: LinkTypes) => {
        if (sns.type === type) return sns;
      });
    }

    return result ? result['url'] : '#';
  };

  const moveSns = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
    const url = getUrl(type);
    if (url === '#') e.preventDefault();
    else window.open(url, '_blank');
  };

  return (
    <main className="collection-container min-height-content">
      {featured ? (
        <>
          <div
            className="collection-banner-image"
            style={{
              backgroundImage: `url("${featured.banner}")`,
            }}
          ></div>
          <div className="box-collection">
            <div className="collection-details-box">
              <div className="collection-info">
                <div className="collection-info-left">
                  <img src={featured.image} alt="" draggable={false} />
                  <div className="name">
                    <div className="fullname">{featured.name.en}</div>
                    <div className="username">{featured.company.name.en}</div>
                  </div>
                </div>
                <div className="collection-info-right">
                  <div className="collection-info-left-details">
                    <div
                      style={{
                        cursor: `${
                          getUrl('SITE') === '#' ? 'default' : 'pointer'
                        }`,
                      }}
                      className="info-item"
                      onClick={(e) => moveSns(e, 'SITE')}
                    >
                      <div className="image-item">
                        <img src={website_icon} alt="Website Icon" />
                      </div>
                    </div>
                    <div
                      style={{
                        cursor: `${
                          getUrl('DISCORD') === '#' ? 'default' : 'pointer'
                        }`,
                      }}
                      className="info-item"
                      onClick={(e) => moveSns(e, 'DISCORD')}
                    >
                      <div className="image-item">
                        <img src={icon_discord} alt="Discord Icon" />
                      </div>
                    </div>
                    <div
                      style={{
                        cursor: `${
                          getUrl('INSTAGRAM') === '#' ? 'default' : 'pointer'
                        }`,
                      }}
                      onClick={(e) => moveSns(e, 'INSTAGRAM')}
                      className="info-item"
                    >
                      <div className="image-item">
                        <img src={icon_instagram} alt="Instagram Icon" />
                      </div>
                    </div>
                    <div
                      style={{
                        cursor: `${
                          getUrl('TWITTER') === '#' ? 'default' : 'pointer'
                        }`,
                      }}
                      onClick={(e) => moveSns(e, 'TWITTER')}
                      className="info-item"
                    >
                      <div className="image-item">
                        <img src={icon_twitter} alt="Twitter Icon" />
                      </div>
                    </div>
                    {/* <div className="label">NFTs</div> */}
                  </div>
                  <div className="line-icon"></div>
                  <div className="collection-info-right-details">
                    <div className="value">100</div>
                    <div className="label">NFTs</div>
                  </div>
                </div>
              </div>
              <div className="collection-info-content">
                <div>{featured.description.en}</div>
              </div>
            </div>
            <CollectionList
              featuredId={featured.id}
              companyLogo={featured.company.image}
              companyName={featured.company.name.en}
            />
            {/*<div className="marketplace">*/}
            {/*  <div className="marketplace-collection-tittle">*/}
            {/*    Featured Collectibles*/}
            {/*  </div>*/}

            {/*  <div className="marketplace-items">*/}
            {/*    {list_products.map((item, index) => {*/}
            {/*      return (*/}
            {/*        <Link to={`/sale/${index}`} key={index}>*/}
            {/*          <div className="item_product">*/}
            {/*            <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">*/}
            {/*              <div className="total_item">Total Run: 50</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">*/}
            {/*              <div>erc721</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">*/}
            {/*              <div className="card">*/}
            {/*                <img src={product} alt="" />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">*/}
            {/*              <div className="owner_product">*/}
            {/*                <div className="owner_product_box">*/}
            {/*                  <span className="owner_product_avatar">*/}
            {/*                    <img src={avatar} alt="" />*/}
            {/*                  </span>*/}
            {/*                  <p className="">{item.owner_name}</p>*/}
            {/*                </div>*/}
            {/*                <Link to="/sale">*/}
            {/*                  <div className="status ">Buy Now</div>*/}
            {/*                </Link>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_NAME_KEY">*/}
            {/*              <div className="product_name ">{item.name}</div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_BID_KEY">*/}
            {/*              <div className="box-price">*/}
            {/*                <div className="price ">Price</div>*/}
            {/*                <div className="currency ">$50.00</div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="item_product_detail MARKETPLACE_NAME_TIME">*/}
            {/*              <div>*/}
            {/*                <div className="remaining ">Remaining</div>*/}
            {/*                <div className="remaining-total ">0</div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </Link>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </>
      ) : (
        <div>ife</div>
      )}
    </main>
  );
};

export default Collection;
