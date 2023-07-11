import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loader, Videos } from "./";
import { Suspense, useEffect, useRef, useState } from "react";
import { fetchSearch } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const nexPageToken = useRef(null);
  const [videosToDisplay, setVideosToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      //condition to check whether we have reached end of page
      if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
        fetchData();
      }
      return;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSearch({
        searchTerm,
        pageToken: nexPageToken.current,
      });
      const { items, nextPageToken } = response;
      setVideosToDisplay((prevState) => [...prevState, ...items]);
      nexPageToken.current = nextPageToken;
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      p={2}
      minHeight="95vh"
      sx={{ width: "90%", margin: "auto", overflowY: "auto" }}
    >
      <Typography variant="h4" fontWeight={900} color="white" mb="50px">
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Suspense fallback={<Loader />}>
          <Videos videos={videosToDisplay} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default SearchFeed;
