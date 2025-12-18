import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const musicfunBaseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MUSICFUN_BASE_URL,
    headers: {
      'API-KEY': '',
    },
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${''}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
