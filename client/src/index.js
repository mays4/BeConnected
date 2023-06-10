import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer  from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persisStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
// to save the info when close tab or browser for session 
import { storage } from 'redux-persist/lib/storge';
import { PersistGate } from 'redux-persist/integration/react';
import persistReducer from 'redux-persist/es/persistReducer';
import { getDefaultNormalizer } from '@testing-library/react';


const persistConfig = {key:"root",storage, version:1};
const persistReducer= persistReducer(persistConfig,authReducer);
const store = configureStore({
  reducer:(getDefaultMiddleware)=>

getDefaultMiddleware({
  serializablecheck:{
    igoredActions :[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
  }
})
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor = {persisStore(store)}>
       <App />
       </PersistGate>
    </Provider>
   
    <App />
  </React.StrictMode>
);


