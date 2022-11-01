import detectEthereumProvider from '@metamask/detect-provider';
import { ChainId, NETWORK_NAME, SCAN_URL, RPC_URLS } from '../config';
import { injected, kaikas, walletconnect } from '../hooks/connectors';
let provider: any;

const addNetwork = async (chainId: number | undefined) => {
  if (provider && provider.request) {
    try {
      if (
        chainId === ChainId.MAINNET ||
        chainId === ChainId.ROPSTEN ||
        chainId === ChainId.RINKEBY
      ) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: NETWORK_NAME[chainId],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [RPC_URLS[chainId]],
              blockExplorerUrls: [SCAN_URL[chainId]],
            },
          ],
        });
      } else if (
        chainId === ChainId.TMP ||
        chainId === ChainId.BAOBAB ||
        chainId === ChainId.KLAYTN
      ) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: NETWORK_NAME[chainId],
              nativeCurrency: {
                name: 'klay',
                symbol: 'KLAY',
                decimals: 18,
              },
              rpcUrls: [RPC_URLS[chainId]],
              blockExplorerUrls: SCAN_URL[chainId]
                ? [SCAN_URL[chainId]]
                : undefined,
            },
          ],
        });
      } else if (
        chainId === ChainId.BSCTESTNET ||
        chainId === ChainId.BSCMAINNET
      ) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: NETWORK_NAME[chainId],
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: [RPC_URLS[chainId]],
              blockExplorerUrls: [SCAN_URL[chainId]],
            },
          ],
        });
      }
    } catch (addError: any) {
      // handle "add" error
      console.error(addError);
      switch (addError.code) {
        case -32602:
          return true;
        default:
          break;
      }
      return false;
    }
  } else {
    console.error(
      'Can not setup the ethereum mainnet on metamask because window.ethereum is undefined'
    );
    return false;
  }
  return true;
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId: number | undefined) => {
  provider = await detectEthereumProvider({ mustBeMetaMask: true });

  let result;
  result = await addNetwork(chainId);

  if (provider && provider.request) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId?.toString(16)}` }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        result = await addNetwork(chainId);
        // } else if (error.code === 4001 || error instanceof UserRejectedRequestError) {
        //   recoverChainId();
        //   return false;
      }
    }
  } else {
    console.error(
      'Can not setup the ethereum mainnet on metamask because window.ethereum is undefined'
    );
    return false;
  }
  return result;
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
) => {
  let tokenAdded;
  provider = await detectEthereumProvider({ mustBeMetaMask: true });

  if (provider && provider.request) {
    tokenAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });
  }

  return tokenAdded;
};

export const getTargetWallet = (chainId: number, wallet: any) => {
  let targetWallet;
  if (chainId === 8217 || chainId === 1001) {
    targetWallet = wallet.klaytn.wallet;
  } else if (chainId === 1 || chainId === 3) {
    targetWallet = wallet.ethereum.wallet;
  } else if (chainId === 56 || chainId === 97) {
    targetWallet = wallet.binance.wallet;
  }
  return targetWallet;
};

export const checkKaikas = (library: any) => {
  return library.provider.isWalletConnect
    ? false
    : library.connection.url !== 'metamask' ||
        library.connection.url === 'eip-1193:';
};

export const checkConnectWallet = async (
  chainId: number,
  wallet: any,
  activate: any
) => {
  const targetWallet = getTargetWallet(chainId, wallet);
  if (!targetWallet) return false;
  if (targetWallet === 'metamask') {
    await activate(injected, undefined, true).catch((e: any) => {
      console.log(e);
    });
  } else if (targetWallet === 'kaikas') {
    await activate(kaikas, undefined, true).catch((e: any) => {
      console.log(e);
    });
  } else if (targetWallet === 'walletconnect') {
    const wc = walletconnect(false);
    await activate(wc);
  }
  await setupNetwork(chainId);
  return true;
};
