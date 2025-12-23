'use client';

import { useGetMeQuery } from '@/features/musicfun';

export default function MusicFun() {
  const { data } = useGetMeQuery();

  return (
    <div>
      <h1>Main page</h1>
      <div>login: {data?.login} </div>
    </div>
  );
}
