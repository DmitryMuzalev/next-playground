"use client"
import { Header } from '@/widgets/ui';
import './globals.scss';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <Header />
          <div className='container'>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
