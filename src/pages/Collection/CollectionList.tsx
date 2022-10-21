import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getMboxListByFeaturedId } from '../../services/services';
import { getItemRemains, getItemRemainsNoSigner } from 'utils/transactions';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import CSnackbar from '../../components/common/CSnackbar';

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
  const { account, library, activate, chainId } = useActiveWeb3React();
  const [mBoxList, setMBoxList] = useState<ExMBoxType[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };

  useEffect(() => {
    const fetchMBoxList = async () => {
      if (featuredId) {
        const res = await getMboxListByFeaturedId(featuredId);

        if (res.status === 200) {
          // TODO : Show list also when a wallet is not collected.
          // if (res.data.list && library && library.connection) {
          //   const newList = await Promise.all(
          //     res.data.list.map(async (item: MBoxTypes) => {
          //       let remaining = null;
          //       if (library && library.connection)
          //         remaining = await getItemRemains(
          //           item.boxContractAddress,
          //           account,
          //           library
          //         );
          //
          //       return { ...item, remainingAmount: remaining };
          //     })
          //   );
          //   setMBoxList(newList);
          // } else {
          //   console.log('!!! Connect Wallet is needed... !!!');
          //   setOpenSnackbar({
          //     open: true,
          //     type: 'error',
          //     message:
          //       '지갑 연결이 필요합니다! 데이터가 표시되지 않을 수 있습니다.',
          //   });
          // }
          const newList = await Promise.all(
            res.data.list.map(async (item: MBoxTypes) => {
              const remaining = await getItemRemainsNoSigner(
                item.boxContractAddress,
                account,
                chainId
              );

              return { ...item, remainingAmount: remaining };
            })
          );
          setMBoxList(newList);
        }
      }
    };

    fetchMBoxList();
  }, [library]);

  return (
    <div className="marketplace min-height-content">
      <div className="marketplace-collection-tittle">Featured Collectibles</div>
      <div className="marketplace-items">
        {mBoxList.map((item: any, index) => {
          return (
            <Link
              to={
                item.isCollection
                  ? item.itemAmount === 1 && item.mysteryboxItems
                    ? `/collection-sale/sale/${item.mysteryboxItems[0]?.id}`
                    : `/collection-sale/${item.id}`
                  : `/sale/${item.id}`
              }
              state={
                item.isCollection && item.itemAmount === 1
                  ? {
                      item: {
                        collectionInfo: item,
                        ...item.mysteryboxItems[0],
                        companyLogo,
                        companyName,
                        quote: item.quote,
                      },
                    }
                  : { item: { ...item, companyLogo, companyName } }
              }
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
      <CSnackbar
        open={openSnackbar.open}
        type={openSnackbar.type}
        message={openSnackbar.message}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default CollectionList;
