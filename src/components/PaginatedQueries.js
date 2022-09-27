import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const PaginatedQueries = () => {
  const fetchColors = (pageNumber) => {
    return axios(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const { isError, error, isLoading, data } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data.data.map((color) => (
        <>
          <div>{color.label}</div>
        </>
      ))}
      <button
        onClick={() => setPageNumber((page) => page - 1)}
        disabled={pageNumber === 1}
      >
        Prev
      </button>
      <button
        onClick={() => setPageNumber((page) => page + 1)}
        disabled={pageNumber === 4}
      >
        Next
      </button>
    </div>
  );
};

export default PaginatedQueries;
