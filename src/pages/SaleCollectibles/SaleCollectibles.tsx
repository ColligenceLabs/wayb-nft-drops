import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import not_found from '../../assets/img/not_found.gif';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import avatar from '../../assets/img/avatar.png';
import home_11 from '../../assets/img/home_11.png';
import home_13_avt from '../../assets/img/home_13_avt.jpg';
import ic_info from '../../assets/icon/info_pink.svg';
import ic_search from '../../assets/icon/search.svg';
import PaymentWallets from 'components/modal/PaymentWallets';
import PaymentWalletsSuccess from 'components/modal/PaymentWalletsSuccess';
import { MBoxTypes } from '../../types/MBoxTypes';

type MBoxTypesWithCompany = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

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
  {
    id: 10,
    owner_name: 'Milwaukee Bucks 10',
    name: 'Chicago Deer 10',
  },
];

const SaleCollectibles = () => {
  const location = useLocation();

  const [mBoxInfo, setMBoxInfo] = useState<MBoxTypesWithCompany | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openPaymentWallets, setOpenPaymentWallets] = useState(false);
  const [openPaymentWalletsSuccess, setOpenPaymentWalletsSuccess] =
    useState(false);
  const ref = useRef();
  const useOnClickOutside = (ref: any, handler: any) => {
    useEffect(() => {
      const listener = (event: any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  };

  useOnClickOutside(ref, () => setModalOpen(false));

  useEffect(() => {
    if (location.state.item) setMBoxInfo(location.state.item);
  }, []);

  return (
    <main className="collection-container" style={{ marginTop: '3rem' }}>
      {mBoxInfo ? (
        <div>
          <div className="price-collection-view-page">
            <div className="price-collection-box">
              <div className="token-showcase-box">
                <img src={mBoxInfo.revealAnimation} alt="" />
              </div>
              <div className="token-details-box">
                <div>
                  <div className="box-owner-product">
                    <button className="btn-avatar-owner-product">
                      <img
                        src={mBoxInfo.companyLogo}
                        alt={mBoxInfo.companyName}
                      />
                    </button>
                    <div className="name-owner-product">
                      <button className="btn-name-owner-product">
                        {mBoxInfo.companyName}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="btn-buy-now">Buy Now</div>
                </div>
                <div>
                  <div className="box-name-collection">
                    <div className="name-collection fw-600">
                      {mBoxInfo.title.en}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="">{mBoxInfo.introduction.en}</div>
                </div>
                <div>
                  <a className="authenticity-button">
                    <img src={ic_info} style={{ marginRight: '5px' }} alt="" />{' '}
                    Authenticity
                  </a>
                </div>
                <div>
                  <div className="box-price-collection">
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Total Run</div>
                      <div className="lable-bottom fw-600">
                        {mBoxInfo.totalAmount}
                      </div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Availability</div>
                      <div className="lable-bottom fw-600">0</div>
                    </div>
                    <div className="box-price-detail-collection">
                      <div className="lable-top">Token Type</div>
                      <div className="lable-bottom fw-600">erc721</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="box-purchase-price">
                    <div className="lable-top">Purchase price</div>
                    <div className="lable-bottom fw-600">{`${mBoxInfo.price} ${mBoxInfo.quote}`}</div>
                  </div>
                  <button
                    className={'btn-sale-collection'}
                    onClick={() => setOpenPaymentWallets(true)}
                  >
                    Buy Now
                  </button>
                  {/* <button className="btn-sale-collection disable">Sold out</button> */}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="title-sale-by-Collectors fw-600">
                  For Sale by Collectors
                </div>
                <div className="sub-title-sale-by-Collectors fw-600">
                  Sold out? No problem! Check out user listings below.
                </div>
              </div>
              <div className="userSales">
                <div className="filter-box">
                  <div className="search-box">
                    <img
                      src={ic_search}
                      style={{ margin: '0px 5px 0px 20px' }}
                      alt=""
                    />
                    <input
                      className="marketplace-search-textbox"
                      placeholder="Search listings…"
                    />
                  </div>
                  <div className="type-filter-box">
                    <div className="type-filter-box-left">
                      <div className="type-filter-item active">All</div>
                      <div className="type-filter-item">Buy Now</div>
                      <div className="type-filter-item">Auction</div>
                    </div>
                    <div className="type-filter-box-right">
                      <div className="dropdown-sort-type-collection"></div>
                      <div className=""></div>
                    </div>
                  </div>
                </div>
                <div className="marketplace-items">
                  <div className="list-carousel">
                    {list_products.map((item, index) => {
                      return (
                        <div className="slide-item" key={index}>
                          <Link to={'/sale'} className="button">
                            <div className="hot-ollectibles-wrapper">
                              <div className="header-left hot-ollectibles-item">
                                <span className="total-run fw-600">
                                  Total Run: 35000
                                </span>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div>erc721</div>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div className="img-token">
                                  <img src={home_11} alt="" />
                                </div>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div className="wrapper-item">
                                  <div className="content-left">
                                    <div className="avatar">
                                      <img src={home_13_avt} alt="" />
                                    </div>
                                    <div className="name-label">Elton John</div>
                                  </div>
                                  <div className="content-right">Buy Now</div>
                                </div>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div className="name-label">
                                  Elton John Rocket NFT Club Pass
                                </div>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div className="wrapper-price">
                                  <div className="price-header font-size-14">
                                    Price
                                  </div>
                                  <div className="current-price font-size-18">
                                    $29.99
                                  </div>
                                </div>
                              </div>
                              <div className="hot-ollectibles-item">
                                <div className="wrapper-remaining">
                                  <div className="remaining-header font-size-14">
                                    Remaining{' '}
                                  </div>
                                  <div className="quantity-remaining font-size-18">
                                    26008
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className="not-found">
                    <div>
                      <img src={not_found} alt="" />
                      <div className="token-not-found">No tokens found...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PaymentWallets
            show={openPaymentWallets}
            onHide={() => setOpenPaymentWallets(false)}
            openPaymentWalletsSuccess={() => setOpenPaymentWalletsSuccess(true)}
          />
          <PaymentWalletsSuccess
            show={openPaymentWalletsSuccess}
            onHide={() => setOpenPaymentWalletsSuccess(false)}
          />
        </div>
      ) : null}
    </main>
  );
};

export default SaleCollectibles;
