import React from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
import home_12 from '../../assets/img/home_12.png';
import { Link, useNavigate } from 'react-router-dom';

type PaymentWalletsSuccessProps = {
  show: any;
  onHide: any;
  itemInfo: any;
  isCollection: boolean;
};
const PaymentWalletsSuccess: React.FC<PaymentWalletsSuccessProps> = ({
  itemInfo,
  show,
  onHide,
  isCollection,
}) => {
  const navigate = useNavigate();
  const moveToUrl = () => {
    let stateDate;
    if (isCollection) {
      if (itemInfo.collectionInfo.isAirdrop) {
        stateDate = {
          ...itemInfo.collectionInfo,
          companyimage: itemInfo.companyLogo,
          companyname: { en: itemInfo.companyName, ko: '' },
        };
      } else {
        stateDate = {
          ...itemInfo.collectionInfo,
          companyimage: itemInfo.companyLogo,
          companyname: { en: itemInfo.companyName, ko: '' },
        };
      }
    } else {
      stateDate = {
        ...itemInfo,
        companyimage: itemInfo.featured.company.image,
        companyname: itemInfo.featured.company.name,
      };
    }
    navigate('/my-collectibles/details', {
      state: {
        item: {
          ...stateDate,
        },
      },
    });
  };
  return (
    <>
      {itemInfo && (
        <ReactModal
          preventScroll={true}
          isOpen={show}
          contentLabel="onRequestClose Example"
          onRequestClose={onHide}
          className="Modal"
          overlayClassName="payments-wallets-overlay"
          shouldCloseOnOverlayClick
        >
          <div className="modal-dialog-payment modal-dialog-pay-success">
            <div className="header">
              <div className="title">NFT Drop was successful.</div>
              <div className="close-button" onClick={onHide}>
                <img src={close_icon} alt="icon close" />
              </div>
            </div>
            <div className="line"></div>
            <div className="grid-content">
              <div className="grid-item sub-title">
                You got this NFT successfully.
              </div>
              <div className="grid-item image-success">
                <img
                  src={
                    isCollection ? itemInfo.itemImage : itemInfo.packageImage
                  }
                  alt="image success"
                />
              </div>
              <div className="grid-item title-image">
                {isCollection ? itemInfo.name : itemInfo.title.en}
              </div>
              <div className="grid-item sub-image">
                Congratulations. NFT Drop was successful. It may take up to 10
                minutes to confirm the transaction and transfer the NFT to your
                wallet.{' '}
                {itemInfo.isCollection === false
                  ? 'Mystery Box requires Reveal. Launch Reveal from the My Collection menu.'
                  : ''}
              </div>

              <button
                className="grid-item button button-got-it"
                onClick={moveToUrl}
              >
                Got it!
              </button>
            </div>
          </div>
        </ReactModal>
      )}
    </>
  );
};

export default PaymentWalletsSuccess;
