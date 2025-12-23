import { useGetMeQuery } from '../api';

export const MusicFunProfilePage = () => {
  const { data } = useGetMeQuery();

  return <h1>{data?.login} page</h1>;
};
