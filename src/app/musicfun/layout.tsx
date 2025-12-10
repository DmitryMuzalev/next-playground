'use client';

import { MusicFunSidebar } from '@/features/musicfun/ui';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MusicFunSidebar />
      <div className='content'>{children}</div>
    </>
  );
}
