import React from 'react';

import Link from 'next/link';
import s from './CharacterPage.module.scss';
import { Error, Loading } from '@/widgets/ui';
import { useGetCharacterByIdQuery } from '../../api';
import { useParams } from 'next/navigation';

export const CharacterPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const { data: character, isLoading, error } = useGetCharacterByIdQuery(Number(id), { skip: !id });

  if (isLoading) {
    return (
      <div className={`container ${s.characterPage}`}>
        <Loading />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className={`container ${s.characterPage}`}>
        <Error message='Character not found or failed to load.' />
      </div>
    );
  }

  return (
    <>
      <div className={`container ${s.characterPage}`}>
        <Link href='/rickandmorty' className={s.backButton}>
          ← Back to Characters
        </Link>

        <div className={s.characterContainer}>
          <div className={s.characterImage}>
            <img src={character.image} alt={character.name} />
          </div>

          <div className={s.characterInfo}>
            <h1 className={s.characterName}>{character.name}</h1>

            <div className={s.infoSection}>
              <h2 className={s.sectionTitle}>Basic Information</h2>
              <div className={s.infoGrid}>
                <div className={s.infoItem}>
                  <span className={s.infoLabel}>Status</span>
                  <div className={s.infoValue}>
                    <span className={`${s.statusIndicator} ${s[character.status.toLowerCase()]}`} />
                    {character.status}
                  </div>
                </div>
                <div className={s.infoItem}>
                  <span className={s.infoLabel}>Species</span>
                  <span className={s.infoValue}>{character.species}</span>
                </div>
                <div className={s.infoItem}>
                  <span className={s.infoLabel}>Gender</span>
                  <span className={s.infoValue}>{character.gender}</span>
                </div>
                {character.type && (
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Type</span>
                    <span className={s.infoValue}>{character.type}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={s.infoSection}>
              <h2 className={s.sectionTitle}>Origin & Location</h2>
              <div className={s.infoGrid}>
                <div className={s.infoItem}>
                  <span className={s.infoLabel}>Origin</span>
                  <span className={s.infoValue}>{character.origin.name}</span>
                </div>
                <div className={s.infoItem}>
                  <span className={s.infoLabel}>Last Known Location</span>
                  <span className={s.infoValue}>{character.location.name}</span>
                </div>
              </div>
            </div>

            {character.episode && character.episode.length > 0 && (
              <div className={s.infoSection}>
                <h2 className={s.sectionTitle}>Appearances</h2>
                <p className={s.episodeCount}>
                  Appeared in {character.episode.length} episode
                  {character.episode.length !== 1 ? 's' : ''}
                </p>
                <div className={s.episodeList}>
                  {character.episode.slice(0, 10).map((episodeUrl: string) => {
                    const episodeNumber = episodeUrl.split('/').pop();
                    return (
                      <span key={episodeUrl} className={s.episodeBadge}>
                        Episode {episodeNumber}
                      </span>
                    );
                  })}
                  {character.episode.length > 10 && (
                    <span className={s.moreEpisodes}>+{character.episode.length - 10} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
