import React from 'react';
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';

import avatar from '../../assets/img/avatar.png';
import home_11 from '../../assets/img/home_11.png';
import home_13_avt from '../../assets/img/home_13_avt.jpg';
import ic_info from '../../assets/icon/info_pink.svg';
import ic_search from '../../assets/icon/search.svg';


const SaleCollectiblesMb = () => {
  return (
    <main className="collection-container" style={{ marginTop: `3rem` }}>
      <div>
        <div className="price-collection-view-page">
          <div className="price-collection-box">
            <div className="token-showcase-box">
              <video id="visualizer_video" src="https://media.sweet.io/series/4NbnGXRW/media.mp4?Expires=1662950740&amp;Signature=ECti6pwTwwz827ZvByyEUo632hnUi-hLldn0sKAFjx23bNtj5BNTy92rA-6HJRgFbCnduUCyCDYwMalVMlyFLOu0xt5zBKRFmEiopZKzb7LcNfe2TVFEEX7kM16NVh7LhLtRXgmed~KGmBaJi6-mTWxnpN27MZPzi9praakGazk79f74gvQ~o-cH5Y1XmiePyP~l3vbkdIcVUTZ2CNyn65YK4l11GOZvA6hub9y3Z~qMr9mXdEjDZYnhq6d2-V8iKRK074BpJ0tFSLXvunE1EFKMlzy0lZXbrthtXuH44JjSmNOiFPXLaMOBIVd~ccbQa-BOYrrmwPYFzzvQHZK9jQ__&amp;Key-Pair-Id=APKAI7JPLY6SMYVRHWMQ" ></video>
            </div>
            <div className="token-details-box">
              <div>
                <div className="box-owner-product">
                  <button className="btn-avatar-owner-product">
                    <img src={avatar} />
                  </button>
                  <div className="name-owner-product">
                    <button className="btn-name-owner-product">Milwaukee Bucks</button>
                  </div>
                </div>
              </div>
              <div>
                <div className="btn-buy-now">Buy Now</div>
              </div>
              <div>
                <div className="box-name-collection">
                  <div className="name-collection fw-600">Chicago Deer</div>

                </div>
              </div>
              <div>
                <div className="">
                  Commemorate the Bucks Round 1 series victory over the Chicago Bulls in the 2022 NBA Playoffs with the first deer of the Fear The Deer Win Club…the Chicago Deer!
                </div>
              </div>
              <div>
                <a className="authenticity-button">
                 <img src={ic_info} style={{ marginRight:'5px' }}/> Authenticity
                </a>
              </div>
              <div>
                <div className="box-price-collection">
                  <div className="box-price-detail-collection">
                    <div className="lable-top">
                      Total Run
                    </div>
                    <div className="lable-bottom fw-600">
                      50
                    </div>
                  </div>
                  <div className="box-price-detail-collection">
                    <div className="lable-top">
                      Availability
                    </div>
                    <div className="lable-bottom fw-600">
                      0
                    </div>
                  </div>
                  <div className="box-price-detail-collection">
                    <div className="lable-top">
                      Token Type
                    </div>
                    <div className="lable-bottom fw-600">
                      erc721
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="box-purchase-price">
                  <div className="lable-top">Purchase price</div>
                  <div className="lable-bottom fw-600">$50.00</div>
                </div>
                <button className="btn-sale-collection disable">Sold out</button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="title-sale-by-Collectors fw-600">For Sale by Collectors</div>
              <div className="sub-title-sale-by-Collectors fw-600">Sold out? No problem! Check out user listings below.</div>
            </div>
            <div className="userSales">
              <div className="filter-box">
                <div className="search-box">
                  <img src={ic_search} style={{marginLeft: '20px' }}/>
                  <input className="marketplace-search-textbox" placeholder="Search listings…" />
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
                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="slide-item">
                      <Link to={'/sale'} className="button">
                        <div className="hot-ollectibles-wrapper">
                          <div className="header-left hot-ollectibles-item">
                            <span className="total-run fw-600">Total Run: 35000</span>
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
                                <div className="name-label fw-600">Elton John</div>
                              </div>
                              <div className="content-right fw-600">Buy Now</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="name-label fw-600">
                              Elton John Rocket NFT Club Pass
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-price">
                              <div className="price-header font-size-14 fw-600">Price</div>
                              <div className="current-price font-size-18 fw-600">$29.99</div>
                            </div>
                          </div>
                          <div className="hot-ollectibles-item">
                            <div className="wrapper-remaining">
                              <div className="remaining-header font-size-14 fw-600">Remaining </div>
                              <div className="quantity-remaining font-size-18 fw-600">26008</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SaleCollectiblesMb;
