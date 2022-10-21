import { useEffect, useState } from 'react';
import './talkclaim.css';
import CLAIMER from './Claimer.json';
import { ethers } from 'ethers';
import { BigNumber as eBigNumber } from '@ethersproject/bignumber';

const claimerContractAddress = process.env.REACT_APP_CLAIMER_CONTRACT_ADDRESS;
const claimerAbi = CLAIMER.abi;
let provider, signer, claimerContract;

function ClaimTalk() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isContractOwner, setIsContractOwner] = useState(false);
  const [inputs, setInputs] = useState({
    claimers: [],
    amounts: [],
    claimer: '',
    amount: '',
    claimerBalAddr: '',
    withdrawAllAddr: '',
  });
  const {
    claimers,
    amounts,
    claimer,
    amount,
    claimerBalAddr,
    withdrawAllAddr,
  } = inputs;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) return console.log('Make sure you have Metamask installed!');
    else console.log(`Wallet exists! We're ready to go!`);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length !== 0) {
      try {
        const account = accounts[0];
        console.log('Found an authorized account: ', account);
        setCurrentAccount(account);
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        claimerContract = new ethers.Contract(
          claimerContractAddress,
          claimerAbi,
          signer
        );

        const contractOwner = await claimerContract.owner();
        const isContractOwner =
          account.toLowerCase() === contractOwner.toLowerCase();
        setIsContractOwner(isContractOwner);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) alert('Please use Talken web3 browser!');
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Found an account! Address: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const setClaimersHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return console.log('Ethereum object does not exist');
      setLoading(true);
      // let block = await provider.getBlock('latest');
      // console.log('gasLimit: ' + block.gasLimit);
      let claimersArray = JSON.parse(claimers);
      let amountsArray = JSON.parse(amounts);
      if (claimersArray.length !== amountsArray.length)
        return alert('claimersArray, amountsArray length not same');
      let totalAmount = eBigNumber.from(0);
      amountsArray.map((item) => {
        totalAmount = totalAmount.add(item);
      });
      totalAmount = ethers.utils.formatEther(totalAmount);
      if (
        window.confirm(
          `${claimersArray.length}claimers, ${amountsArray.length}amounts, ${totalAmount}total right??`
        )
      ) {
        let setClaimers = await claimerContract.setClaimers(
          claimersArray,
          amountsArray
        );
        setMessage(`setClaimers hash: ${setClaimers.hash}`);
        let setClaimersResult = await setClaimers.wait();
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${setClaimers.hash}`
        );
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setClaimerHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return console.log('Ethereum object does not exist');
      setLoading(true);
      let setClaimer = await claimerContract.setClaimer(claimer, amount);
      setMessage(`setClaimer hash: ${setClaimer.hash}`);
      let setClaimerResult = await setClaimer.wait();
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${setClaimer.hash}`
      );
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMyBalanceHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return console.log('Ethereum object does not exist');
      setLoading(true);
      let getMyBalance = await claimerContract.getMyBalance(claimerBalAddr);
      setMessage(
        `${claimerBalAddr} Balance: ${ethers.utils.formatEther(getMyBalance)}`
      );
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTotalClaimsHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return console.log('Ethereum object does not exist');
      setLoading(true);
      let getTotalClaims = await claimerContract.getTotalClaims();
      setMessage(
        `Total balance of Claims: ${ethers.utils.formatEther(getTotalClaims)}`
      );
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const withdrawAllHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return console.log('Ethereum object does not exist');
      setLoading(true);
      let withdrawAll = await claimerContract.withdrawAll(withdrawAllAddr);
      setMessage(`withdrawAll hash: ${withdrawAll.hash}`);
      let withdrawAllResult = await withdrawAll.wait();
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${withdrawAll.hash}`
      );
    } catch (err) {
      console.log(err.message);
      alert(err.message);
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

  const setClaimersButton = () => {
    return (
      <button
        onClick={setClaimersHandler}
        disabled={loading}
        className="cta-button claim-button"
      >
        {loading ? 'Processing' : 'Set Claimers'}
      </button>
    );
  };
  const setClaimerButton = () => {
    return (
      <button
        onClick={setClaimerHandler}
        disabled={loading}
        className="cta-button claim-button"
      >
        {loading ? 'Processing' : 'Set Claimer'}
      </button>
    );
  };
  const getMyBalanceButton = () => {
    return (
      <button
        onClick={getMyBalanceHandler}
        disabled={loading}
        className="cta-button claim-button"
      >
        {loading ? 'Processing' : 'Get Claimer Balance'}
      </button>
    );
  };
  const getTotalClaimsButton = () => {
    return (
      <button
        onClick={getTotalClaimsHandler}
        disabled={loading}
        className="cta-button claim-button"
      >
        {loading ? 'Processing' : 'Get total balance of Claims'}
      </button>
    );
  };
  const withdrawAllButton = () => {
    return (
      <button
        onClick={withdrawAllHandler}
        disabled={loading}
        className="cta-button claim-button"
      >
        {loading ? 'Processing' : 'Withdraw all balance'}
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onReset = () => {
    setInputs({ name: '', nickname: '' });
  };

  return (
    <div className="main-app">
      {!currentAccount ? (
        connectWalletButton()
      ) : isContractOwner ? (
        <>
          <h1>Claimers Admin Page</h1>
          <br />
          <div>{message}</div>
          <br />
          <br />
          <input
            name="claimers"
            class="input-box"
            placeholder="Claimers Array"
            onChange={onChange}
            value={claimers}
          />
          <input
            name="amounts"
            class="input-box"
            placeholder="Amounts Array"
            onChange={onChange}
            value={amounts}
          />
          <div class="button-div">
            {currentAccount ? setClaimersButton() : connectWalletButton()}
          </div>
          <br />
          <br />
          <input
            name="claimer"
            class="input-box"
            placeholder="Claimer Address"
            onChange={onChange}
            value={claimer}
          />
          <input
            name="amount"
            class="input-box"
            placeholder="Amount"
            onChange={onChange}
            value={amount}
          />
          <div class="button-div">{setClaimerButton()}</div>
          <br />
          <br />
          <input
            name="claimerBalAddr"
            class="input-box"
            placeholder="Claimer address"
            onChange={onChange}
            value={claimerBalAddr}
          />
          <div class="button-div">{getMyBalanceButton()}</div>
          <br />
          <br />
          <div class="button-div">{getTotalClaimsButton()}</div>
          <br />
          <br />
          <input
            name="withdrawAllAddr"
            class="input-box"
            placeholder="Colligence wallet address"
            onChange={onChange}
            value={withdrawAllAddr}
          />
          <div class="button-div">{withdrawAllButton()}</div>
        </>
      ) : (
        <div>Check metamask account</div>
      )}
    </div>
  );
}

export default ClaimTalk;
