import { type PlaylistData } from '@/features/musicfun/playlist';
import { PlaylistCover } from './PlaylistCover';
import { PlaylistDescription } from './PlaylistDescription';

type Prop = {
  playlist: PlaylistData;
  deletePlaylist: (id: string) => void;
  editPlaylist: (playlist: PlaylistData) => void;
};

export function PlaylistItem({ playlist, deletePlaylist, editPlaylist }: Prop) {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>edit</button>
    </div>
  );
}
