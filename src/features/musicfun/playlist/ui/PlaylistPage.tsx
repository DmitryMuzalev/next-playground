import { Loading } from '@/widgets/ui';
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '../api/playlistApi';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PlaylistData, UpdatePlaylistArgs } from '../api';
import { CreatePlaylistForm } from './CreatePlaylistForm';
import { EditPlaylistForm } from './EditPlaylistForm/EditPlaylistForm';
import s from './PlaylistPage.module.scss';
import { PlaylistItem } from './PlaylistItem';
import { useDebounceValue } from '@/shared/hooks';

export function PlaylistPage() {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const debouncedSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({ search: debouncedSearch });

  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map(t => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  const playlists = data?.data || [];

  if (isLoading) {
    return <Loading message='Loading playlists' />;
  }

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>MusicFun Playlists</h2>
      <CreatePlaylistForm />
      <input
        type='search'
        placeholder={'Search playlist by title'}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      <div className={s.playlistsGrid}>
        {playlists.length === 0 && <p>No playlists found.</p>}
        {playlists.map(playlist => {
          const isEditing = playlistId === playlist.id;
          return (
            <div className={s.playlistCard} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  setPlaylistId={setPlaylistId}
                  editPlaylist={editPlaylistHandler}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
