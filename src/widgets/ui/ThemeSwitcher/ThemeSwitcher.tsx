import s from './ThemeSwitcher.module.scss';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/shared/ui/icons';
import * as Switch from '@radix-ui/react-switch';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={s.themeSwitcher}>
      <label
        htmlFor='theme-switcher'
        className={s.label}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <SunIcon />
        <Switch.Root
          id='theme-switcher'
          onCheckedChange={toggleTheme}
          checked={theme === 'dark'}
          className={s.switcher}
        >
          <Switch.Thumb className={s.thumb} />
        </Switch.Root>
        <MoonIcon />
      </label>
    </div>
  );
};
