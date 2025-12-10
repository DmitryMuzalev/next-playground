'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Main', path: '/musicfun' },
    { label: 'Playlists', path: '/musicfun/playlists' },
    { label: 'Tracks', path: '/musicfun/tracks' },
    { label: 'Profile', path: '/musicfun/profile' },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
