import React from 'react';
import Link from 'next/link';
import s from './CharacterCard.module.scss';
import type { Character } from '@/features/rickandmorty/api/types';

type Props = {
  character: Character;
};

export const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <Link href={`rickandmorty/character/${character.id}`} className={s.link}>
      <div className={s.characterCard}>
        <div className={s.imageContainer}>
          <img src={character.image} alt={character.name} className={s.image} />
        </div>
        <div className={s.content}>
          <h3 className={s.name}>{character.name}</h3>
          <div className={s.info}>
            <div className={s.status}>
              <span className={`${s.statusIndicator} ${s[character.status.toLowerCase()]}`} />
              <span className={s.statusText}>
                {character.status} - {character.species}
              </span>
            </div>
            <div className={s.detail}>
              <p className={s.label}>Last known location:</p>
              <p className={s.value}>{character.location.name}</p>
            </div>
            <div className={s.detail}>
              <p className={s.label}>Origin:</p>
              <p className={s.value}>{character.origin.name}</p>
            </div>
            {character.type && (
              <div className={s.detail}>
                <p className={s.label}>Type:</p>
                <p className={s.value}>{character.type}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
