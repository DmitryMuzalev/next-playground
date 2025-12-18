import type { PlaylistData } from '../../api';
import s from './PlaylistItem.module.scss';

type Prop = {
  playlist: PlaylistData;
  deletePlaylist: (id: string) => void;
  editPlaylist: (playlist: PlaylistData) => void;
};

export function PlaylistItem({ playlist, deletePlaylist, editPlaylist }: Prop) {
  return (
    <div>
      <div className={s.playlistTitle}>{playlist.attributes.title}</div>
      <div className={s.playlistDescription}>{playlist.attributes.description}</div>
      <div className={s.playlistUser}>{playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>edit</button>
    </div>
  );
}
