import { musicfunBaseApi } from '../../api';
import type { MeResponse } from './authApi.types';

export const authApi = musicfunBaseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<MeResponse, void>({
      query: () => 'auth/me',
    }),
  }),
});

export const { useGetMeQuery } = authApi;
