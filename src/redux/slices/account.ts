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
    initKlaybayAccount: (state) => {
      state.account = {
        address: '',
        name: '',
        email: '',
        role: '',
      };
    },
    setKlaybayAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { initKlaybayAccount, setKlaybayAccount } = accountSlice.actions;

export default accountSlice.reducer;
