import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),

    getPostById: builder.query<Post, number>({
      query: id => `posts/${id}`,
      providesTags: ['Post'],
    }),

    getPostsByUserId: builder.query<Post[], number>({
      query: userId => `posts?userId=${userId}`,
      providesTags: ['Post'],
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: post => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation<void, number>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
