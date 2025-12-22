import { useFetchPlaylistsQuery } from '../api/playlistApi';

import { useDebounceValue } from '@/shared/hooks';
import { Pagination } from '@/shared/ui/components';
import { useState } from 'react';
import { CreatePlaylistForm } from './CreatePlaylistForm';
import s from './PlaylistPage.module.scss';
import PlaylistsList from './PlaylistsList/PlaylistsList';

export function PlaylistPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const debouncedSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debouncedSearch,
    pageNumber: currentPage,
    pageSize,
  });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  const playlists = data?.data || [];

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>MusicFun Playlists</h2>
      <CreatePlaylistForm />
      <input
        type='search'
        placeholder={'Search playlist by title'}
        onChange={e => searchPlaylistHandler(e)}
      />
      <PlaylistsList playlists={playlists} isPlaylistLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
        pagesCount={data?.meta.pagesCount || 1}
      />
    </div>
  );
}
