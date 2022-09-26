import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducers from './Rootreducers';

export function configureStore() {
  // TODO : using the configureStore method of the @reduxjs/toolkit recommended
  return createStore(
    RootReducers,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export type RootState = ReturnType<typeof RootReducers>;
