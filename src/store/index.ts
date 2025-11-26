import { postsApi } from '@/features/posts/api';
import { usersApi } from '@/features/users/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postsApi.middleware).concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
