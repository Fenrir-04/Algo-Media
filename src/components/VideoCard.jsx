import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import moment from 'moment'
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
  dateFormat,
} from '../utils/constants'

function handleMouseEnter(event) {
  this.setState({
    height: this.initialHeight + 10,
    width: this.initialWidth + 10,
  })
}
function handleMouseLeave(event) {
  this.setState({
    height: this.initialHeight,
    width: this.initialWidth,
  })
}
const VideoCard = ({ video, handleDeleteWatchList, handleAddWatchList }) => {
  const id = video.id.videoId ? video.id.videoId : video.id
  const { snippet } = video
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    let watclistedData = JSON.parse(
      localStorage.getItem('algo-media-watchlist')
    )
    if (watclistedData !== null)
      for (let index = 0; index < watclistedData.length; index++) {
        if (watclistedData[index].itemId === id) {
          setIsSaved(true)
        }
      }
  }, [isSaved])

  const handleSave = () => {
    if (isSaved === true) {
      //to delete a certain data
      handleDeleteWatchList(id)
      setIsSaved(false)
    } else {
      //to add a certain data
      video.itemId = id
      handleAddWatchList(video)
      setIsSaved(true)
    }
  }
  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        backgroundColor: 'black',
        onmouseenter: { handleMouseEnter },
        onmouseleave: { handleMouseLeave },
      }}
    >
      <Link to={id ? `/video/${id}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: '100%',
            objectFit: 'cover',
            aspectRatio: '16 / 9',
            borderRadius: '1rem',
          }}
        />
      </Link>
      <CardContent>
        <div style={{ display: 'flex' }}>
          {' '}
          <Link to={id ? `/video/${id}` : demoVideoUrl} style={{ flex: '1' }}>
            <Typography variant='subtitle1' fontWeight='bold' color='#FFF'>
              {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <div
            onClick={() => handleSave()}
            style={{
              flex: '-1',
              marginTop: '2%',
              marginLeft: '1%',
              cursor: 'pointer',
            }}
          >
            {isSaved ? (
              <PlaylistAddCheckIcon style={{ color: 'gray' }} />
            ) : (
              <PlaylistAddIcon style={{ color: 'gray' }} />
            )}
          </div>
        </div>

        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant='subtitle2' color='gray'>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
            />
          </Typography>
        </Link>
        <Link to={id ? `/video/${id}` : demoVideoUrl}>
          <Typography variant='subtitle2' color='gray'>
            Published on :{' '}
            {' ' + moment(snippet?.publishedAt).format(dateFormat)}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard
