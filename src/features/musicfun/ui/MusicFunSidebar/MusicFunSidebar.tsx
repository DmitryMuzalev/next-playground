import { Sidebar } from '@/widgets/ui';

export function MusicFunSidebar() {
  const items = [
    { label: 'Main', path: '/musicfun' },
    { label: 'Playlists', path: '/musicfun/playlists' },
    { label: 'Tracks', path: '/musicfun/tracks' },
    { label: 'Profile', path: '/musicfun/profile' },
  ];

  return <Sidebar menuItems={items} />;
}
