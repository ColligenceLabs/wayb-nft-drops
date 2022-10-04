import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Purchase_History = () => {
  return (
    <main className="purchase-container">
      <div className="purchase-history-page">
        <div className="purchase-history-header">
          <h1>Purchase History</h1>
        </div>
        <div className="purchase-history-body">
          <div className="purchase-history-content">
            <div className="table-row heading-row">
              <div className="title purchase_date">Date</div>
              <div className="title payment_type">Type</div>
              <div className="title name">NFT</div>
              <div className="title amount">Price</div>
              <div className="title blockchain">BlockChain</div>
              <div className="title explorer_url">Confirmation</div>
              <div className="icon value"></div>
            </div>
          </div>
          <div className="purchase-history-content">
            <div className="table-row">
              <div className="value purchase_date">Sep 2 ,2022</div>
              <div className="value payment_type">Web Purchase</div>
              <div className="value nft">
                <a className="campaign_name" href="#">
                  Racecarpop 4
                </a>
                <Link to="/series" className="name">
                  It&apos;s a race to the finish! This Pop is raring to go
                  fourth.
                </Link>
              </div>
              <div className="value amount">$8.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">0xF3...0B20</div>
              <div className="icon value">
                <a href="#">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"
                      fill="black"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="purchase-history-content">
            <div className="table-row">
              <div className="value purchase_date">Sep 2 ,2022</div>
              <div className="value payment_type">Web Purchase</div>
              <div className="value nft">
                <a className="campaign_name" href="#">
                  Be Rewarded !
                </a>
                <Link to="/series" className="name">
                  Strawberry Shortcake Space Creampop # 49
                </Link>
              </div>
              <div className="value amount">$1.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">48...48</div>
              <div className="icon value">
                <a href="#">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"
                      fill="black"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="purchase-history-content">
            <div className="table-row">
              <div className="value purchase_date">Sep 2 ,2022</div>
              <div className="value payment_type">Web Purchase</div>
              <div className="value nft">
                <a className="campaign_name" href="#">
                  Ketchupop!
                </a>
                <Link to="/series" className="name">
                  Let&apos;s ketchup some time! It&apos;s been too long...
                </Link>
              </div>
              <div className="value amount">$19.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">5V...0G8V</div>
              <div className="icon value">
                <a href="#">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"
                      fill="black"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Purchase_History;
