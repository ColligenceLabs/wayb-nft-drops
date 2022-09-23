import React from 'react';
import banner_collection from '../../assets/img/banner_collection.png';
import avatar from '../../assets/img/avatar.png';
import product from '../../assets/img/product.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const CollectionMb = () => {
  const list_products = [
    {
      id: 1,
      owner_name: 'Milwaukee Bucks 1',
      name: 'Chicago Deer 1',
    },
    {
      id: 2,
      owner_name: 'Milwaukee Bucks 2',
      name: 'Chicago Deer 2',
    },
    {
      id: 3,
      owner_name: 'Milwaukee Bucks 3',
      name: 'Chicago Deer 3',
    },
    {
      id: 4,
      owner_name: 'Milwaukee Bucks 4',
      name: 'Chicago Deer 4',
    },
    {
      id: 5,
      owner_name: 'Milwaukee Bucks 5',
      name: 'Chicago Deer 5',
    },
    {
      id: 6,
      owner_name: 'Milwaukee Bucks 6',
      name: 'Chicago Deer 6',
    },
    {
      id: 7,
      owner_name: 'Milwaukee Bucks 7',
      name: 'Chicago Deer 7',
    },
    {
      id: 8,
      owner_name: 'Milwaukee Bucks 8',
      name: 'Chicago Deer 8',
    },
    {
      id: 9,
      owner_name: 'Milwaukee Bucks 9',
      name: 'Chicago Deer 9',
    },
  ];
  return (
    <main className="collection-container">
      <div
        className="collection-banner-image"
        style={{
          backgroundImage: `url("${banner_collection}")`,
        }}
      ></div>
      <div className="box-collection">
        <div className="collection-details-box">
          <div className="collection-info">
            <div className="collection-info-left">
              <img src={avatar} alt="" draggable={false} />
              <div className="name">
                <div className="fullname">Fear the Deer NFTs</div>
                <div className="username">@bucks</div>
              </div>
            </div>
            <div className="collection-info-right">
              <div className="collection-info-right-details">
                <div className="value">750</div>
                <div className="label">NFTs</div>
              </div>
              <div className="collection-info-right-details">
                <div className="value">723</div>
                <div className="label">Followers</div>
              </div>
            </div>
          </div>
          <div className="collection-info-content">
            <div>
              The Milwaukee Bucks are excited to launch the Fear the Deer NFT
              series with their first collection - The Championship Collection.
              Collect unique NFTs that commemorate the Bucks 2021 Championship.
              Stay informed to this marketplace and through Milwaukee Bucks
              social channels for announcements regarding The Championship
              Collection drops. Let’s celebrate 50 Years in the Making!
            </div>
          </div>
        </div>
        <div className="marketplace">
          <div className="marketplace-collection-tittle">
            Featured Collectibles
          </div>

          <div className="marketplace-items">
            {list_products.map((item, index) => {
              return (
                <Link to="/sale" key={index}>
                  <div className="item_product">
                    <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                      <div className="total_item">Total Run: 50</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                      <div>erc721</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                      <div className="card">
                        <img src={product} alt="" />
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                      <div className="owner_product">
                        <div className="owner_product_box">
                          <span className="owner_product_avatar">
                            <img src={avatar} alt="" />
                          </span>
                          <p className="">{item.owner_name}</p>
                        </div>
                        <Link to="/sale">
                          <div className="status ">Buy Now</div>
                        </Link>
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_KEY">
                      <div className="product_name ">{item.name}</div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_BID_KEY">
                      <div className="box-price">
                        <div className="price ">Price</div>
                        <div className="currency ">$50.00</div>
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_NAME_TIME">
                      <div>
                        <div className="remaining ">Remaining</div>
                        <div className="remaining-total ">0</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionMb;
