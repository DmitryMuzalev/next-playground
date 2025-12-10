'use client';

import s from './Sidebar.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  menuItems: { label: string; path: string }[];
};

export const Sidebar = ({ menuItems }: Props) => {
  const pathname = usePathname();

  return (
    <aside className={s.sidebar}>
      <nav className={s.nav}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`${s.link} ${pathname === item.path ? s.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
