import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
const PaymentWallets = ({ show, onHide, openPaymentWalletsSuccess }) => {
  const [isModalOpenSuccess, setModalOpenSuccess] = useState(false);
  const ref = useRef();

  const useOnClickOutsideSuccess = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  };

  useOnClickOutsideSuccess(ref, () => setModalOpenSuccess(false));
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
                <div className="title">How would you like to pay?</div>

                <div className="sub-title">
                  Please choose one of the payment methods below.
                </div>
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
            <div className="payment-modal-box">
              <div className="credit-card-button abc">
                <label className="payid-stripe">
                  <img src={pay_creditcard} alt="" />
                </label>
              </div>
              <div className="crypto-button abc">
                <label className="payid-coinbase">
                  <img src={pay_crypto} alt="" />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="payments-btn-submit fw-600"
              onClick={() => {
                openPaymentWalletsSuccess();
                onHide();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default PaymentWallets;
