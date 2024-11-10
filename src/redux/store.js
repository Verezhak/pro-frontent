

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { boardsReducer } from "./boards/slice.js";
import { cardsReducer } from "./card/slice.js";
import { columnsReducer } from './columns/slice.js'
// import { columnsReducer } from "./columns/slice.js";
import { setAuthHeader } from './auth/operations.js';
import { userReducer } from "./user/slice.js";
import { authReducer } from "./auth/slice.js";
const persistedToken = localStorage.getItem('token');
if (persistedToken) {
  setAuthHeader(persistedToken)
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['name', 'email', 'theme', 'avatar', '_id'],
};


export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: persistReducer(userPersistConfig, userReducer),
    boards: boardsReducer,
    columns: columnsReducer,
    cards: cardsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
