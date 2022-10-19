import React from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
import home_12 from '../../assets/img/home_12.png';

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
          <div className="modal-dialog modal-dialog-pay-success">
            <div className="header">
              <div className="title">Great!</div>
              <div className="close-button" onClick={onHide}>
                <img src={close_icon} alt="icon close" />
              </div>
            </div>
            <div className="line"></div>
            <div className="grid-content">
              <div className="grid-item sub-title">
                Your purchase was successfull.
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
                Congratulations, your token purchase is in progress. It could
                take up to ten minutes to verify your transaction anh transfer
                the token to your wallet.
              </div>
              <button
                className="grid-item button button-got-it"
                onClick={onHide}
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
