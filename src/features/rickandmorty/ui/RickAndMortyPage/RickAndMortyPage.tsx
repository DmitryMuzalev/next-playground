import React, { useState, useMemo } from 'react';
import { useGetCharactersQuery } from '../../api';
import { SearchBar } from '@/shared/ui/components';
import { Error, Loading } from '@/widgets/ui';
import { CharacterCard } from './CharacterCard';

import s from './RickAndMortyPage.module.scss';

export const RickAndMortyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useGetCharactersQuery();

  const filteredCharacters = useMemo(() => {
    if (!data?.results) return [];

    return data.results.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.results, searchTerm]);

  return (
    <>
      <div className={`container ${s.homePage}`}>
        <div className={s.searchSection}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder='Search characters by name...'
          />
          {searchTerm && (
            <p className={s.resultsCount}>
              Found {filteredCharacters.length} character
              {filteredCharacters.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          )}
        </div>

        <main className={s.main}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error message='Failed to load characters. Please try again.' />
          ) : filteredCharacters.length === 0 ? (
            <div className={s.noResults}>
              <h3>No characters found</h3>
              <p>Try adjusting your search or browse all characters</p>
              {searchTerm && (
                <button className={s.clearSearchButton} onClick={() => setSearchTerm('')}>
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className={s.charactersGrid}>
              {filteredCharacters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </main>

        {!isLoading && !error && filteredCharacters.length > 0 && (
          <footer className={s.footer}>
            <p className={s.totalCount}>
              Showing {filteredCharacters.length} of {data?.info?.count} characters
            </p>
          </footer>
        )}
      </div>
    </>
  );
};
