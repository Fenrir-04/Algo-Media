import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Button ,Grid} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { dateFormat } from "../utils/constants";
import Loader from "./Loader";


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
    const fetchChannelData = async () => {
      const response = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
      const channelId = response.items[0].snippet.channelId;
      const channelData = await fetchFromAPI(`channels?part=statistics&id=${channelId}`);
      setSubscriberCount(channelData.items[0].statistics.subscriberCount);
    };

    fetchChannelData();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt, description },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  const handleLike = () => {
    console.log("Liked!");
  };
  const handleShare = () => {
    console.log("Shared!");
  };
  const handleSubscribe = () => {
    console.log("Subscribed!");
  };
  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <div
            style={{
              width: "100%",
              position: "sticky",
              top: "86px",
              maxHeight: "calc(100vh - 86px)",
              overflowY: "auto",
              paddingRight: "15px",
              paddingLeft: "15px",
            }}
          >
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
              alignItems="center"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      variant={{ sm: "subtitle1", md: "h6" }}
                      color="#fff"
                    >
                      {channelTitle}
                      <CheckCircleIcon
                        sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                      />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="#fff">
                      {parseInt(subscriberCount).toLocaleString()} subscribers
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
              <Stack direction="row" gap={1} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<ThumbUpIcon />}
                  onClick={handleLike}
                >
                  {parseInt(likeCount).toLocaleString()}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
                <Button variant="contained" onClick={handleSubscribe}>
                  Subscribe
                </Button>
              </Stack>
            </Stack>
            <Typography
              color="#fff"
              variant="body1"
              p={2}
              sx={{
                whiteSpace: "pre-wrap",
                a: {
                  color: "blue",
                  textDecoration: "underline",
                },
              }}
              dangerouslySetInnerHTML={{ __html: linkifyText(description) }}
            ></Typography>
          </div>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

