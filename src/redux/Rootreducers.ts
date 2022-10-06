import { combineReducers } from 'redux';
import wallet from '../redux/slices/wallet';
import account from '../redux/slices/account';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['wallet', 'account'],
  // blacklist -> 그것만 제외합니다
};

const RootReducers = combineReducers({
  wallet,
  account,
});

// export default RootReducers;
export default persistReducer(persistConfig, RootReducers);
