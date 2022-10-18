import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMboxItemListMboxId } from '../../services/services';
import { MBoxTypes } from '../../types/MBoxTypes';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import { getItemRemains } from 'utils/transactions';

type CollectionItemType = MBoxItemTypes & {
  remainingAmount: number;
  price: number;
};

type CollectionListProps = {
  collectionId: string | undefined;
  companyLogo: string | undefined;
  companyName: string | undefined;
  quote: string | null | undefined;
};

const CollectionSaleItems: React.FC<CollectionListProps> = ({
  collectionId,
  companyLogo,
  companyName,
  quote,
}) => {
  const { account, library, activate } = useActiveWeb3React();
  const [collectionItemList, setCollectionItemList] = useState<
    CollectionItemType[]
  >([]);

  useEffect(() => {
    const fetchMBoxList = async () => {
      if (collectionId) {
        const res = await getMboxItemListMboxId(collectionId.toString());

        if (res.data.list && library && library.connection) {
          const newList = await Promise.all(
            res.data.list.map(async (item: MBoxTypes) => {
              // console.log(item);
              // let remaining = null;
              // if (library && library.connection)
              //   remaining = await getItemRemains(
              //     item.boxContractAddress,
              //     account,
              //     library
              //   );

              return { ...item, remainingAmount: '연동필요' };
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
              to={`/collection-sale/sale/${item.id}`}
              state={{ item: { ...item, companyLogo, companyName, quote } }}
              key={index}
            >
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">Total Run: {'1'}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card">
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
                    <Link to="/sale">
                      <div className="status ">Buy Now</div>
                    </Link>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">{item.name}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">{`${
                      item.price ? item.price.toLocaleString() : '-'
                    } ${quote}`}</div>
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
