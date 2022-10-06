import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { Web3Provider } from '@ethersproject/providers';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null,
  talBalance: null,
  ethereum: {},
  klaytn: {},
  solana: {},
  binance: {},
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    initWallets(state) {
      state.ethereum = {};
      state.klaytn = {};
      state.solana = {};
      state.binance = {};
    },
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // WALLET ACTIVE
    setActivatingConnector(state, action) {
      state.activatingConnector = action.payload;
    },

    // BALANCE
    setBalance(state, action) {
      state.balance = action.payload;
    },

    // ACCOUNT
    setAccount(state, action) {
      state.account = action.payload;
    },

    // TAL BALANCE
    setTalBalance(state, action) {
      state.talBalance = action.payload;
    },

    setKlaytn(state, action) {
      state.klaytn = action.payload;
    },

    setSolana(state, action) {
      state.solana = action.payload;
    },

    setEthereum(state, action) {
      state.ethereum = action.payload;
    },

    setBinance(state, action) {
      state.binance = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  initWallets,
  hasError,
  setActivatingConnector,
  setBalance,
  setTalBalance,
  setAccount,
  setKlaytn,
  setSolana,
  setEthereum,
  setBinance,
} = slice.actions;

// ----------------------------------------------------------------------

export function getWalletBalance(account: string, library: Web3Provider) {
  return async (dispatch: Dispatch) => {
    try {
      if (!!account && !!library) {
        library
          .getBalance(account)
          .then((balance: any) => {
            dispatch(slice.actions.setBalance(balance));
            dispatch(slice.actions.setAccount(account));
          })
          .catch(() => {
            dispatch(slice.actions.setBalance(null));
            dispatch(slice.actions.setAccount(null));
          });
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}
