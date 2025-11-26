'use client';

import { Error, Loading } from '@/widgets/ui';
import { useGetUsersQuery } from '../api';
import s from './UsersPage.module.scss';

export function UsersPage() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <Loading message='Loading users...' />;
  }

  if (isError) {
    return <Error message='Error loading data' />;
  }

  if (!users?.length) {
    return (
      <div className={s.empty}>
        <h2>No users found</h2>
        <p>There are no users to display.</p>
      </div>
    );
  }

  return (
    <div className={s.usersPage}>
      <div className={s.usersGrid}>
        {users.map(user => (
          <article key={user.id} className={s.userCard}>
            <div className={s.userHeader}>
              <div className={s.userAvatar}>{user.name.charAt(0)}</div>
              <div className={s.userInfo}>
                <h3 className={s.userName}>{user.name}</h3>
                <p className={s.userUsername}>@{user.username}</p>
                <p className={s.userEmail}>{user.email}</p>
              </div>
            </div>

            <div className={s.userDetails}>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>City:</span>
                <span className={s.detailValue}>{user.address.city}</span>
              </div>
              <div className={s.detailItem}>
                <span className={s.detailLabel}>Company:</span>
                <span className={s.detailValue}>{user.company.name}</span>
              </div>
            </div>

            <div className={s.userActions}>
              <button className={s.actionButton}>View Posts</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
