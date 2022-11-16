import React, { useState } from 'react';
import Caver from 'caver-js';
import Web3Token from 'web3-token';
import { getAccount } from '../services/services';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetStateAction } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { setDropsAccount } from '../redux/slices/account';
import { useWeb3React } from '@web3-react/core';

interface StudioAccount {
  address: 'string';
  name: 'string';
  email: 'string';
  role: 'string';
}

const useCreateToken = (setDoSign: SetStateAction<any>) => {
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createToken = async () => {
    localStorage.removeItem('dropsJwtToken');

    if (library !== undefined) {
      const isKaikas = library.provider.isWalletConnect
        ? false
        : library?.connection.url !== 'metamask' ||
          library?.connection.url === 'eip-1193:';

      try {
        let token;
        if (isKaikas) {
          // @ts-ignore : In case of Klaytn Kaikas Wallet
          const caver = new Caver(window.klaytn);
          // @ts-ignore TS2693: only refers to a type
          token = await Web3Token.sign(
            async (msg: string) => await caver.klay.sign(msg, account ?? ''),
            // TODO : 아래 함수로 처리가 되는 것이 맞으나... klaytn-connector애서 뭘 수정해야 하지?
            //        에러 = unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION
            // async () => await library.getSigner().signMessage(account),
            {
              domain: 'apps.talken.io',
              expires_in: '1 days',
              statement: 'Talken Drops Sign In',
              wallet: 'kaikas',
            }
          );
        } else {
          // @ts-ignore TS2693: only refers to a type
          token = await Web3Token.sign(
            async (msg: string) => await library.getSigner().signMessage(msg),
            {
              domain: 'apps.talken.io',
              expires_in: '1 days',
              statement: 'Talken Drops Sign In',
            }
          );
        }
        localStorage.setItem('dropsJwtToken', token);

        // Check User Role
        const resp = await getAccount(token);
        if (resp.data.status === 0) return 'notRegistered';

        const studioAccount: StudioAccount = resp.data;
        dispatch(setDropsAccount(studioAccount));
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };
  return { createToken };
};

export default useCreateToken;
