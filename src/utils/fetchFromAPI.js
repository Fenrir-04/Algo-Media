import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com/captions',
  params: {part: 'snippet', videoId: 'M7FIvfx5J10'},
  headers: {
    'X-RapidAPI-Key': '01fb8d7063msh3ad668189e06297p108423jsn1f30a28cfb1a',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
