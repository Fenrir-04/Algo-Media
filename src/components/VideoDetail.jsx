import React, { Suspense } from "react";
import { Link, useParams, Await, useLoaderData } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import { Videos } from "./";
import { dateFormat } from "../utils/constants";
import Loader from "./Loader";

const VideoDetail = () => {
  const dataPromises = useLoaderData();
  const { id } = useParams();

  function renderVideo(videos) {
    const video = videos.items[0];
    const {
      snippet: { title, channelId, channelTitle, publishedAt },
      statistics: { viewCount, likeCount },
    } = video;
    return (
      <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
        />
        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ color: "#fff" }}
          py={1}
          px={2}
        >
          <Link to={`/channel/${channelId}`}>
            <Typography
              variant={{ sm: "subtitle1", md: "h6" }}
              color="#fff"
            >
              {channelTitle}
              <CheckCircleIcon
                sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
              />
            </Typography>
          </Link>
          <Stack direction="row" gap="20px" alignItems="center">
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Published on: {" " + moment(publishedAt).format(dateFormat)}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(viewCount).toLocaleString()} views
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(likeCount).toLocaleString()} likes
            </Typography>
          </Stack>
        </Stack>
      </Box>
    )
  }


  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Suspense fallback={<Loader />}>
            <Await resolve={dataPromises.videoData}>
              {renderVideo}
            </Await>
          </Suspense>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Suspense fallback={<></>}>
            <Await resolve={dataPromises.videosData}>
              {(data) => (
                <Videos videos={data.items} direction="column" />
              )}
            </Await>
          </Suspense>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
