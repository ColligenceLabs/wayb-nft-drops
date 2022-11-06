import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMboxItemListMboxId } from '../../services/services';
import { MBoxTypes } from '../../types/MBoxTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import {
  getItemAmount,
  getItemAmountNoSigner,
  getItemRemains,
} from 'utils/transactions';
import { getPrice } from '../../utils/getPrice';

type CollectionItemType = MBoxItemTypes & {
  remainingAmount: number;
  price: number;
  onsale: boolean;
};

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

type CollectionListProps = {
  collectionId: string | undefined;
  collectionInfo: ExMBoxType | null;
  companyLogo: string | undefined;
  companyName: string | undefined;
  quote: string | null | undefined;
};

const CollectionSaleItems: React.FC<CollectionListProps> = ({
  collectionId,
  collectionInfo,
  companyLogo,
  companyName,
  quote,
}) => {
  const params = useParams();

  const { account, library, activate, chainId } = useActiveWeb3React();
  const [collectionItemList, setCollectionItemList] = useState<
    CollectionItemType[]
  >([]);

  useEffect(() => {
    const fetchMBoxList = async () => {
      if (collectionId) {
        const res = await getMboxItemListMboxId(collectionId.toString());

        if (res.data.list && library && library.connection) {
          const newList = await Promise.all(
            res.data.list.map(async (item: MBoxTypes, index: number) => {
              // let remaining = null;
              // if (library && library.connection)
              //   remaining = await getItemAmount(
              const remaining = await getItemAmountNoSigner(
                collectionInfo?.boxContractAddress,
                index,
                2, // 1 = MysteryBox, 2 = Collection
                account,
                // library
                chainId
              );

              return {
                ...item,
                remainingAmount: remaining,
                index,
                collectionInfo: collectionInfo,
              };
            })
          );
          setCollectionItemList(newList);
        }
      }
    };

    fetchMBoxList();
  }, [library]);

  return (
    <div className="marketplace min-height-content">
      <div className="marketplace-collection-tittle">Featured Collectibles</div>
      <div className="marketplace-items">
        {collectionItemList.map((item, index) => {
          return (
            <Link
              to={`/klaytn/collection/${params.id}/${item.id}`}
              // state={{ item: { ...item, companyLogo, companyName, quote } }}
              key={index}
            >
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Items: {'1a'}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    <img src={item.itemImage} alt="" />
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <span className="owner_product_avatar">
                        <img src={companyLogo} alt="" />
                      </span>
                      <p className="">{companyName}</p>
                    </div>
                    <div>
                      <Link
                        to={`/klaytn/collection/${params.id}/${item.id}`}
                        // state={{
                        //   item: { ...item, companyLogo, companyName, quote },
                        // }}
                      >
                        <div className="status ">
                          {item.onsale ? 'Buy Now' : 'Waiting'}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">{item.name}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">
                      {getPrice(item.price, quote!)}
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining ">Remaining</div>
                    <div className="remaining-total ">
                      {item.remainingAmount}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionSaleItems;
