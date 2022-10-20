import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: {
    address: '',
    banner_image: '',
    createdAt: '',
    instagram: '',
    name: '',
    profile_image: '',
    site: '',
    twitter: '',
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
        banner_image: '',
        createdAt: '',
        instagram: '',
        name: '',
        profile_image: '',
        site: '',
        twitter: '',
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
