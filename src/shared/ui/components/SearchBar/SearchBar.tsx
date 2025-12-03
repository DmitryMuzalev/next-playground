import React from 'react';
import s from './SearchBar.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search characters by name...',
}) => {
  return (
    <div className={s.searchBar}>
      <div className={s.searchIcon}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.35-4.35' />
        </svg>
      </div>
      <input
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={s.input}
      />
      {value && (
        <button className={s.clearButton} onClick={() => onChange('')} aria-label='Clear search'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </button>
      )}
    </div>
  );
};
