'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import s from './Header.module.scss';
import { ThemeSwitcher } from '@/widgets/ui';

const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/users', label: 'Users' },
  ];

  return (
    <header className={s.header}>
      <div className={s.container}>
        <nav className={s.nav}>
          <ul className={s.navList}>
            {navItems.map(item => (
              <li key={item.href} className={s.navItem}>
                <Link
                  href={item.href}
                  className={`${s.navLink} ${pathname === item.href ? s.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export { Header };
