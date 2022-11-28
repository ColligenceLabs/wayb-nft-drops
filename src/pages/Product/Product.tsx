import React from 'react';
import bannerproduct from '../../assets/img/bannerproduct.png';
import magic_dogs from '../../assets/img/magic_dogs.gif';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_share from '../../assets/img/icon_share.png';
import product from '../../assets/img/product.png';
import avatar from '../../assets/img/avatar.png';
import img17 from '../../assets/img/image17.png';
import img18 from '../../assets/img/image18.png';
import minus from '../../assets/img/minus.png';
import plus from '../../assets/img/plus.png';

import { Link } from 'react-router-dom';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import './style.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function Product() {
  return (
    <main className="collection-container min-height-content">
      <div
        className="collection-banner-image"
        style={{
          backgroundImage: `url("${
            // isMobile ? featured.mobileBanner : featured.banner
            bannerproduct
          }")`,
        }}
      ></div>
      <div className="box-collection">
        <div className="collection-details-box">
          <div className="collection-info">
            <div className="collection-info-left">
              <img src={magic_dogs} alt="" draggable={false} />
              <div className="name">
                <div className="fullname">Old Navy</div>
              </div>
            </div>
          </div>
          <div className="collection-info-content">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              unde quae quis doloribus, eaque nobis quasi eveniet laudantium
              ratione, et numquam iusto molestiae iste recusandae ipsa commodi
              repudiandae tenetur nesciunt?
            </div>
          </div>
        </div>
        {/*  min-height-content */}
        <div className="marketplace">
          <div className="marketplace-collection-tittle">IP</div>
          <div className="marketplace-items">
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: 35000</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={product} alt="" draggable={false} />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="">McLaren Racing</div>
                    </div>
                    <div>
                      <Link to={'/'}>
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">
                    McLaren British GP Commem...
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">$29.99</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining">Remaining</div>
                    <div className="remaining-total">100</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: 35000</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={product} alt="" draggable={false} />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="">McLaren Racing</div>
                    </div>
                    <div>
                      <Link to={'/'}>
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">
                    McLaren British GP Commem...
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">$29.99</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining">Remaining</div>
                    <div className="remaining-total">100</div>
                  </div>
                </div>
              </div>
            </Link>{' '}
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: 35000</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={product} alt="" draggable={false} />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="">McLaren Racing</div>
                    </div>
                    <div>
                      <Link to={'/'}>
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">
                    McLaren British GP Commem...
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">$29.99</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining">Remaining</div>
                    <div className="remaining-total">100</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: 35000</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={product} alt="" draggable={false} />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="">McLaren Racing</div>
                    </div>
                    <div>
                      <Link to={'/'}>
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">
                    McLaren British GP Commem...
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">$29.99</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining">Remaining</div>
                    <div className="remaining-total">100</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: 35000</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={product} alt="" draggable={false} />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="">McLaren Racing</div>
                    </div>
                    <div>
                      <Link to={'/'}>
                        <div className="status ">Buy Now</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">
                    McLaren British GP Commem...
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">$29.99</div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining">Remaining</div>
                    <div className="remaining-total">100</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* <div style={{ paddingTop: '30px' }}>
            <img src={img17} style={{ width: '100%' }} />
          </div>
          <div style={{ paddingTop: '30px' }}>
            <img src={img18} style={{ width: '100%' }} />
          </div> */}
        </div>
        <div className="info-minting">
          <p>
            {' '}
            <span>Current Block Number</span> #0000000
          </p>
          <p>
            <span>Minting Block Number</span> #0000000
          </p>
          <p>
            <span>Remaining Quantity</span> 0000/0000
          </p>
          <BorderLinearProgress variant="determinate" value={50} />
          <div className="d-flex">
            <p>
              <span>Per transaction</span> MAX 00{' '}
            </p>
            <p>
              {' '}
              <span>Per Wallet</span> Unlimited
            </p>
          </div>
          <div className="minting-amount">
            <div className="img-minus">
              <img src={minus} />
            </div>
            <div className="center">
              <p className="p-top"> Minting amount</p>
              <p className="p-bottom">$0.94</p>
            </div>
            <div className="img-plus">
              <img src={plus} />
            </div>
          </div>
          <p className="text-balance">
            <span>My Balance:</span> 0000 Klay
          </p>
          <div className="btn-minting">Minting</div>
          <div className="d-flex">
            <p>
              <span>블록확인하기</span> Klayswap KlaytnScope
            </p>
            <p className="text-right">My Collectibles</p>
          </div>
        </div>
      </div>
      <div className="bg"></div>
    </main>
  );
}
