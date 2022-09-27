import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, isError, error, data } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>{data.data.name}</div>;
};

export default RQSuperHero;
