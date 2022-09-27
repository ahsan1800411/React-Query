import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

export const DynamicParallelQuery = ({ ids }) => {
  const fetchSuperHeroes = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  };
  useQueries(
    ids.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );
  return <div></div>;
};
