import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: {
    address: '',
    name: '',
    email: '',
    role: '',
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    initDropsAccount: (state) => {
      state.account = {
        address: '',
        name: '',
        email: '',
        role: '',
      };
    },
    setDropsAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { initDropsAccount, setDropsAccount } = accountSlice.actions;

export default accountSlice.reducer;
