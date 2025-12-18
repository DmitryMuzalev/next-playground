import { Loading } from '@/widgets/ui';
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '../api/playlistApi';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PlaylistData, UpdatePlaylistArgs } from '../api';
import { CreatePlaylistForm } from './CreatePlaylistForm';
import { EditPlaylistForm } from './EditPlaylistForm/EditPlaylistForm';
import s from './PlaylistPage.module.scss';
import { PlaylistItem } from './PlaylistItem';

export function PlaylistPage() {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data, isLoading } = useFetchPlaylistsQuery({});
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
      <div className={s.playlistsGrid}>
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
