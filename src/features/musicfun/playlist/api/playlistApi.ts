import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { PlaylistsResponse } from './playlistsApi.types'; /* FetchPlaylistsArgs */

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'API-KEY': '' /* process.env.API_KEY as string */, //TODO: Fix it
    },
  }),
  tagTypes: ['Playlist'],
  endpoints: build => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      //FetchPlaylistsArgs
      query: () => ({
        method: 'GET',
        url: 'playlists',
      }),
      providesTags: ['Playlist'],
    }),
  }),
});

export const { useFetchPlaylistsQuery } = playlistApi;
