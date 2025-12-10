'use client';

import Sidebar from '@/widgets/ui/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className='content'>{children}</div>
    </>
  );
}
