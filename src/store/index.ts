import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth.slices';
import articleFeedReducer from './slices/articleFeed.slice';
import adminReducer from './slices/admin.slices';

// REDUX-PERSIST

export const persistConfig = {
  key: 'root',
  storage,
};

export const persistedReducer = persistReducer(persistConfig, authReducer);

export const reducer = combineReducers({
  // FIXME: Just store the data where it is needed, use multiple stores
  articleFeed: articleFeedReducer,
  admin: adminReducer,
});

const store = configureStore({
  reducer: { reducer, persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
