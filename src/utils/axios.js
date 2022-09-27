import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000',
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Autorization = 'Bearer Token';

  const onSuccess = (res) => res;
  const onError = (error) => {
    // do whatever we want to be with Error
    return error;
  };
  return client.options(options).then(onSuccess).catch(onError);
};
