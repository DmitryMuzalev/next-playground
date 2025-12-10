'use client';

import { useFetchPlaylistsQuery } from '@/features/musicfun/playlist/api/playlistApi';

export default function Playlists() {
  const res = useFetchPlaylistsQuery();
  console.log(res);

  return <h2>MusicFun Playlists</h2>;
}
