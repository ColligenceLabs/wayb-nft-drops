import React from 'react';
import banner_collection from '../../assets/img/banner_collection.png';
import avatar from '../../assets/img/avatar.png';
import product from '../../assets/img/product.png';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const CollectionMb = () => {
  return (
    <main className="collection-container">
           <div className="collection-banner-image"
          style={{
            backgroundImage: `url("${banner_collection}")`
          }}>
        </div>
      <div className="box-collection">
   
        <div className="collection-details-box">
          <div className="collection-info">
            <div className="collection-info-left">
              <img src={avatar} alt="" draggable={false} />
              <div className="name">
                <div className="fullname">Fear the Deer NFTs</div>
                <div className="username">@bucks</div></div>
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
            <div>The Milwaukee Bucks are excited to launch the Fear the Deer NFT series with their first collection - The Championship Collection. Collect unique NFTs that commemorate the Bucks 2021 Championship. Stay informed to this marketplace and through Milwaukee Bucks social channels for announcements regarding The Championship Collection drops. Let’s celebrate 50 Years in the Making!
            </div>
          </div>
        </div>
        <div className="marketplace">
          <div className="marketplace-collection-tittle">Featured Collectibles</div>
          
          <div className="marketplace-items">
            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/sale">
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
                      <p className="fw-600">Milwaukee Bucks</p>
                    </div>
                    <Link to="/sale">
                      <div className="status fw-600">
                        Buy Now
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name fw-600">Chicago Deer</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price fw-600">Price</div>
                    <div className="currency fw-600">$50.00</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining fw-600">Remaining</div>
                    <div className="remaining-total fw-600">0</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionMb;
