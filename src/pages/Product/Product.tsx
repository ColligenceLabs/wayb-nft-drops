import React, { useEffect, useState } from 'react';
import minus from '../../assets/img/minus.png';
import plus from '../../assets/img/plus.png';
import { Link, useParams } from 'react-router-dom';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import './product-wayb.scss';
import { getMysteryBoxInfo } from '../../services/services';
import { MBoxTypes } from '../../types/MBoxTypes';
import { SUCCESS } from '../../config';
import { getNetworkNameById } from '../../utils/getNetworkNameById';
import { getPrice } from '../../utils/getPrice';
import { MBoxItemTypes } from 'types/MBoxItemTypes';
import { getRarityToString } from '../../utils/getRarityToString';

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
  const params = useParams();
  const [ipInfo, setIpInfo] = useState<MBoxTypes | null>(null);

  const fetchIpInfo = async (ipId: string) => {
    const ipInfoRes = await getMysteryBoxInfo(ipId);
    if (ipInfoRes.data.status === SUCCESS) setIpInfo(ipInfoRes.data.data);
  };

  useEffect(() => {
    if (params.ipId) fetchIpInfo(params.ipId);
  }, [params.ipId]);

  return (
    <main className="collection-container min-height-content">
      <div
        className="collection-banner-image"
        style={{
          backgroundImage: `url("${ipInfo?.mobileBanner}")`,
        }}
      ></div>
      <div className="box-collection">
        <div className="collection-details-box">
          <div className="collection-info">
            <div className="collection-info-left">
              <img
                src={ipInfo?.featured?.company.image}
                alt=""
                draggable={false}
              />
              <div className="name">
                <div className="fullname">
                  {ipInfo?.featured?.company.name.en}
                </div>
              </div>
            </div>
          </div>
          <div className="collection-info-content">
            <div>{ipInfo?.introduction.en}</div>
          </div>
        </div>
        {/*  min-height-content */}
        <div className="marketplace product">
          <div className="marketplace-collection-tittle">IP</div>
          <div className="products-items">
            {ipInfo?.mysteryboxItems &&
              ipInfo?.mysteryboxItems.map((item: MBoxItemTypes, index) => (
                <Link key={index} to={`/detail/${ipInfo.id}/${item.id}`}>
                  <div className="item_product">
                    <div className="item_product_detail_top">
                      <div className="total_item">
                        Total Run: {ipInfo.totalAmount}
                      </div>
                      <div
                        style={{ textTransform: 'capitalize' }}
                        className="chain"
                      >
                        {getNetworkNameById(ipInfo.chainId)?.toLowerCase()}
                      </div>
                    </div>
                    <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                      <div className="card-image">
                        <img src={item.itemImage} alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="info-product_item">
                      <div className="owner_product">
                        <div className="owner_product_avatar">
                          <img src={ipInfo?.featured?.company.image} alt="" />
                          <div className="name">
                            {ipInfo?.featured?.company.name.en}
                          </div>
                        </div>
                        <div className="status">Buy Now</div>
                      </div>
                      <div className="title">{item.name}</div>
                    </div>
                    <div className="remaining-price">
                      <div className="w-50 border-right">
                        <div className="remaining">Price</div>
                        <div className="remaining-total">
                          {getPrice(item?.price, ipInfo?.quote!.toUpperCase())}
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="remaining">Rarity</div>
                        <div className="remaining-total">
                          {getRarityToString(parseInt(item.rarity))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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
