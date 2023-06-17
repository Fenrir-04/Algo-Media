import React, { Suspense, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Videos, Sidebar } from "./";
import ScrollToTopButton from "./TopButton";
import Loader from "./Loader";
import { fetchFromAPI, fetchVideos } from "../utils/fetchFromAPI";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "New";
  const dataPromises = useLoaderData();
  console.log(dataPromises);
  const year = new Date().getFullYear();
  const nexPageToken = useRef(null);
  const containerRef = useRef(null);
  const [videosToDisplay, setVideosToDisplay] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  useEffect(() => {
    const handleScroll = async () => {
      console.log(
        window.innerHeight,
        document.documentElement.scrollTop,
        document.documentElement.offsetHeight
      );
      if (
        (window.innerHeight + document.documentElement.scrollTop) * 1.5 >
          document.documentElement.offsetHeight &&
        !isLoading
      ) {
        setIsLoading(true);
        const res = fetchVideos({ pageToken: nexPageToken.current });
        console.log(res);
        setVideosToDisplay([...videosToDisplay, ...res.items]);
        // nexPageToken.current = res.nextPageToken;
        setIsFirstLoad(false);
      }
      return;
      // When the user reaches the bottom of the container, load more videos

      // loadMoreVideos();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Await resolve={dataPromises.data}>
            {(data) => {
              console.log("data promise", data);
              nexPageToken.current = data.nextPageToken;
              setVideosToDisplay([...videosToDisplay, ...data.items]);
              return <Videos videos={data.items} />;
            }}
          </Await>
        </Suspense>
      </Box>
      <ScrollToTopButton />
    </Stack>
  );
};

export default Feed;
