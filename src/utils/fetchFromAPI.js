import axios from 'axios';

export const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const apiKey = process.env.API_KEY;
const options = {
  method: 'GET',
  params: { part: 'snippet', videoId: 'M7FIvfx5J10',key: apiKey},
  headers: {
    Authorization: apiKey,
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
