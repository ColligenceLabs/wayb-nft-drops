import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { Web3Provider } from '@ethersproject/providers';

// ----------------------------------------------------------------------

const initialState = {
  error: false,
  activatingConnector: {},
  account: null,
  balance: null,
  talBalance: null,
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
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
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  hasError,
  setActivatingConnector,
  setBalance,
  setTalBalance,
  setAccount,
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
