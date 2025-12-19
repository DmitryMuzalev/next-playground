import s from './PlaylistDescription.module.scss';
import type { PlaylistAttributes } from '@/features/musicfun/playlist';

type Props = {
  attributes: PlaylistAttributes;
};

export function PlaylistDescription({ attributes }: Props) {
  const { title, description, user } = attributes;

  return (
    <>
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>
      <div className={s.user}>{user.name}</div>
    </>
  );
}
