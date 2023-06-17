import React, { Suspense, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Videos, Sidebar } from "./";
import ScrollToTopButton from "./TopButton";
import Loader from "./Loader";
import { fetchVideos } from "../utils/fetchFromAPI";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "New";

  const year = new Date().getFullYear();
  const nexPageToken = useRef(null);
  const [videosToDisplay, setVideosToDisplay] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      // console.log(scrollTop, clientHeight, scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
        console.log("fetch data");
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
      const response = await fetchVideos({
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
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © {year} Algo-Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", minHeight: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Suspense fallback={<Loader />}>
          <Videos videos={videosToDisplay} />
        </Suspense>
      </Box>
      <ScrollToTopButton />
    </Stack>
  );
};

export default Feed;
