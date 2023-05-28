import axios from 'axios';

export const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const apiKey = process.env.REACT_APP_APIKEY;
const options = {
  method: 'GET',
  params: { part: 'snippet',key: apiKey},
  headers: {
    Authorization: apiKey,
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
