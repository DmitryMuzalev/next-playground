import s from './PlaylistsList.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDeletePlaylistMutation, type PlaylistData, type UpdatePlaylistArgs } from '../../api';
import { EditPlaylistForm } from '../EditPlaylistForm';
import { PlaylistItem } from '../PlaylistItem';
import { Loading } from '@/widgets/ui';

type Props = {
  playlists: PlaylistData[];
  isPlaylistLoading: boolean;
};

export default function PlaylistsList({ playlists, isPlaylistLoading }: Props) {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
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

  if (isPlaylistLoading) {
    return <Loading message='Loading playlists' />;
  }

  return (
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
  );
}
