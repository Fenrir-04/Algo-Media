import axios from "axios";
import { defer } from "react-router-dom";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";

const apiKey = process.env.REACT_APP_APIKEY;

const options = {
  method: "GET",
  params: { part: "snippet", key: apiKey, maxResults: 10 },
};

export const fetchFromAPI = async (url, pageToken) => {
  try {
    if (pageToken) options.params.pageToken = pageToken;
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const fetchNextVideos= async (url) => {
//   const data = fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
// }

export const fetchVideos = async ({ request, pageToken }) => {
  let category;
  if (request) category = new URL(request.url).searchParams.get("q") || false;
  const endPoint = `videos?regionCode=US&chart=mostPopular&${
    category && `videoCategoryId=${category}`
  }`;
  return defer({ data: fetchFromAPI(endPoint, pageToken) });
};

export const fetchChannel = async ({ params }) => {
  const { id } = params;
  const channelData = fetchFromAPI(`channels?part=snippet&id=${id}`);
  const videosData = fetchFromAPI(
    `search?channelId=${id}&part=snippet%2Cid&order=date`
  );
  return { channelData, videosData };
};

export const fetchSearch = async ({ params }) => {
  const searchTerm = params.searchTerm;
  const data = fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
  console.log(data);
  return defer({ data: data });
};

export const videoDetails = async ({ params }) => {
  const { id } = params;
  const videoData = fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
  const videosData = fetchFromAPI(
    `search?part=snippet&relatedToVideoId=${id}&type=video`
  );
  return { videoData, videosData };
};

export const fetchSuggestionFromSearchText = async (q, signal) => {
  const options = {
    method: "GET",
    params: { part: "snippet", q, key: apiKey },
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
