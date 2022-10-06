import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Buffer } from 'buffer';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';

import { ethers } from 'taalswap-ethers';
import { Web3ReactProvider } from '@web3-react/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// function getLibrary(provider: any): Web3Provider {
function getLibrary(provider: any) {
  // const library = new Web3Provider(provider);
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

// To solve WalletConnector error : Buffer is not defined
window.Buffer = window.Buffer || Buffer;

const store = configureStore();
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>
);
