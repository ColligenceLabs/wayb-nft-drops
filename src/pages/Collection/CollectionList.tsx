import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getMboxListByFeaturedId } from '../../services/services';
import { getItemRemains } from 'utils/transactions';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

type CollectionListProps = {
  featuredId: string | null;
  companyLogo: string;
  companyName: string;
};

type ExMBoxType = MBoxTypes & {
  remainingAmount: number;
};

const CollectionList: React.FC<CollectionListProps> = ({
  featuredId,
  companyLogo,
  companyName,
}) => {
  const { account, library, activate } = useActiveWeb3React();
  const [mBoxList, setMBoxList] = useState<ExMBoxType[]>([]);

  useEffect(() => {
    const fetchMBoxList = async () => {
      if (featuredId) {
        const res = await getMboxListByFeaturedId(featuredId);

        if (res.status === 200) {
          if (res.data.list && library && library.connection) {
            const newList = await Promise.all(
              res.data.list.map(async (item: MBoxTypes) => {
                let remaining = null;
                if (library && library.connection)
                  remaining = await getItemRemains(
                    item.boxContractAddress,
                    account,
                    library
                  );

                return { ...item, remainingAmount: remaining };
              })
            );
            setMBoxList(newList);
          }
        }
      }
    };

    fetchMBoxList();
  }, [library]);

  return (
    <div className="marketplace min-height-content">
      <div className="marketplace-collection-tittle">Featured Collectibles</div>
      <div className="marketplace-items">
        {mBoxList.map((item, index) => {
          return (
            <Link
              to={item.isCollection ? '' : `/sale/${item.id}`}
              state={{ item: { ...item, companyLogo, companyName } }}
              key={index}
            >
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">
                    Total Run: {item.totalAmount}
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div>erc721</div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card">
                    <img src={item.packageImage} alt="" />
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
                  <div className="product_name ">{item.title.en}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">{`${
                      item.price ? item.price.toLocaleString() : '-'
                    } ${item.quote}`}</div>
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

export default CollectionList;
