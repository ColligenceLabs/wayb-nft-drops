import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { useWeb3React } from '@web3-react/core';
import CollectionSaleItems from './CollectionSaleItems';
import { getCollectionInfo } from '../../services/services';
import { SUCCESS } from '../../config';
import { useMediaQuery } from 'react-responsive';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
  featured: {
    company: {
      image: string;
      name: {
        ko: string;
        en: string;
      };
    };
  };
};

const CollectionSale = () => {
  const params = useParams();
  const { library } = useWeb3React();
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });

  const [collectionInfo, setCollectionInfo] = useState<ExMBoxType | null>(null);

  const fetchCollectionInfo = async () => {
    const res = await getCollectionInfo(params.id!);
    if (res.data.status === SUCCESS) {
      setCollectionInfo(res.data.data);
    }
  };
  // useEffect(() => {
  //   fetchCollectionInfo();
  //   console.log(params);
  //   console.log(location.state.item);
  //   if (location.state.item && library && library.connection) {
  //     setCollectionInfo(location.state.item);
  //   }
  // }, [location, library]);

  useEffect(() => {
    fetchCollectionInfo();
  }, [library]);

  return (
    <main className="collection-container min-height-content">
      {collectionInfo && (
        <>
          <div
            className="collection-banner-image"
            style={{
              backgroundImage: `url("${
                isMobile && collectionInfo?.mobileBanner
                  ? collectionInfo?.mobileBanner
                  : collectionInfo?.bannerImage
              }")`,
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
                      {collectionInfo?.featured.company.name.en}
                    </div>
                  </div>
                </div>
                <div className="collection-info-right">
                  <div className="collection-info-right-details">
                    <div className="value">{collectionInfo?.totalAmount}</div>
                    <div className="label">NFTs</div>
                  </div>
                  {/* TODO : SNS icons */}
                  {/*<div className="collection-info-right-details">*/}
                  {/*  <div className="value">723</div>*/}
                  {/*  <div className="label">Followers</div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="collection-info-content">
                <div>{collectionInfo?.introduction.en}</div>
              </div>
            </div>
            <CollectionSaleItems
              collectionId={params.id}
              collectionInfo={collectionInfo}
              companyLogo={collectionInfo?.featured.company.image}
              companyName={collectionInfo?.featured.company.name.en}
              quote={collectionInfo?.quote}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default CollectionSale;
