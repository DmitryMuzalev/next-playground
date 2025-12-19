import type { ChangeEvent } from 'react';
import { DEFAULT_COVER } from '@/shared/constants';
import s from './PlaylistCover.module.scss';

import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/musicfun/playlist';
import type { Images } from '@/shared/types/musicfun';
import { toast } from 'react-toastify';

type Props = {
  playlistId: string;
  images: Images;
};

export function PlaylistCover({ playlistId, images }: Props) {
  const cover = images.main.find(img => img.type === 'original');
  const src = cover ? cover.url : DEFAULT_COVER;

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();
  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const file = event.target.files?.length && event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast('Only JPEG, PNG or GIF images are allowed', { type: 'error', theme: 'colored' });
      return;
    }

    if (file.size > maxSize) {
      toast(`The file is too large (max. ${Math.round(maxSize / 1024)} KB)`, {
        type: 'error',
        theme: 'colored',
      });
      return;
    }

    uploadPlaylistCover({ playlistId: playlistId, file });
  };

  const deletePlaylistCoverHandler = () => deletePlaylistCover(playlistId);

  return (
    <>
      <input type='file' onChange={uploadCoverHandler} />
      <img src={src} alt='' className={s.cover} />
      {cover && <button onClick={deletePlaylistCoverHandler}>delete cover</button>}
    </>
  );
}
