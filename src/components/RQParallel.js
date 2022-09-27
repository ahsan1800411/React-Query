import { useQuery } from 'react-query';
import axios from 'axios';

export default function RQParallel() {
  const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
  };
  const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends');
  };

  useQuery('super-heroes', fetchSuperHeroes);
  useQuery('friends', fetchFriends);
  return <></>;
}
