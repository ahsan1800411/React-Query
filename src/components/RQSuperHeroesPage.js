import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddHero, useSuperHeroesData } from './../hooks/useSuperHeroesData';

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  const onSuccess = (data) => {
    // console.log(data);
  };
  const onError = (error) => {
    console.log(error);
  };

  const { isLoading, data, isError, error } = useSuperHeroesData(
    onError,
    onSuccess
  );
  const { mutate } = useAddHero();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleClick = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </div>
  );
};

export default RQSuperHeroesPage;
