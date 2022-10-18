import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { useWeb3React } from '@web3-react/core';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import CollectionSaleItems from './CollectionSaleItems';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

const CollectionSale = () => {
  const params = useParams();
  const location = useLocation();
  const { account, library } = useWeb3React();
  const [mBoxInfo, setMBoxInfo] = useState<ExMBoxType | null>(null);
  const [mBoxItemList, setMBoxItemList] = useState<MBoxItemTypes[]>([]);

  useEffect(() => {
    // const fetchMboxItemList = async () => {
    //   const res = await getMboxItemListMboxId(location.state.item.id);
    //   if (res.status === 200) {
    //     if (res.data.list) {
    //       const newList = await Promise.all(
    //         res.data.list.map(async (item: MBoxTypes, index: number) => {
    //           let remaining = null;
    //           if (library && library.connection)
    //             remaining = await getItemAmount(
    //               location.state.item.boxContractAddress,
    //               index,
    //               item?.isCollection === true ? 2 : 1, // 1 = MysteryBox, 2 = Collection
    //               account,
    //               library
    //             );
    //
    //           return { ...item, remainingAmount: remaining };
    //         })
    //       );
    //       setMBoxItemList(newList);
    //     }
    //   }
    // };

    if (location.state.item && library && library.connection) {
      setMBoxInfo(location.state.item);
      // fetchMboxItemList();
    }
  }, [location, library]);

  return (
    <main className="collection-container min-height-content">
      <>
        <div
          className="collection-banner-image"
          style={{
            backgroundImage: `url("${mBoxInfo?.bannerImage}")`,
          }}
        ></div>
        <div className="box-collection">
          <div className="collection-details-box">
            <div className="collection-info">
              <div className="collection-info-left">
                <img src={mBoxInfo?.packageImage} alt="" draggable={false} />
                <div className="name">
                  <div className="fullname">{mBoxInfo?.title.en}</div>
                  <div className="username">{mBoxInfo?.companyName}</div>
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
              <div>{mBoxInfo?.introduction.en}</div>
            </div>
          </div>
          <CollectionSaleItems
            collectionId={params.id}
            companyLogo={mBoxInfo?.companyLogo}
            companyName={mBoxInfo?.companyName}
            quote={mBoxInfo?.quote}
          />
        </div>
      </>
    </main>
  );
};

export default CollectionSale;
