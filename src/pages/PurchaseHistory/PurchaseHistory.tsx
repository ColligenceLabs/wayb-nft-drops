import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import arrow_blue from '../../assets/icon/arrow_blue.png';
import arrow_up_right from '../../assets/icon/arrow_up_right.png';

const Purchase_History = () => {
  const [sortDate, setSortDate] = useState(false);
  return (
    <main className="purchase-container min-height-content">
      <div className="purchase-history-page">
        <div className="purchase-history-header">
          <div>Purchase History</div>
        </div>
        <div className="purchase-history-body">
          <div className="purchase-history-content">
            <div className="table-row heading-row">
              <div
                className="title purchase_date"
                onClick={() => setSortDate(!sortDate)}
              >
                <div className="column-date">
                  Date
                  <div className={`arrow-date ${sortDate ? 'asc' : ''}`}>
                    <img src={arrow_blue} alt="arrow blue" />
                  </div>
                </div>
              </div>
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
                  It&apos;s a race to the finish!
                </Link>
              </div>
              <div className="value amount">$8.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">0xF3...0B20</div>
              <div className="icon value">
                <a href="#">
                  <div className="arrow-up-right">
                    <img src={arrow_up_right} alt="arrow up right" />
                  </div>
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
                  Strawberry Shortcake
                </Link>
              </div>
              <div className="value amount">$1.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">48...48</div>
              <div className="icon value">
                <a href="#">
                  <div className="arrow-up-right">
                    <img src={arrow_up_right} alt="arrow up right" />
                  </div>
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
                  Let&apos;s ketchup some time!
                </Link>
              </div>
              <div className="value amount">$19.99</div>
              <div className="value blockchain">Polygon</div>
              <div className="value explorer_url">5V...0G8V</div>
              <div className="icon value">
                <a href="#">
                  <div className="arrow-up-right">
                    <img src={arrow_up_right} alt="arrow up right" />
                  </div>
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
