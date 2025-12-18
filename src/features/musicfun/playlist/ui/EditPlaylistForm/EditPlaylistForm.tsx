import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useUpdatePlaylistMutation, type UpdatePlaylistArgs } from '../../api';

type Props = {
  playlistId: string;
  setPlaylistId: (playlistId: null) => void;
  editPlaylist: (playlist: null) => void;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
};

export function EditPlaylistForm({
  playlistId,
  editPlaylist,
  register,
  handleSubmit,
  setPlaylistId,
}: Props) {
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
    if (!playlistId) return;
    updatePlaylist({ playlistId, body: data }).then(() => {
      setPlaylistId(null);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type='submit'>save</button>
      <button type='button' onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
}
