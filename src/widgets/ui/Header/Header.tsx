'use client';

import React from 'react';
import Link from 'next/link';
import s from './Header.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/posts', label: 'Посты' },
    { href: '/users', label: 'Пользователи' },
  ];

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link href='/' className={s.logoLink}>
            <Image src='/logo.svg' height={32} width={32} alt='Logo' />
          </Link>
        </div>

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
      </div>
    </header>
  );
};

export { Header };
