import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchByEmail = (email) => {
  return axios(`http://localhost:4000/users/${email}`);
};
const fetchCourses = (courses) => {
  return axios(`http://localhost:4000/channels/${courses}`);
};

export default function DependentQueries({ email }) {
  const { data } = useQuery(['user', email], () => fetchByEmail(email));
  const channelId = data?.data.channelId;
  const { data: courses } = useQuery(
    ['courses', channelId],
    () => fetchCourses(channelId),
    {
      enabled: !!channelId,
    }
  );
  console.log(courses);
  return <div>DependentQueries</div>;
}
