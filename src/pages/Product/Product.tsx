import React, { useEffect, useState } from 'react';
import website_icon from '../../assets/icon/website_icon.svg';
import icon_discord from '../../assets/img/icon_discord.png';
import icon_instagram from '../../assets/img/icon_instagram.png';
import icon_twitter from '../../assets/img/icon_twitter.png';
import icon_share from '../../assets/img/icon_share.png';
import product from '../../assets/img/product.png';
import productDemo from '../../assets/img/productDemo.png';
import avatar from '../../assets/img/avatar.png';
import img17 from '../../assets/img/image17.png';
import img18 from '../../assets/img/image18.png';
import minus from '../../assets/img/minus.png';
import plus from '../../assets/img/plus.png';
import { Link, useParams } from 'react-router-dom';
import etherscan_logo from '../../assets/img/etherscan_logo.png';

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
            <div className="collection-info-right social-network">
              <img src={etherscan_logo} />
              <img src={website_icon} />
              <img src={icon_discord} />
              <img src={icon_instagram} />
              <img src={icon_twitter} />
            </div>
          </div>
          <div className="collection-info-content">
            <div>{ipInfo?.introduction.en}</div>
          </div>
        </div>
        {/*  min-height-content */}
        <div className="marketplace product">
          <div>Static contents area</div>
          <div>Static contents area</div>
          <div>Static contents area</div>
          {/* <div style={{ paddingTop: '30px' }}>
            <img src={img17} style={{ width: '100%' }} />
          </div>
          <div style={{ paddingTop: '30px' }}>
            <img src={img18} style={{ width: '100%' }} />
          </div> */}
        </div>
        <div className="info-product">
          {' '}
          <div className="info-product-left">
            <img
              src={productDemo}
              alt=""
              draggable={false}
              className="img-left "
            />
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
      </div>
      <div className="bg"></div>
    </main>
  );
}
