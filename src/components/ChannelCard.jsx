import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { demoProfilePicture } from '../utils/constants'

const ChannelCard = ({ channelDetail, marginTop }) => {
  const naviagte = useNavigate()
  const handleSubscribeClick = () => {
    if (channelDetail && channelDetail.id.channelId) {
      naviagte(`/channel/${channelDetail?.id?.channelId}`)
    }
  }

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '326px',
        margin: 'auto',
        marginTop,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <CardMedia
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.title}
          sx={{
            borderRadius: '50%',
            height: '180px',
            width: '100%',
            mb: 2,
            border: '1px solid #e3e3e3',
          }}
        />
        <Typography variant='h6'>
          {channelDetail?.snippet?.title}{' '}
          <CheckCircleIcon
            sx={{ fontSize: '14px', color: 'gray', ml: '5px' }}
          />
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString('en-US')}
            <span
              style={{
                backgroundColor: 'red',
                border: '2px solid black',
                borderRadius: '5px',
                padding: '8px 10px',
                color: 'white',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
              onClick={() => handleSubscribeClick()}
            >
              Subscribers
            </span>
          </Typography>
        )}
      </CardContent>
    </Box>
  )
}

export default ChannelCard
