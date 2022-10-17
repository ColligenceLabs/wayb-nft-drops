import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import product from '../../assets/img/product.png';
import avatar from '../../assets/img/avatar.png';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getMboxListByFeaturedId } from '../../services/services';
import { getItemAmounts } from 'utils/transactions';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

type CollectionListProps = {
  featuredId: string | null;
  companyLogo: string;
  companyName: string;
};

type ExMBoxType = MBoxTypes & {
  remainingAmount: number;
};

const list_products = [
  {
    id: 1,
    owner_name: 'Milwaukee Bucks 1',
    name: 'Chicago Deer 1',
  },
  {
    id: 2,
    owner_name: 'Milwaukee Bucks 2',
    name: 'Chicago Deer 2',
  },
  {
    id: 3,
    owner_name: 'Milwaukee Bucks 3',
    name: 'Chicago Deer 3',
  },
  {
    id: 4,
    owner_name: 'Milwaukee Bucks 4',
    name: 'Chicago Deer 4',
  },
  {
    id: 5,
    owner_name: 'Milwaukee Bucks 5',
    name: 'Chicago Deer 5',
  },
  {
    id: 6,
    owner_name: 'Milwaukee Bucks 6',
    name: 'Chicago Deer 6',
  },
  {
    id: 7,
    owner_name: 'Milwaukee Bucks 7',
    name: 'Chicago Deer 7',
  },
  {
    id: 8,
    owner_name: 'Milwaukee Bucks 8',
    name: 'Chicago Deer 8',
  },
  {
    id: 9,
    owner_name: 'Milwaukee Bucks 9',
    name: 'Chicago Deer 9',
  },
];

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
          if (res.data.list && library.connection) {
            const newList = await Promise.all(
              res.data.list.map(async (item: MBoxTypes) => {
                const remaining = await getItemAmounts(
                  item.boxContractAddress,
                  account,
                  library
                );
                return { ...item, remainingAmount: 2 };
              })
            );
            setMBoxList(newList);
          }
          // setMBoxList(res.data.list);
        }
      }
    };

    fetchMBoxList();
  }, []);

  return (
    <div className="marketplace min-height-content">
      <div className="marketplace-collection-tittle">Featured Collectibles</div>
      <div className="marketplace-items">
        {mBoxList.map((item, index) => {
          return (
            <Link
              to={`/sale/${item.id}`}
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
                    <div className="remaining-total ">0</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {/*{list_products.map((item, index) => {*/}
        {/*  return (*/}
        {/*    <Link to={`/sale/${index}`} key={index}>*/}
        {/*      <div className="item_product">*/}
        {/*        <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">*/}
        {/*          <div className="total_item">Total Run: 50</div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">*/}
        {/*          <div>erc721</div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">*/}
        {/*          <div className="card">*/}
        {/*            <img src={product} alt="" />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">*/}
        {/*          <div className="owner_product">*/}
        {/*            <div className="owner_product_box">*/}
        {/*              <span className="owner_product_avatar">*/}
        {/*                <img src={avatar} alt="" />*/}
        {/*              </span>*/}
        {/*              <p className="">{item.owner_name}</p>*/}
        {/*            </div>*/}
        {/*            <Link to="/sale">*/}
        {/*              <div className="status ">Buy Now</div>*/}
        {/*            </Link>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_NAME_KEY">*/}
        {/*          <div className="product_name ">{item.name}</div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_BID_KEY">*/}
        {/*          <div className="box-price">*/}
        {/*            <div className="price ">Price</div>*/}
        {/*            <div className="currency ">$50.00</div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="item_product_detail MARKETPLACE_NAME_TIME">*/}
        {/*          <div>*/}
        {/*            <div className="remaining ">Remaining</div>*/}
        {/*            <div className="remaining-total ">0</div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*  );*/}
        {/*})}*/}
      </div>
    </div>
  );
};

export default CollectionList;
