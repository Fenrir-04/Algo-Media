import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
  dateFormat,
} from "../utils/constants";

function handleMouseEnter(event)
{
  this.setState({
    height : this.initialHeight + 10,
    width : this.initialWidth + 10,
  })
}
function handleMouseLeave(event)
{
  this.setState({
    height : this.initialHeight,
    width : this.initialWidth,
  })
}
const VideoCard = ({video}) =>{
  const id = video.id.videoId?video.id.videoId: video.id;
  const {snippet} = video;
  return(
  <Card
    sx={{
      boxShadow: "none",
      borderRadius: 0,
      backgroundColor: 'black',
      onmouseenter: {handleMouseEnter},
      onmouseleave:{handleMouseLeave},
    }}
  >
    <Link to={id ? `/video/${id}` : `/video/cV2gBU6hKfY`}>
      <CardMedia
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
        sx={{ width: "100%", objectFit: "cover", aspectRatio: "16 / 9" ,borderRadius: '1rem', }}
      />
    </Link>
    <CardContent>
      <Link to={id ? `/video/${id}` : demoVideoUrl}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link
        to={
          snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl
        }
      >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon
            sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
          />
        </Typography>
      </Link>
      <Link to={id ? `/video/${id}` : demoVideoUrl}>
        <Typography variant="subtitle2" color="gray">
          Published on : {" " + moment(snippet?.publishedAt).format(dateFormat)}
        </Typography>
      </Link>
    </CardContent>
  </Card>
)};

export default VideoCard;
