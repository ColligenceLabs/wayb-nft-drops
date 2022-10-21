import { useEffect, useState } from 'react';
import Axios from 'axios';
import './talkclaim.css';
import CLAIMER from './Claimer.json';
import Spinner from './spinner/spinner';
import SpinnerSvg from './spinner/spinnerSvg.svg';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import talkenLogo from './talk.png';
import agreeImage from './register_agree.png';
import disagreeImage from './register_disagree.png';
import moment from 'moment';
import useInterval from './useInterval';

const claimerContractAddress = process.env.REACT_APP_CLAIMER_CONTRACT_ADDRESS;
const claimerAbi = CLAIMER.abi;
const CATEGORY = {
  CLAIM: 'claim',
  APPLY: 'apply',
};
const isInterval = true;
const BASE_URI = 'https://talken.io';
let provider, signer, claimerContract;

const ClaimTalk = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [availableBalance, setAvailableBalance] = useState('0');
  const [inputs, setInputs] = useState({ claimToAddr: '' });
  const { claimToAddr } = inputs;
  const [loading, setLoading] = useState(false);
  const [pendingTxHash, setPendingTxHash] = useState(null);
  const [receiveToggle, setReceiveToggle] = useState(false);
  const [category, setCategory] = useState(CATEGORY.CLAIM);
  const [agree, setAgree] = useState(false);
  const [exchangeBalance, setExchangeBalance] = useState(0);
  const [applyAddressTo, setApplyAddressTo] = useState(null);
  const [estimatedAvailable, setEstimatedAvailable] = useState('0');
  const [applyAvailable, setApplyAvailable] = useState(false);
  const [startTimeNotice, setStartTimeNotice] = useState('');
  const [endTimeNotice, setEndTimeNotice] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [claimDateNotice, setClaimDateNotice] = useState('');
  const [nextClaimDateNotice, setNextClaimDateNotice] = useState('');

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have Metamask installed!');
      return;
    } else {
      console.log(`Wallet exists! We're ready to go!`);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    // if (ethereum.networkVersion !== '1' && ethereum.networkVersion !== '0x1' && ethereum.networkVersion !== '0x01') return alert('Please change to Ethereum mainnet');

    if (accounts.length !== 0) {
      try {
        const account = accounts[0];
        setCurrentAccount(account);
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        claimerContract = new ethers.Contract(
          claimerContractAddress,
          claimerAbi,
          signer
        );
        let claimBalanceTxn = await claimerContract.getMyBalance(account);
        // console.log('claimBalanceTxn:::', parseFloat(claimBalanceTxn))
        setAvailableBalance(ethers.utils.formatEther(claimBalanceTxn));

        let lsPendingTxHashes =
          JSON.parse(localStorage.getItem('apps.talken.pending_tx_hashes')) ||
          [];
        if (lsPendingTxHashes.length > 0) {
          setPendingTxHash(lsPendingTxHashes[0]);
          provider
            .waitForTransaction(lsPendingTxHashes[0], 1, 0)
            .then((res) => {
              lsPendingTxHashes = lsPendingTxHashes.filter(
                (item) => item !== res.transactionHash
              );
              localStorage.setItem(
                'apps.talken.pending_tx_hashes',
                JSON.stringify(lsPendingTxHashes)
              );
              setPendingTxHash(null);
            });
        }
      } catch (err) {
        console.log(err);
        alert(err);
      }
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please use Talken web3 browser!');
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      // if (ethereum.networkVersion !== '1' && ethereum.networkVersion !== '0x1' && ethereum.networkVersion !== '0x01') return alert('Please change to Ethereum mainnet');
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const claimHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true);
        let balance;
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        // if (ethereum.networkVersion !== '1' && ethereum.networkVersion !== '0x1' && ethereum.networkVersion !== '0x01') return alert('Please change to Ethereum mainnet');
        const currentAddress = accounts[0];
        balance = await claimerContract.getMyBalance(currentAddress);
        setAvailableBalance(ethers.utils.formatEther(balance));
        const isAddress = ethers.utils.isAddress(claimToAddr);
        let claimTxn =
          isAddress && receiveToggle
            ? await claimerContract.claimToAddress(balance, claimToAddr)
            : await claimerContract.claim(balance);
        console.log(
          `Mined, see transaction: https://etherscan.io/tx/${claimTxn.hash}`
        );
        setPendingTxHash(claimTxn.hash);
        let lsPendingTxHashes =
          JSON.parse(localStorage.getItem('apps.talken.pending_tx_hashes')) ||
          [];
        lsPendingTxHashes.push(claimTxn.hash);
        localStorage.setItem(
          'apps.talken.pending_tx_hashes',
          JSON.stringify(lsPendingTxHashes)
        );
        let claimTxnResult = await claimTxn.wait();
        checkWalletIsConnected();
      } else {
        console.log('Ethereum object does not exist');
      }
    } catch (err) {
      console.log(err);
      // TODO: 에러 확인 후 메시지 변경
      // if (err.message.includes('No balance to claim')) return alert('네트워크 수수료가 부족합니다.(이더리움)');
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const claimButton = () => {
    const isZerobalance =
      availableBalance === '0' || availableBalance === '0.0';
    let _claimButton =
      moment().isBefore(moment(claimDateNotice).subtract(1, 'days')) ||
      moment().isAfter(moment(claimDateNotice)) ? (
        <button
          onClick={claimHandler}
          disabled={loading || isZerobalance || pendingTxHash}
          className="cta-button claim-button"
        >
          {loading || pendingTxHash
            ? 'Processing'
            : isZerobalance
            ? 'No balance to claim'
            : 'Claim TALK'}
        </button>
      ) : (
        <button disabled={true} className="cta-button connect-wallet-button">
          {loading || pendingTxHash
            ? 'Processing'
            : isZerobalance
            ? 'No balance to claim'
            : 'Claim TALK'}
        </button>
      );
    return _claimButton;
  };

  const handleReceiveToggle = () => {
    setReceiveToggle(!receiveToggle);
  };

  const handleCategory = (selected) => {
    return setCategory(selected);
  };

  const handleAgree = () => {
    setAgree(!agree);
  };

  const applySubmit = () => {
    checkServerTime();
    timeCheck();
    setSubmitClicked(true);
  };

  const withdraw = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        //if (ethereum.networkVersion !== '1' && ethereum.networkVersion !== '0x1' && ethereum.networkVersion !== '0x01') return alert('Please change to Ethereum mainnet');
        const currentAddress = accounts[0];
        let withdrawUrl = BASE_URI + `/cmu/api/user/account/withdraw`;
        let withdrawUrlRes = await Axios.post(
          withdrawUrl,
          { addressTo: currentAddress },
          { withCredentials: true }
        )
          .then((res) => {
            if (res.data?.result === true) {
              alert('신청이 완료되었습니다.');
              setApplyAddressTo(res.data?.result?.addressTo);
            } else {
              alert('이미 신청하였습니다.');
            }
          })
          .catch((error) => {
            console.log(error);
            alert('전환신청에 실패하였습니다. 고객센터로 문의해주세요.');
          });
      } else {
        console.log('Ethereum object does not exist');
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  const getExchangeBalance = async () => {
    try {
      let balanceUrl = BASE_URI + `/cmu/api/user/account/balance`;
      let balanceUrlRes = await Axios.get(balanceUrl, { withCredentials: true })
        .then((res) => {
          const talkSnapshot = BigNumber(res.data?.result?.talkSnapshot || 0);
          const cobak = BigNumber(res.data?.result?.cobak || 0);
          const tpAvailable = BigNumber(res.data?.result?.tpAvailable || 0);
          const oneOver24 = talkSnapshot.minus(cobak).div(24).toFixed(2); // 1/24 수량 = round((talk_snapshot - cobak) / 24, 2)
          const paidCount = BigNumber(24)
            .minus(tpAvailable.div(oneOver24))
            .toFixed(2); // 지급된 횟수 = round(24 - (tp_available / (1/24 수량)), 2)
          const getDate = (date) => moment(date, 'YYYY/MM/DD').startOf('month');
          const diff = Math.abs(getDate('2021/09/01').diff(moment(), 'months'));
          const round = (diff + 1).toFixed(0); // 지급차수
          const isAvailable =
            tpAvailable.toString() !== '0' &&
            BigNumber(paidCount).toFixed(0) !== round;
          const estimatedAvailable = isAvailable
            ? BigNumber(round)
                .minus(paidCount)
                .multipliedBy(oneOver24)
                .toFixed(2)
            : '0'; // 이달 지급량 = round((지급차수 - 지급된횟수) * (1/24 수량), 2)
          setExchangeBalance(tpAvailable.toString());
          setApplyAddressTo(res.data?.result?.addressTo);
          setEstimatedAvailable(estimatedAvailable);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
    getExchangeBalance();
    checkServerTime();
    timeCheck();
  }, []);

  useEffect(() => {
    checkCategory();
  }, [applyAvailable]);

  useEffect(() => {
    if (submitClicked) {
      if (!applyAvailable) {
        alert(
          '전환신청기간이 아닙니다.\n' +
            startTimeNotice +
            ' 부터 신청가능합니다.'
        );
      } else if (exchangeBalance === '0') {
        alert('전환신청 가능한 TALK이 없습니다.');
      } else if (applyAddressTo !== null) {
        alert('이미 신청하였습니다.');
      } else if (!agree) {
        alert('안내 확인 및 동의를 진행해주세요.');
      } else {
        if (
          window.confirm(
            '전환신청 후 취소는 불가능합니다. 전환신청하시겠습니까?'
          )
        ) {
          withdraw();
        }
      }
      setSubmitClicked(false);
    }
  }, [submitClicked]);

  const checkCategory = () => {
    if (applyAvailable) setCategory(CATEGORY.APPLY);
  };

  useInterval(
    () => {
      timeCheck();
    },
    isInterval ? 1000 : null
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const setMomentOffset = (serverTime) => {
    let offset = new Date(serverTime).getTime() - Date.now();
    moment.now = function () {
      return offset + Date.now();
    };
  };

  const checkServerTime = async () => {
    const serverTime = await Axios.get(
      'https://bcn-api.talken.io/serverTime'
    ).catch((error) => {
      console.log(error);
    }); //undefined;
    if (serverTime) setMomentOffset(serverTime.data.replaceAll('-', '/'));
    let replace = serverTime.data.replaceAll('-', '/');
  };

  const timeCheck = () => {
    const nowYearMonth = moment().format('YYYY/MM');
    const submitYearMonth =
      moment().date() >= 7 && moment().hour() >= 9
        ? moment().add(1, 'months').format('YYYY/MM')
        : nowYearMonth;
    const startDate = '01';
    const endDate = '07';
    const claimDate = '08';
    const nextClaimDate = '08';
    const applyHour = '09:00';
    const claimHour = '09:00';
    const startTime = '09:00:00';
    const endTime = '09:00:00';

    let _start = submitYearMonth + '/' + startDate + ' ' + startTime;
    let _end = submitYearMonth + '/' + endDate + ' ' + endTime;
    let _applyStartDate = submitYearMonth + '/' + startDate + ' ' + applyHour;
    let _applyEndDate = submitYearMonth + '/' + endDate + ' ' + applyHour;
    let _claimDate = nowYearMonth + '/' + claimDate + ' ' + claimHour;
    let _nextClaimDate =
      submitYearMonth + '/' + nextClaimDate + ' ' + applyHour;

    const start = moment(_start);
    const end = moment(_end);

    setStartTimeNotice(_applyStartDate);
    setEndTimeNotice(_applyEndDate);
    setClaimDateNotice(_claimDate);
    setNextClaimDateNotice(_nextClaimDate);

    if (moment().isBefore(start)) {
      return setApplyAvailable(false);
    } else if (moment().isAfter(start) && moment().isBefore(end)) {
      return setApplyAvailable(true);
    } else if (moment().isAfter(end)) {
      return setApplyAvailable(false);
    }
  };

  let active = 'menu-button-active';
  let inactive = 'menu-button-inactive';
  let claimMenuStyle = inactive;
  let applyMenuStyle = inactive;
  let applyText1 = (
    <li>
      <b>전환은 TALK (이더리움 ERC20 기반)으로 진행됩니다.</b>
    </li>
  );
  let applyText2 = <li>전환 신청 후 취소는 불가능합니다.</li>;
  let applyText3 = (
    <li>최초 보유 개수의 1/24을 매달 TALK으로 전환할 수 있습니다.</li>
  );
  let agreeText = (
    <span className="agree-text-span">
      위 안내 사항을 확인했으며 이에 동의합니다.{' '}
      <img onClick={handleAgree} src={agree ? agreeImage : disagreeImage} />
    </span>
  );
  let applyHead1 = <div className="apply-header">전환신청기간</div>;
  let applyHead2 = <div className="apply-header">클레임기간</div>;
  let applyHead3 = <div className="apply-header">다음회차 클레임기간</div>;
  let applyText4 = (
    <div>
      <span>{startTimeNotice + ' (KST)'}</span>
      {' 부터'} <br /> <span>{endTimeNotice + '  (KST) 까지'}</span>
    </div>
  );
  let applyText5 = (
    <div>
      <span>{claimDateNotice + ' (KST)'}</span>
      {' 부터'}
    </div>
  );
  let applyText6 = (
    <div>
      <span>{nextClaimDateNotice + ' (KST)'}</span>
      {' 부터'}
    </div>
  );
  let applyText7 = <li>전환하지 않을 경우 다음 달로 이월됩니다.</li>;
  let balanceTxt = estimatedAvailable + '  /  ' + exchangeBalance;
  let appliedBalanceTxt = '0  /  ' + exchangeBalance;

  if (category === CATEGORY.CLAIM) {
    claimMenuStyle = active;
    applyMenuStyle = inactive;
  } else if (category === CATEGORY.APPLY) {
    claimMenuStyle = inactive;
    applyMenuStyle = active;
  }

  let claimView = (
    <div>
      <div className="claim-talk-container">
        <div className="logo-box">
          <img src={talkenLogo} className="logo-image" />
        </div>
        <div className="content-box">
          {loading ? <Spinner /> : null}
          <h1>Claim TALK</h1>
          <div className="available-text-div">
            Available Balance: <br />
            {availableBalance === '0.0' ? 0 : availableBalance}
          </div>
          <br />
          <div className="receive-toggle-div" onClick={handleReceiveToggle}>
            + Add Recipient (optional)
          </div>
          {receiveToggle && (
            <>
              <input
                name="claimToAddr"
                className="input-box claim-input"
                placeholder="Receive address"
                onChange={onChange}
                value={claimToAddr}
              />
            </>
          )}
          <br />
          <div>{currentAccount ? claimButton() : connectWalletButton()}</div>
        </div>
      </div>
      <div className="apply-date-notice-div">
        {applyHead2}
        {applyText5}
      </div>
    </div>
  );

  let applyView = (
    <>
      <div className="apply-container">
        <img src={talkenLogo} className="logo-image" />
        {loading ? <Spinner /> : null}
        <h1>전환신청 안내</h1>
        <div className="apply-text-div">
          <ul>
            {applyText1}
            {applyText2}
            {applyText3}
          </ul>
          <div className="apply-balance-div">
            <div>전환가능량&nbsp;/&nbsp;보유중인 수량</div>
            <div>
              {applyAddressTo !== null ? appliedBalanceTxt : balanceTxt}
            </div>
          </div>
          <div className="agree-text-wrap">{agreeText}</div>
        </div>
        <div className="apply-button-div">
          {applyAddressTo === null ? (
            <button
              onClick={applySubmit}
              disabled={!applyAvailable}
              className={'cta-button apply-button'}
            >
              전환신청하기
            </button>
          ) : (
            <button
              onClick={applySubmit}
              disabled={true}
              className={'cta-button apply-button'}
            >
              전환신청완료
            </button>
          )}
        </div>
        <div className="apply-date-notice-div">
          {applyHead1}
          {applyText4}
          {applyHead2}
          {applyText6}
        </div>
      </div>
    </>
  );

  let menu = (
    <div className="top-menu-wrapper">
      <div className="top-menu">
        <span
          className={applyMenuStyle}
          onClick={() => handleCategory(CATEGORY.APPLY)}
        >
          Apply
        </span>
        <span
          className={claimMenuStyle}
          onClick={() => handleCategory(CATEGORY.CLAIM)}
        >
          Claim
        </span>
      </div>
    </div>
  );

  let content = null;
  switch (category) {
    case CATEGORY.CLAIM:
      content = claimView;
      break;

    case CATEGORY.APPLY:
      content = applyView;
      break;
  }

  let pendingView = (
    <>
      <br />
      <div
        style={{ display: 'inline-flex' }}
        onClick={async () => {
          window.open(`https://etherscan.io/tx/${pendingTxHash}`, '_blank');
        }}
      >
        <img src={SpinnerSvg} />
        <div style={{ lineHeight: '32px' }}>{`${pendingTxHash?.substring(
          0,
          8
        )}......${pendingTxHash?.slice(-8)}`}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 37 37"
        >
          <g transform="translate(-269 -60)">
            <path
              data-name="ic_link"
              d="M-717.774-4419.384a4.721 4.721 0 0 1 0-6.677l.985-.986a1.078 1.078 0 0 1 1.524 0 1.077 1.077 0 0 1 0 1.524l-.985.985a2.572 2.572 0 0 0 .094 3.54 2.572 2.572 0 0 0 3.539.092l.986-.987a1.077 1.077 0 0 1 1.523 0 1.076 1.076 0 0 1 0 1.522l-.986.985a4.7 4.7 0 0 1-3.338 1.384 4.707 4.707 0 0 1-3.342-1.382zm3.833-3.832a1.077 1.077 0 0 1 0-1.523l3.046-3.046a1.076 1.076 0 0 1 1.522 0 1.078 1.078 0 0 1 0 1.523l-3.046 3.045a1.073 1.073 0 0 1-.761.315 1.073 1.073 0 0 1-.761-.314zm5.891-.738a1.08 1.08 0 0 1 0-1.525l.986-.986a2.57 2.57 0 0 0-.094-3.539 2.57 2.57 0 0 0-3.539-.091l-.986.985a1.077 1.077 0 0 1-1.523 0 1.077 1.077 0 0 1 0-1.523l.985-.985a4.727 4.727 0 0 1 3.341-1.382 4.73 4.73 0 0 1 3.34 1.383 4.728 4.728 0 0 1 1.383 3.34 4.726 4.726 0 0 1-1.383 3.339l-.985.985a1.074 1.074 0 0 1-.762.315 1.079 1.079 0 0 1-.763-.316z"
              transform="translate(999.157 4504)"
              stroke="transparent"
              strokeMiterlimit="10"
              fill="#9fa7c1"
            />
          </g>
        </svg>
      </div>
    </>
  );

  return (
    <div className="main-app">
      {menu}
      {content}
      {pendingTxHash && pendingView}

      {/* <div>
        <br/><br/><br/>
        <button style={{background: 'white',border: 'none',color: 'white'}}
          onClick={async () => {
            try {
              console.log('TESET!!!')
              let balanceUrl = `http://localhost:3000/cmu/api/user/account/balance`;
              let balanceUrlRes = await Axios.get(balanceUrl, { withCredentials: true }).catch((error) => {alert(error);});
              alert(typeof balanceUrlRes === 'object' ? JSON.stringify(balanceUrlRes) : balanceUrlRes);
            } catch (err) {
              console.log(err.message);
              alert(err.message);
            }
          }}
        >
          getTalkBalance()테스트
        </button>
        <br/><br/><br/>
        <button style={{background: 'white',border: 'none',color: 'red'}}
          onClick={async () => {
            try {
              const { ethereum } = window;
              if (ethereum) {
                console.log('TESET!!!')
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                //if (ethereum.networkVersion !== '1' && ethereum.networkVersion !== '0x1' && ethereum.networkVersion !== '0x01') return alert('Please change to Ethereum mainnet');
                const currentAddress = accounts[0];
                let withdrawUrl = `http://localhost:3000/cmu/api/user/account/withdraw`;
                let withdrawUrlRes = await Axios.post(withdrawUrl, { addressTo: currentAddress }, { withCredentials: true }).catch((error) => {alert(error);});
                alert(typeof withdrawUrlRes === 'object' ? JSON.stringify(withdrawUrlRes) : withdrawUrlRes);
              } else {
                console.log('Ethereum object does not exist');
              }
            } catch (err) {
              console.log(err.message);
              alert(err.message);
            }
          }}
        >
          전환신청테스트
        </button>
      </div> */}
    </div>
  );
};

export default ClaimTalk;
