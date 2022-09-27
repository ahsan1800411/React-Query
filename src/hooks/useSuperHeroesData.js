import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};
const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};
export const useSuperHeroesData = (onError, onSuccess) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onError,
    onSuccess,
    // select: (data) => data.data.map((hero) => hero.name),
    // refetchInterval: 2000,
  });
};

export const useAddHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes');
    //   queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');
      const prevQueryData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data.length + 1, ...newHero },
          ],
        };
      });
      return {
        prevQueryData,
      };
    },
    onError: (error, newHero, ctx) => {
      queryClient.setQueryData('super-heroes', ctx.prevQueryData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
