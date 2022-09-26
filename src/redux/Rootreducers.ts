import { combineReducers } from 'redux';
import wallet from '../redux/slices/wallet';
import account from '../redux/slices/account';

const RootReducers = combineReducers({
  wallet,
  account,
});

export default RootReducers;
