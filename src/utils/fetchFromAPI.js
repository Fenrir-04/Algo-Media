import axios from "axios";

export const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const apiKey = process.env.REACT_APP_APIKEY;
const options = {
  method: 'GET',
  params: { part: 'snippet',key: apiKey},  
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const fetchSuggestionFromSearchText = async (q, signal) => {
  const options = {
    method: "GET",
    params: { part: "snippet", q ,key: apiKey},
    headers: {
      Authorization: apiKey,
    },
    signal,
  };

  try {
    const result = await axios(`${BASE_URL}/search`, options);
    return result;
  } catch (error) {
    if (error.name !== "CanceledError") console.log("Error:", error);
  }
};
