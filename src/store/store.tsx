import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@/store/auth_slice';

import repoSlice from './repo_slice';

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    repoSlice: repoSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const repoActions = repoSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
