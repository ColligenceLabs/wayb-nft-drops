import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
import pay_appstore from '../../assets/img/pay_appstore.png';
import pay_googleplay from '../../assets/img/pay_googleplay.png';

type PaymentWalletsProps = {
  show: any;
  onHide: any;
  openPaymentWalletsSuccess: any;
};
const PaymentWallets: React.FC<PaymentWalletsProps> = ({
  show,
  onHide,
  openPaymentWalletsSuccess,
}) => {
  const [isModalOpenSuccess, setModalOpenSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<number>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const ref = useRef();

  const useOnClickOutsideSuccess = (ref: any, handler: any) => {
    useEffect(() => {
      const listener = (event: any) => {
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
      <div className="modal-dialog">
        <div className="header">
          <div className="title">How would you like to pay</div>
          <div className="close-button" onClick={onHide}>
            <img src={close_icon} alt="icon close" />
          </div>
        </div>
        <div className="line"></div>
        <div className="sub-title">
          Please choose one of the payment methods below.
        </div>
        <div className="grid-payments">
          <div
            className={`payment-box ${selectedPayment === 1 ? 'active' : ''}`}
            onClick={() => {
              setSelectedPayment(1);
              setIsDisabled(false);
            }}
          >
            <div className="pay-item">
              <img src={pay_creditcard} alt="Credit Card" />
            </div>
            <div className="pay-name">Credit Card</div>
          </div>
          <div
            className={`payment-box ${selectedPayment === 2 ? 'active' : ''}`}
            onClick={() => {
              setSelectedPayment(2);
              setIsDisabled(false);
            }}
          >
            <div className="pay-item">
              <img src={pay_crypto} alt="Crypto" />
            </div>
            <div className="pay-name">Crypto</div>
          </div>
          <div
            className={`payment-box ${selectedPayment === 3 ? 'active' : ''}`}
            onClick={() => {
              setSelectedPayment(3);
              setIsDisabled(false);
            }}
          >
            <div className="pay-item">
              <img src={pay_appstore} alt="App Store" />
            </div>
            <div className="pay-name">App Store</div>
          </div>
          <div
            className={`payment-box ${selectedPayment === 4 ? 'active' : ''}`}
            onClick={() => {
              setSelectedPayment(4);
              setIsDisabled(false);
            }}
          >
            <div className="pay-item">
              <img src={pay_googleplay} alt="Google Play" />
            </div>
            <div className="pay-name">Google Play</div>
          </div>
        </div>
        <div className="custom-submit">
          <button
            disabled={isDisabled}
            type="submit"
            className="payments-btn-submit button fw-600"
            onClick={() => {
              openPaymentWalletsSuccess();
              onHide();
            }}
          >
            Continue
          </button>
        </div>

        {/* <div className="modal-content">
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
        </div> */}
      </div>
    </ReactModal>
  );
};

export default PaymentWallets;
