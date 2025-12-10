import { playlistApi } from '@/features/musicfun/playlist/api/playlistApi';
import { postsApi } from '@/features/posts/api';
import { rickAndMortyApi } from '@/features/rickandmorty/api/rickAndMortyApi';
import { usersApi } from '@/features/users/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
      .concat(rickAndMortyApi.middleware)
      .concat(playlistApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
