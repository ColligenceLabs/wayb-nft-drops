import React from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
import home_11 from '../../assets/img/home_11.png';

const PaymentWalletsSuccess = ({ show, onHide }) => {
  return (
    <ReactModal
      preventScroll={true}
      isOpen={show}
      contentLabel="onRequestClose Example"
      onRequestClose={onHide}
      className="Modal"
      overlayClassName="payments-wallets-overlay"
      shouldCloseOnOverlayClick
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-tittle">
              <div>
                <div className="title">Sweet!</div>

                <div className="sub-title">Your purchase was successful.</div>
              </div>
            </div>
            <button
              type="button"
              className="close-button button"
              onClick={onHide}
            >
              <img src={close_icon} alt="" />
            </button>
          </div>
          <div className="modal-body">
            <div className="payment-modal-success-box">
              <img src={home_11} alt="" />
            </div>
            <div className="content-payment-modal-success">
              <div className="tittle">Strawberry Shortcake Space Creampop </div>
              <div className="content">
                Congratulations, your token purchase is in progress, It could
                take up to ten minutes to verify your transaction and transfer
                the token to your wallet.
              </div>
            </div>
            <button type="submit" className="payments-btn-submit fw-600">
              Got It!
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default PaymentWalletsSuccess;
