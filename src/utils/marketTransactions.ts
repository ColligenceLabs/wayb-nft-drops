import { BigNumber, ethers, utils } from 'ethers';
import { mysteryBoxAbi } from '../config/abi/MysteryBox';
import { erc721Abi } from '../config/abi/ERC721Token';
import { whiteListAbi } from '../config/abi/WhiteListNFT';
import { subscriptionAbi } from '../config/abi/Subscription';
import { parseUnits } from 'ethers/lib/utils';
import { FAILURE, SUCCESS, RPC_URLS } from '../config';
import Caver, { AbiItem } from 'caver-js';
import { evenAllocAbi } from '../config/abi/EventAllocation';
import env from '../env';
import { formatEther } from 'taalswap-ethers/lib/utils';

const rpcUrl = RPC_URLS[env.REACT_APP_TARGET_NETWORK ?? 1001];
const caver = new Caver(rpcUrl);
const BIG_ZERO: BigNumber = ethers.BigNumber.from('0');

export function calculateGasMargin(value: BigNumber) {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

interface Overrides {
  value?: string | number;
  from: string | null | undefined;
  gasLimit: BigNumber;
  gasPrice?: string;
}

// >> 직접판매 용도
export async function getKeyBalance(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const keyAbi: AbiItem[] = erc721Abi as AbiItem[];
    contract = new caver.klay.Contract(keyAbi, address);
  } else {
    contract = new ethers.Contract(address, erc721Abi, library?.getSigner());
  }

  let balance;
  let retBalance;
  try {
    if (isKaikas) {
      retBalance = await contract.methods
        .balanceOf(account)
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getKeyBalance Error : ', err);
        });
    } else {
      balance = await contract.balanceOf(account);
      retBalance = balance.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getKeyBalance Error : ', e);
    return 0;
  }
  return retBalance;
}

export async function getKeyRemains(
  address: string,
  mysteryBox: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const keyAbi: AbiItem[] = erc721Abi as AbiItem[];
    contract = new caver.klay.Contract(keyAbi, address);
  } else {
    contract = new ethers.Contract(address, erc721Abi, library?.getSigner());
  }

  let remains: BigNumber = BIG_ZERO;
  let retRemains = 0;
  try {
    if (isKaikas) {
      const hardCap = await contract.methods
        .hardCap()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, mysteryBox);
          console.log('getKeyRemains hardCap Error : ', err);
        });
      const totalSupply = await contract.methods
        .totalSupply()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, mysteryBox);
          console.log('getKeyRemains totalSupply Error : ', err);
        });
      retRemains = hardCap - totalSupply;
    } else {
      const hardCap = await contract.hardCap();
      const totalSupply = await contract.totalSupply();
      remains = hardCap.sub(totalSupply);
      retRemains = remains.toNumber();
    }
  } catch (e) {
    console.log('#####', address, mysteryBox);
    console.log('getKeyRemains Error : ', e);
  }
  return retRemains;
}

export async function getItemBalance(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const boxAbi: AbiItem[] = mysteryBoxAbi as AbiItem[];
    contract = new caver.klay.Contract(boxAbi, address);
  } else {
    contract = new ethers.Contract(address, erc721Abi, library?.getSigner());
  }

  let balance;
  let retBalance;
  try {
    if (isKaikas) {
      retBalance = await contract.methods
        .balanceOf(account)
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getItemBalance Error : ', err);
        });
    } else {
      balance = await contract.balanceOf(account);
      retBalance = balance.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getItemBalance Error : ', e);
  }
  return retBalance;
}

export async function buyKey(
  address: string,
  amount: number,
  payment: string,
  quote: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const boxAbi: AbiItem[] = mysteryBoxAbi as AbiItem[];
    contract = new caver.klay.Contract(boxAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      mysteryBoxAbi,
      library?.getSigner()
    );
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract, amount);
  if (isKaikas) {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.methods.buyKeyEth(amount).estimateGas({
        value: payment,
        from: account,
      });
    } else {
      gasLimit = await contract.methods
        .buyKeyQuote(payment, amount)
        .estimateGas({
          from: account,
        });
    }
  } else {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.estimateGas.buyKeyEth(amount, {
        value: payment,
      });
    } else {
      gasLimit = await contract.estimateGas.buyKeyQuote(payment, amount);
    }
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    if (isKaikas) {
      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: payment };

        tx = await contract.methods
          .buyKeyEth(amount)
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      } else {
        tx = await contract.methods
          .buyKeyQuote(payment, amount)
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      }
      if (tx?.status) {
        return SUCCESS;
      } else return FAILURE;
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: payment };

        tx = await contract.buyKeyEth(amount, overrides);
      } else {
        tx = await contract.buyKeyQuote(payment, amount, overrides);
      }

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return FAILURE;
      }
      if (receipt.status === 1) {
        return SUCCESS;
      } else return FAILURE;
    }
  } catch (e) {
    console.log(e);
    return FAILURE;
  }
}

export async function claimMysteryBox(
  mysteryBox: string, // mysterybox contract address
  amount: number, // Key contract token ids
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const boxAbi: AbiItem[] = mysteryBoxAbi as AbiItem[];
    contract = new caver.klay.Contract(boxAbi, mysteryBox);
  } else {
    contract = new ethers.Contract(
      mysteryBox,
      mysteryBoxAbi,
      library?.getSigner()
    );
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract, amount);
  if (isKaikas) {
    gasLimit = await contract.methods.claim(account, amount).estimateGas({
      from: account,
    });
  } else gasLimit = await contract.estimateGas.claim(account, amount);

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    if (isKaikas) {
      tx = await contract.methods
        .claim(account, amount)
        .send(overrides)
        .catch(async (err: any) => {
          return FAILURE;
        });
      if (tx?.status) {
        return SUCCESS;
      } else return FAILURE;
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      tx = await contract.claim(account, amount, overrides);

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return FAILURE;
      }
      if (receipt.status === 1) {
        return SUCCESS;
      } else return FAILURE;
    }
  } catch (e) {
    console.log(e);
    return FAILURE;
  }
}

// >> 균등배분 용도
export async function buyTicket(
  address: string, // EvenAllocation contract address
  value: string, // buying paymrnt = nTickets * price
  nTickets: number, // number of tickets to buy
  quote: string, // quote token address
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const evenAbi: AbiItem[] = evenAllocAbi as AbiItem[];
    contract = new caver.klay.Contract(evenAbi, address);
  } else {
    contract = new ethers.Contract(address, evenAllocAbi, library?.getSigner());
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract, value, quote);
  if (isKaikas) {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.methods.buyTicketEth(nTickets).estimateGas({
        value: value,
        from: account,
      });
    } else {
      gasLimit = await contract.methods
        .buyTicketQuote(value, nTickets)
        .estimateGas({
          from: account,
        });
    }
  } else {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.estimateGas.buyTicketEth(nTickets, {
        value: value,
      });
    } else {
      gasLimit = await contract.estimateGas.buyTicketQuote(value, nTickets);
    }
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    if (isKaikas) {
      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: value };

        tx = await contract.methods
          .buyTicketEth(nTickets)
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      } else {
        tx = await contract.methods
          .buyTicketQuote(value, nTickets)
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      }
      if (tx?.status) {
        return SUCCESS;
      } else return FAILURE;
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: value };

        tx = await contract.buyTicketEth(nTickets, overrides);
      } else {
        tx = await contract.buyTicketQuote(value, nTickets, overrides);
      }

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return FAILURE;
      }
      if (receipt.status === 1) {
        return SUCCESS;
      } else return FAILURE;
    }
  } catch (e) {
    console.log(e);
    return FAILURE;
  }
}

export async function getTicketCount(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const evenAbi: AbiItem[] = evenAllocAbi as AbiItem[];
    contract = new caver.klay.Contract(evenAbi, address);
  } else {
    contract = new ethers.Contract(address, evenAllocAbi, library?.getSigner());
  }

  let balance;
  let retBalance;
  try {
    if (isKaikas) {
      retBalance = await contract.methods
        .getTicketCount()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getTicketCount Error : ', err);
        });
    } else {
      balance = await contract.getTicketCount();
      retBalance = balance.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getTicketCount Error : ', e);
  }
  return retBalance;
}

export async function getMyTickets(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const evenAbi: AbiItem[] = evenAllocAbi as AbiItem[];
    contract = new caver.klay.Contract(evenAbi, address);
  } else {
    contract = new ethers.Contract(address, evenAllocAbi, library?.getSigner());
  }

  let balance;
  let retBalance;
  try {
    if (isKaikas) {
      retBalance = await contract.methods
        .getMyTickets()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      balance = await contract.getMyTickets();
      retBalance = balance.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
  }
  return retBalance;
}

export async function getMyWin(
  address: string,
  mechanism: number,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);

  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] =
      mechanism === 1
        ? (subscriptionAbi as AbiItem[])
        : (evenAllocAbi as AbiItem[]);
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      mechanism === 1 ? subscriptionAbi : evenAllocAbi,
      library?.getSigner()
    );
  }

  let balance;
  let retBalance;
  try {
    if (isKaikas) {
      retBalance = await contract.methods
        .getMyWin()
        .call({ from: account })
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      balance = await contract.getMyWin();
      retBalance = balance.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
  }
  return retBalance;
}

export async function claimEvenAllocation(
  address: string, // EvenAllocation contract address
  symbol: string,
  account: string | undefined | null,
  library: any
): Promise<[number, string]> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const evenAbi: AbiItem[] = evenAllocAbi as AbiItem[];
    contract = new caver.klay.Contract(evenAbi, address);
  } else {
    contract = new ethers.Contract(address, evenAllocAbi, library?.getSigner());
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  if (isKaikas) {
    gasLimit = await contract.methods.claim().estimateGas({
      from: account,
    });
  } else {
    gasLimit = await contract.estimateGas.claim();
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    let retMsg = '';
    if (isKaikas) {
      tx = await contract.methods
        .claim()
        .send(overrides)
        .catch(async (err: any) => {
          return [FAILURE, retMsg];
        });

      if (tx?.status) {
        console.log('====================> ', tx);
        let nNFT = 0;
        let nWin = 0;
        let refund = '0';
        for (let i = 0; i < tx.events.length; i++) {
          const eventName = tx.events[i].event;
          if (eventName === 'RefundNFT') {
            nNFT = tx.events[i].args[1].toNumber();
          } else if (eventName === 'Refund') {
            refund = parseFloat(formatEther(tx.events[i].args[1])).toFixed(2);
          } else if (eventName === 'Claim') {
            nWin = tx.events[i].args[1].toNumer();
          }
        }
        retMsg = `${nWin}개의 미스터리박스 NFT, ${refund}${symbol}, WL NFT ${nNFT}개를 받음.`;
        console.log('== claimEvenAllocation ==> ', retMsg);
        return [SUCCESS, retMsg];
      } else return [FAILURE, retMsg];
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      tx = await contract.claim(overrides);

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return [FAILURE, retMsg];
      }
      if (receipt.status === 1) {
        console.log('====================> ', receipt);
        let nNFT = 0;
        let nWin = 0;
        let refund = '0';
        for (let i = 0; i < receipt.events.length; i++) {
          const eventName = receipt.events[i].event;
          if (eventName === 'RefundNFT') {
            nNFT = receipt.events[i].args[1].toNumber();
          } else if (eventName === 'Refund') {
            refund = parseFloat(formatEther(receipt.events[i].args[1])).toFixed(
              2
            );
          } else if (eventName === 'Claim') {
            nWin = receipt.events[i].args[1].toNumber();
          }
        }
        retMsg = `${nWin}개의 미스터리박스 NFT, ${refund}${symbol}, WL NFT ${nNFT}개를 받음.`;
        console.log('== claimEvenAllocation ==> ', retMsg);
        return [SUCCESS, retMsg];
      } else return [FAILURE, retMsg];
    }
  } catch (e) {
    console.log(e);
    return [FAILURE, ''];
  }
}

// >> 비례배분 용도
export async function staking(
  address: string, // subscription contract address
  value: string, // staking value
  quote: string, // quote token address
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const subAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(subAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract, value, quote);
  if (isKaikas) {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.methods.stakingEth().estimateGas({
        value: value,
        from: account,
      });
    } else {
      gasLimit = await contract.methods.stakingQuote(value).estimateGas({
        from: account,
      });
    }
  } else {
    if (quote === '0x0000000000000000000000000000000000000000') {
      gasLimit = await contract.estimateGas.stakingEth({ value: value });
    } else {
      gasLimit = await contract.estimateGas.stakingQuote(value);
    }
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    if (isKaikas) {
      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: value };

        tx = await contract.methods
          .stakingEth()
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      } else {
        tx = await contract.methods
          .stakingQuote(value)
          .send(overrides)
          .catch(async (err: any) => {
            return FAILURE;
          });
      }
      if (tx?.status) {
        return SUCCESS;
      } else return FAILURE;
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      if (quote === '0x0000000000000000000000000000000000000000') {
        overrides = { ...overrides, value: value };

        tx = await contract.stakingEth(overrides);
      } else {
        tx = await contract.stakingQuote(value, overrides);
      }

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return FAILURE;
      }
      if (receipt.status === 1) {
        return SUCCESS;
      } else return FAILURE;
    }
  } catch (e) {
    console.log(e);
    return FAILURE;
  }
}

export async function unStaking(
  address: string, // subscription contract address
  value: string, // staking value
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const subAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(subAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract, value);
  if (isKaikas) {
    gasLimit = await contract.methods.unStaking(value).estimateGas({
      from: account,
    });
  } else {
    gasLimit = await contract.estimateGas.unStaking(value);
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    if (isKaikas) {
      tx = await contract.methods
        .unStaking(value)
        .send(overrides)
        .catch(async (err: any) => {
          return FAILURE;
        });
      if (tx?.status) {
        return SUCCESS;
      } else return FAILURE;
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      tx = await contract.unStaking(value, overrides);

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return FAILURE;
      }
      if (receipt.status === 1) {
        return SUCCESS;
      } else return FAILURE;
    }
  } catch (e) {
    console.log(e);
    return FAILURE;
  }
}

export async function claimSubscription(
  address: string, // subscription contract address
  symbol: string,
  account: string | undefined | null,
  library: any
): Promise<[number, string]> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const subAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(subAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let tx;
  // gasLimit 계산
  let gasLimit;
  console.log(contract);
  if (isKaikas) {
    gasLimit = await contract.methods.claim().estimateGas({
      from: account,
    });
  } else {
    gasLimit = await contract.estimateGas.claim();
  }

  // registerItems 요청
  let receipt;
  try {
    let overrides: Overrides = {
      from: account,
      gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
    };

    let retMsg = '';
    if (isKaikas) {
      tx = await contract.methods
        .claim()
        .send(overrides)
        .catch(async (err: any) => {
          return [FAILURE, retMsg];
        });
      if (tx?.status) {
        console.log('====================> ', tx);
        let nNFT = 0;
        let nWin = 0;
        let refund = '0';
        for (let i = 0; i < tx.events.length; i++) {
          const eventName = tx.events[i].event;
          if (eventName === 'RefundNFT') {
            nNFT = tx.events[i].args[1].toNumber();
          } else if (eventName === 'Refund') {
            refund = parseFloat(formatEther(tx.events[i].args[1])).toFixed(2);
          } else if (eventName === 'Claim') {
            nWin = tx.events[i].args[1].toNumber();
          }
        }
        retMsg = `${nWin}개의 미스터리박스 NFT, ${refund}${symbol}, WL NFT ${nNFT}개를 받음.`;
        console.log('== claimSubscription ==> ', retMsg);
        return [SUCCESS, retMsg];
      } else return [FAILURE, retMsg];
    } else {
      // if (library._network.chainId === 8217)
      overrides = { ...overrides, gasPrice };

      tx = await contract.claim(overrides);

      // receipt 대기
      try {
        receipt = await tx.wait();
      } catch (e) {
        return [FAILURE, retMsg];
      }
      if (receipt.status === 1) {
        console.log('====================> ', receipt);
        let nNFT = 0;
        let nWin = 0;
        let refund = '0';
        for (let i = 0; i < receipt.events.length; i++) {
          const eventName = receipt.events[i].event;
          if (eventName === 'RefundNFT') {
            nNFT = receipt.events[i].args[1].toNumber();
          } else if (eventName === 'Refund') {
            refund = parseFloat(formatEther(receipt.events[i].args[1])).toFixed(
              2
            );
          } else if (eventName === 'Claim') {
            nWin = receipt.events[i].args[1].toNumber();
          }
        }
        retMsg = `${nWin}개의 미스터리박스 NFT, ${refund}${symbol}, WL NFT ${nNFT}개를 받음.`;
        console.log('== claimSubscription ==> ', retMsg);
        return [SUCCESS, retMsg];
      } else return [FAILURE, retMsg];
    }
  } catch (e) {
    console.log(e);
    return [FAILURE, ''];
  }
}

export async function getLeastFund(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<string> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let leastFund;
  try {
    if (isKaikas) {
      leastFund = await contract.methods
        .getLeastFund()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      leastFund = await contract.getLeastFund();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
    return '0';
  }

  return parseFloat(utils.formatEther(leastFund)).toString();
}

export async function getTotalFund(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<string> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let totalFund;
  try {
    if (isKaikas) {
      totalFund = await contract.methods
        .totalFund()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      totalFund = await contract.totalFund();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
    return '0';
  }

  return parseFloat(utils.formatEther(totalFund)).toString();
}

export async function getMyFund(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<string> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let myFund;
  try {
    if (isKaikas) {
      myFund = await contract.methods
        .getMyFund()
        .call({ from: account })
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyFund Error : ', err);
        });
    } else {
      myFund = await contract.getMyFund();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyFund Error : ', e);
    return '0';
  }

  return parseFloat(utils.formatEther(myFund)).toString();
}

// Common
export async function getParticipants(
  address: string,
  mechanism: number,
  account: string | undefined | null,
  library: any
): Promise<number> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] =
      mechanism === 1
        ? (subscriptionAbi as AbiItem[])
        : (evenAllocAbi as AbiItem[]);
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      mechanism === 1 ? subscriptionAbi : evenAllocAbi,
      library?.getSigner()
    );
  }

  let participants;
  let retNumber;
  try {
    if (isKaikas) {
      retNumber = await contract.methods
        .getParticipants()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      participants = await contract.getParticipants();
      retNumber = participants.toNumber();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
  }
  return retNumber;
}

export async function getAllocated(
  address: string,
  mechanism: number,
  account: string | undefined | null,
  library: any
): Promise<boolean> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] =
      mechanism === 1
        ? (subscriptionAbi as AbiItem[])
        : (evenAllocAbi as AbiItem[]);
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      mechanism === 1 ? subscriptionAbi : evenAllocAbi,
      library?.getSigner()
    );
  }

  let result;
  try {
    if (isKaikas) {
      result = await contract.methods
        .getAllocated()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      result = await contract.getAllocated();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
  }
  return result;
}

export async function getClaimed(
  address: string,
  mechanism: number,
  account: string | undefined | null,
  library: any
): Promise<boolean> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] =
      mechanism === 1
        ? (subscriptionAbi as AbiItem[])
        : (evenAllocAbi as AbiItem[]);
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      mechanism === 1 ? subscriptionAbi : evenAllocAbi,
      library?.getSigner()
    );
  }

  let result;
  try {
    if (isKaikas) {
      result = await contract.methods
        .getClaimed()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getClaimed Error : ', err);
        });
    } else {
      result = await contract.getClaimed();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getClaimed Error : ', e);
  }
  return result;
}

export async function getBooking(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<any[]> {
  const gasPrice = await caver.rpc.klay.getGasPrice();
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const contractAbi: AbiItem[] = subscriptionAbi as AbiItem[];
    contract = new caver.klay.Contract(contractAbi, address);
  } else {
    contract = new ethers.Contract(
      address,
      subscriptionAbi,
      library?.getSigner()
    );
  }

  let result;
  try {
    if (isKaikas) {
      result = await contract.methods
        .getBooking()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getMyTickets Error : ', err);
        });
    } else {
      result = await contract.getBooking();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getMyTickets Error : ', e);
  }
  return result;
}

export async function getItemMetadata(
  address: string,
  balance: number,
  account: string | undefined | null,
  library: any
): Promise<string[]> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const keyAbi: AbiItem[] = erc721Abi as AbiItem[];
    contract = new caver.klay.Contract(keyAbi, address);
  } else {
    contract = new ethers.Contract(address, erc721Abi, library?.getSigner());
  }

  const tokenId: number[] = [];
  const tokenURI: string[] = [];
  try {
    if (isKaikas) {
      for (let i = 0; i < balance; i++) {
        tokenId[i] = await contract.methods
          .tokenOfOwnerByIndex(account, i)
          .call()
          .catch(async (err: any) => {
            console.log('#####', address, account);
            console.log('getItemMetadata Error : ', err);
          });
      }
    } else {
      for (let i = 0; i < balance; i++) {
        const rlt = await contract.tokenOfOwnerByIndex(account, i);
        tokenId[i] = rlt.toNumber();
      }
    }

    // get Metadata
    if (isKaikas) {
      for (let i = 0; i < balance; i++) {
        tokenURI[i] = await contract.methods
          .tokenURI(tokenId[i])
          .call()
          .catch(async (err: any) => {
            console.log('#####', address, account);
            console.log('getItemMetadata Error : ', err);
          });
      }
    } else {
      for (let i = 0; i < balance; i++) {
        tokenURI[i] = await contract.tokenURI(tokenId[i]);
      }
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getKeyBalance Error : ', e);
  }
  return tokenURI;
}

export async function getKeyMetadata(
  address: string,
  account: string | undefined | null,
  library: any
): Promise<string> {
  const isKaikas =
    library.connection.url !== 'metamask' ||
    library.connection.url === 'eip-1193:';

  console.log(isKaikas);
  let contract: any;
  if (isKaikas) {
    // @ts-ignore : In case of Klaytn Kaikas Wallet
    const caver = new Caver(window.klaytn);
    const keyAbi: AbiItem[] = erc721Abi as AbiItem[];
    contract = new caver.klay.Contract(keyAbi, address);
  } else {
    contract = new ethers.Contract(address, erc721Abi, library?.getSigner());
  }

  let tokenURI = '';
  try {
    // get Metadata
    if (isKaikas) {
      tokenURI = await contract.methods
        .globalURI()
        .call()
        .catch(async (err: any) => {
          console.log('#####', address, account);
          console.log('getKeyMetadata Error : ', err);
        });
    } else {
      tokenURI = await contract.globalURI();
    }
  } catch (e) {
    console.log('#####', address, account);
    console.log('getKeyMetadata Error : ', e);
  }
  return tokenURI;
}
