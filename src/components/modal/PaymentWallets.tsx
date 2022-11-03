import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import close_icon from '../../assets/icon/close_icon.svg';
import pay_creditcard from '../../assets/img/pay-creditcard.png';
import pay_creditcard_gray from '../../assets/img/pay-creditcard-gray.png';
import pay_crypto from '../../assets/img/pay-crypto.png';
import pay_appstore from '../../assets/img/pay_appstore.png';
import pay_googleplay from '../../assets/img/pay_googleplay.png';
import { MBoxItemTypes } from '../../types/MBoxItemTypes';
import { MBoxTypes } from '../../types/MBoxTypes';
import { parseEther } from 'ethers/lib/utils';
import contracts from '../../config/constants/contracts';
import { buyItem } from '../../utils/transactions';
import { SUCCESS, targetNetwork } from '../../config';
import { registerBuy } from '../../services/services';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { CircularProgress, Typography } from '@mui/material';
import { checkConnectWallet } from '../../utils/wallet';
import {
  buyKey,
  claimAirDrop,
  getKeyRemains,
} from '../../utils/marketTransactions';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

type ExMBoxType = MBoxTypes & {
  companyLogo: string;
  companyName: string;
};

type ExMBoxItemTypes = MBoxItemTypes & {
  collectionInfo: any;
  companyLogo: string;
  companyName: string;
  price: number;
  quote: string;
  index: number;
};

type PaymentWalletsProps = {
  show: any;
  onHide: any;
  openPaymentWalletsSuccess: any;
  itemInfo: any;
  isCollection: boolean;
};
const PaymentWallets: React.FC<PaymentWalletsProps> = ({
  show,
  onHide,
  openPaymentWalletsSuccess,
  itemInfo,
  isCollection,
}) => {
  const { account, library, chainId, activate } = useActiveWeb3React();
  const wallet = useSelector((state: any) => state.wallet);
  const [isModalOpenSuccess, setModalOpenSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<number>(0);
  const [remains, setRemains] = useState(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isBuying, setIsBuying] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [buyItemInfo, setBuyItemInfo] = useState<
    ExMBoxItemTypes | ExMBoxType | null
  >(null);
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

  const handleClickBuy = async () => {
    setIsBuying(true);
    let result = false;
    console.log(selectedPayment);
    if (selectedPayment === 1) {
      console.log('purchase with credit card');
    } else if (selectedPayment === 2) {
      console.log('purchase with crypto');
      result = await handleClickCrypto();
    } else if (selectedPayment === 3) {
      console.log('purchase with app store');
    } else {
      console.log('purchase with google');
    }
    setIsBuying(false);

    if (result) {
      openPaymentWalletsSuccess();
      onHide();
    }
  };

  const handleClickCrypto = async () => {
    console.log(isCollection);
    console.log('itemInfo:', itemInfo);
    if (isCollection) {
      if (!itemInfo.collectionInfo.isAirdrop) {
        // Collection
        console.log('buy');
        console.log(itemInfo);
        const contract = itemInfo?.collectionInfo?.boxContractAddress;
        const quote = itemInfo?.collectionInfo?.quote;
        const index = itemInfo?.index ?? 0;
        const amount = 1;
        const payment = parseEther(itemInfo?.price.toString() ?? '0').mul(
          amount
        );
        console.log(
          contract,
          index,
          1,
          payment,
          quote === 'klay' ? contracts.klay[chainId] : contracts.wklay[chainId]
        );
        const result = await buyItem(
          contract,
          index,
          1,
          payment.toString(),
          quote === 'klay' ? contracts.klay[chainId] : contracts.wklay[chainId],
          account,
          library
        );
        if (result === SUCCESS) {
          // const left = await getItemAmount(
          //   contract,
          //   index,
          //   collectionItemInfo?.collectionInfo?.isCollection === true ? 2 : 1,
          //   account,
          //   library
          // );

          const data = {
            mysterybox_id: itemInfo?.collectionInfo?.id,
            buyer: '',
            buyer_address: account,
            isSent: true,
          };

          const res = await registerBuy(data);
          if (res.data.status === SUCCESS) {
            // setOpenSnackbar({
            //   open: true,
            //   type: 'success',
            //   message: 'Success',
            // });
            console.log('success');
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        // AirDop
        console.log('claim');
        console.log(itemInfo);
        const contract = itemInfo?.collectionInfo?.boxContractAddress;
        const result = await claimAirDrop(contract, account, library);
        if (result === SUCCESS) {
          const data = {
            mysterybox_id: itemInfo?.collectionInfo?.id,
            buyer: '',
            buyer_address: account,
            isSent: true,
          };

          const res = await registerBuy(data);
          if (res.data.status === SUCCESS) {
            console.log('success');
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      console.log('buy mbox');
      try {
        if (itemInfo) {
          // chainid 로 네트워크 확인(eth, klaytn) 후 해당 지갑 연결 체크
          const check = await checkConnectWallet(
            itemInfo.chainId,
            wallet,
            activate
          );
          if (!check) {
            // 지갑 연결 화면띄우고 종료
            // setIsLoading(false);
            // setLoginOpen(true);
            return false;
          }
          const amount = 1;
          const price = itemInfo.price ?? 0;
          const payment = parseEther((price * amount).toString()).toString();
          const result = await buyKey(
            itemInfo.boxContractAddress,
            1,
            payment,
            itemInfo.quote === 'klay'
              ? contracts.klay[targetNetwork]
              : contracts.wklay[targetNetwork],
            account,
            library
          );

          if (result === SUCCESS) {
            const left = await getKeyRemains(
              itemInfo.keyContractAddress,
              itemInfo.boxContractAddress,
              account,
              library
            );
            setRemains(left);

            const data = {
              mysterybox_id: itemInfo.id,
              buyer: '',
              buyer_address: account,
              isSent: true,
            };

            const res = await registerBuy(data);
            if (res.data.status === SUCCESS) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error: any) {
        console.log(error);
        if (error.code == '-32603') setErrMsg('Not sufficient Klay balance!');
        return false;
      }
    }
  };

  useEffect(() => {
    if (itemInfo) setBuyItemInfo(itemInfo);
  }, [itemInfo, isCollection]);

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
      <div className="modal-dialog" style={{ height: isMobile ? '' : '500px' }}>
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
            className={`payment-box disabled ${
              selectedPayment === 1 ? 'active' : ''
            }`}
            // onClick={() => {
            //   setSelectedPayment(1);
            //   setIsDisabled(false);
            // }}
          >
            <div className="pay-item">
              <img
                // src={pay_creditcard}
                src={pay_creditcard_gray}
                alt="Credit Card"
                style={{ filter: 'contrast(100%)' }}
              />
            </div>
            <div className="pay-name">Point</div>
          </div>
          <div
            className={`payment-box ${selectedPayment === 2 ? 'active' : ''}`}
            onClick={() => {
              setSelectedPayment(2);
              setIsDisabled(false);
              // handleClickCrypto();
            }}
          >
            <div className="pay-item">
              <img src={pay_crypto} alt="Crypto" />
            </div>
            <div className="pay-name">Crypto</div>
          </div>

          {isMobile && (
            <>
              <div
                className={`payment-box ${
                  selectedPayment === 3 ? 'active' : ''
                }`}
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
                className={`payment-box ${
                  selectedPayment === 4 ? 'active' : ''
                }`}
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
            </>
          )}
        </div>
        <div className="custom-submit">
          <button
            disabled={isDisabled || isBuying}
            type="submit"
            className={`payments-btn-submit button fw-600  ${
              isDisabled || isBuying ? 'disable' : ''
            }`}
            // className="payments-btn-submit button fw-600 disable"
            onClick={handleClickBuy}
          >
            {isBuying ? (
              <CircularProgress size={30} color={'inherit'} />
            ) : (
              'Buy Now'
            )}
          </button>
          <div className="payment-error">
            <Typography>{errMsg}</Typography>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default PaymentWallets;
