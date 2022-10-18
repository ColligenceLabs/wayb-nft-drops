import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { useWeb3React } from '@web3-react/core';
import CollectionSaleItems from './CollectionSaleItems';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

const CollectionSale = () => {
  const params = useParams();
  const location = useLocation();
  const { account, library } = useWeb3React();
  const [collectionInfo, setCollectionInfo] = useState<ExMBoxType | null>(null);

  useEffect(() => {
    if (location.state.item && library && library.connection) {
      setCollectionInfo(location.state.item);
    }
  }, [location, library]);

  return (
    <main className="collection-container min-height-content">
      {collectionInfo && (
        <>
          <div
            className="collection-banner-image"
            style={{
              backgroundImage: `url("${collectionInfo?.bannerImage}")`,
            }}
          ></div>
          <div className="box-collection">
            <div className="collection-details-box">
              <div className="collection-info">
                <div className="collection-info-left">
                  <img
                    src={collectionInfo?.packageImage}
                    alt=""
                    draggable={false}
                  />
                  <div className="name">
                    <div className="fullname">{collectionInfo?.title.en}</div>
                    <div className="username">
                      {collectionInfo?.companyName}
                    </div>
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
                <div>{collectionInfo?.introduction.en}</div>
              </div>
            </div>
            <CollectionSaleItems
              collectionId={params.id}
              collectionInfo={collectionInfo}
              companyLogo={collectionInfo?.companyLogo}
              companyName={collectionInfo?.companyName}
              quote={collectionInfo?.quote}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default CollectionSale;
