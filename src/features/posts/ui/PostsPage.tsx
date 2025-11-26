import s from './PostsPage.module.scss';
import { useMemo } from 'react';
import { useGetUsersQuery } from '@/features/users/api';
import { useGetPostsQuery } from '../api';
import { Loading, Error } from '@/widgets/ui';

export function PostsPage() {
  const { data: posts, isLoading: isLoadingPosts, error: postsError } = useGetPostsQuery();
  const { data: users, isLoading: isLoadingUsers, error: usersError } = useGetUsersQuery();

  const shuffledPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort(() => 0.5 - Math.random());
  }, [posts]);

  const usersMap = useMemo(() => {
    if (!users) return new Map();
    return new Map(users.map(user => [user.id, user]));
  }, [users]);

  const getUserName = (userId: number) => {
    const user = usersMap.get(userId);
    return user ? user.name : `User ${userId}`;
  };

  if (isLoadingPosts || isLoadingUsers) {
    return <Loading message='Loading posts...' />;
  }

  if (postsError || usersError) {
    return <Error message='Error loading data' />;
  }

  return (
    <>
      <div className={s.postsGrid}>
        {shuffledPosts.map(post => (
          <article key={post.id} className={s.postCard}>
            <h3 className={s.postTitle}>{post.title}</h3>
            <div className={s.postMeta}>
              <span>{getUserName(post.userId)}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
