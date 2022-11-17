import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected, kaikas, abc, walletconnect } from './connectors';
import env from '../env';
import useActiveWeb3React from './useActiveWeb3React';
import { setupNetwork } from '../utils/wallet';
import { useSelector } from 'react-redux';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);
  const wallets = useSelector((state: any) => state.wallet);

  useEffect(() => {
    const walletStatus =
      window.localStorage.getItem('walletStatus') ?? 'disconnected';
    // const connectorId = window.localStorage.getItem('wallet') ?? 'injected';
    // console.log('=====>', wallets);
    if (walletStatus === 'connected') {
      if (wallets.klaytn.wallet === 'metamask') {
        // if (!connectorId || connectorId === 'injected') {
        injected.isAuthorized().then(async (isAuthorized: boolean) => {
          if (isAuthorized) {
            await setupNetwork(env.REACT_APP_TARGET_NETWORK_KLAY ?? 8217);

            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            console.log('@@@@@@@@@@@@@@@@@@@');
            setTried(true);
          }
        });
      }
      if (wallets.klaytn.wallet === 'kaikas') {
        // if (!connectorId || connectorId === 'kaikas') {
        kaikas.isAuthorized().then(async (isAuthorized: boolean) => {
          // Caution : Kaikas alway return false
          if (isAuthorized) {
            await setupNetwork(env.REACT_APP_TARGET_NETWORK_KLAY ?? 8217);
            activate(kaikas, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        });
      }
      if (wallets.klaytn.wallet === 'walletconnect') {
        // if (!connectorId || connectorId === 'walletconnect') {
        const wc = walletconnect(false);
        activate(wc);
      }
      if (wallets.klaytn.wallet === 'abcWallet') {
        abc.isAuthorized().then(async (isAuthorized: boolean) => {
          console.log(isAuthorized);
          if (isAuthorized) {
            await setupNetwork(env.REACT_APP_TARGET_NETWORK_KLAY ?? 8217);

            activate(abc, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            console.log('@@@@@@@@@@@@@@@@@@@');
            setTried(true);
          }
        });
      }
    }
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();
  const wallets = useSelector((state: any) => state.wallet);

  useEffect((): any => {
    const { ethereum, klaytn, abc } = window as any;
    let connector: any;
    if (wallets.klaytn.wallet === 'ethereum') connector = ethereum;
    if (wallets.klaytn.wallet === 'klaytn') connector = klaytn;
    if (wallets.klaytn.wallet === 'abcWallet') connector = abc;

    if (connector && connector.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('Handling "connect" event');
        activate(connector);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling "chainChanged" event with payload', chainId);
        activate(connector);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('Handling "accountsChanged" event with payload', accounts);
        if (accounts.length > 0) {
          activate(connector);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log('Handling "networkChanged" event with payload', networkId);
        activate(connector);
      };

      connector.on('connect', handleConnect);
      connector.on('chainChanged', handleChainChanged);
      connector.on('accountsChanged', handleAccountsChanged);
      connector.on('networkChanged', handleNetworkChanged);

      return () => {
        if (connector.removeListener) {
          connector.removeListener('connect', handleConnect);
          connector.removeListener('chainChanged', handleChainChanged);
          connector.removeListener('accountsChanged', handleAccountsChanged);
          connector.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
