import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import arrow_blue from '../../assets/icon/arrow_blue.png';
import arrow_up_right from '../../assets/icon/arrow_up_right.png';
import { useSelector } from 'react-redux';
import { getFeaturedById, getHistory } from '../../services/services';
import { splitString } from '../../utils/splitString';
import { moveToScope } from '../../utils/moveToScope';

const Purchase_History = () => {
  const navigate = useNavigate();
  const [sortDate, setSortDate] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const { klaytn, binance } = useSelector((state: any) => state.wallet);

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  const moveToUrl = (item: any) => {
    console.log(item);
    let url;
    if (item.mysteryboxInfo.isCollection) {
      console.log('collection');
      url = `/klaytn/collection/${item.mysteryBoxId}/${item.itemId}`;
    } else {
      if (item.mysteryboxInfo.isAirdrop) {
        console.log('airdrop');
        url = `/klaytn/mbox/${item.mysteryboxInfo.id}`;
      } else {
        console.log('mbox');
        url = `/klaytn/mbox/${item.mysteryboxInfo.id}`;
      }
    }

    navigate(url);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      let drops: React.SetStateAction<any[]> = [];
      if (klaytn?.address) {
        const res = await getHistory(klaytn?.address);
        if (res.status === 200) {
          drops = drops.concat(res.data.data.drops);
        }
      }
      if (binance?.address) {
        const res = await getHistory(binance?.address);
        if (res.status === 200) {
          drops = drops.concat(res.data.data.drops);
        }
      }
      console.log(drops);
      setHistory(drops);
    };

    fetchHistory();
  }, [klaytn, binance]);

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
          {history &&
            history.map((drop: any) => {
              return (
                <div key={drop.id} className="purchase-history-content">
                  <div className="table-row">
                    <div className="value purchase_date">
                      {toStringByFormatting(new Date(drop.createdAt))}
                    </div>
                    <div className="value payment_type">Crypto</div>
                    <div className="value nft">
                      <div
                        className="campaign_name"
                        onClick={() => moveToUrl(drop)}
                      >
                        {drop.mysteryboxInfo.title.en}
                      </div>
                      {/*<Link to="/series" className="name">*/}
                      {/*  It&apos;s a race to the finish!*/}
                      {/*</Link>*/}
                    </div>
                    <div className="value amount">
                      {drop.price ?? '0'} {drop.mysteryboxInfo.quote}
                    </div>
                    <div className="value blockchain">
                      {drop.mysteryboxInfo.chainId === 1001 ||
                      drop.mysteryboxInfo.chainId === 8217
                        ? 'Klaytn'
                        : 'Binance'}
                    </div>
                    <div className="value explorer_url">
                      {drop.txHash ? splitString(drop.txHash) : ''}
                    </div>
                    <div className="icon value">
                      <a href="#">
                        <div
                          className="arrow-up-right"
                          onClick={() => {
                            if (drop.txHash)
                              moveToScope(
                                drop.mysteryboxInfo.chainId,
                                drop.txHash
                              );
                          }}
                        >
                          <img src={arrow_up_right} alt="arrow up right" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};
export default Purchase_History;
