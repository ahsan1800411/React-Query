import axios from 'axios';
import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

const InfiniteQueries = () => {
  const fetchColors = ({ pageParam = 1 }) => {
    return axios(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
  };

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('colors', fetchColors, {
    getNextPageParam: (_, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((color) => {
            return <div>{color.label}</div>;
          })}
        </Fragment>
      ))}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      {isFetching && !isFetchingNextPage ? 'Fetching' : null}
    </div>
  );
};

export default InfiniteQueries;
