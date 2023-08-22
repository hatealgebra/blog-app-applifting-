import { configureStore } from '@reduxjs/toolkit';

import { persistStore } from 'redux-persist';
import articleDetailReponseJSON from '@mocks/asyncData/get/articlesDetailsResponse.mock.json';
import { UserConfig } from '../services/services.config';
import { reducer, persistedReducer, persistConfig } from '../store';
// REDUX-PERSIST

const { TENANT_ID, CREATED_AT, LAST_USED_AT, NAME } = UserConfig;

const mockStore = configureStore({
  reducer: { reducer, persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: {
    reducer: {
      articleFeed: {
        status: 'idle',
        data: { items: undefined },
        error: false,
      },
      admin: {
        status: 'idle',
        error: false,
        data: {
          articleToEdit: articleDetailReponseJSON.items[0],
          originalSort: {},
          nowSort: {},
        },
      },
    },
    persistedReducer: {
      status: 'idle',
      data: {
        tenant: {
          tenantId: TENANT_ID,
          createdAt: CREATED_AT,
          lastUsedAt: LAST_USED_AT,
          name: NAME,
        },
        login: { email: NAME, pwd: 'MockPwd12345' },
        authorization: {},
      },
      error: false,
      _persist: { ...persistConfig, version: 0, rehydrated: true },
    },
  },
  devTools: true,
});

export const persistor = persistStore(mockStore);
export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;

export default mockStore;
