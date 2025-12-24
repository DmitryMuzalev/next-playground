import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, CharactersRequestArgs, CharactersResponse } from './types';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  tagTypes: ['RickAndMorty'],
  endpoints: builder => ({
    getCharacters: builder.query<CharactersResponse, CharactersRequestArgs>({
      query: () => 'character',
      providesTags: ['RickAndMorty'],
    }),

    getCharacterById: builder.query<Character, number>({
      query: id => `character/${id}`,
      providesTags: ['RickAndMorty'],
    }),

    getCharactersByPage: builder.query<CharactersResponse, number>({
      query: page => `character/?page=${page}`,
      providesTags: ['RickAndMorty'],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery, useGetCharactersByPageQuery } =
  rickAndMortyApi;
