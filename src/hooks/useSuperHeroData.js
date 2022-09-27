import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = ({ queryKey }) => {
  // queryKey represents the array that is in the first argument of the useQuery we need a id so it's index is 1
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(['super-heroes', heroId], fetchSuperHeroes, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
