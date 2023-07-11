import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { VideoCard } from './'
import Loader from './Loader/Loader'
import { useParams } from 'react-router-dom'

const Videos = ({ videos, direction }) => {
  const params = useParams()
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    //to get the localstorage data initially
    const storedWatchList = localStorage.getItem('algo-media-watchlist')
    if (storedWatchList) {
      setWatchlist(JSON.parse(storedWatchList))
    }
  }, [])

  const handleAddWatchList = (data) => {
    watchlist.push(data)
    //set the item array to the localstorage
    localStorage.setItem('algo-media-watchlist', JSON.stringify(watchlist))
    setWatchlist([...watchlist])
  }

  const handleDeleteWatchList = (id) => {
    // Retrieve the array from local storage
    const savedwatchlist = localStorage.getItem('algo-media-watchlist')

    //initially localstorage is not created so, the savedwatchlist value can be null
    if (savedwatchlist) {
      // parse the data from the JSON string
      const parsedWatchlist = JSON.parse(savedwatchlist)

      // delete the id that matched with the localstorage data id
      const updatedWatchlist = parsedWatchlist.filter(
        (item) => item.itemId !== id
      )
      localStorage.setItem(
        'algo-media-watchlist',
        JSON.stringify(updatedWatchlist)
      )

      setWatchlist(updatedWatchlist)
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      {watchlist.length === 0 && params.playlist === 'playlist' ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <Typography
            variant='h4'
            fontWeight='bold'
            mb={2}
            sx={{ color: 'white' }}
          >
            No WatchList Videos
          </Typography>
        </Box>
      ) : videos.length === 0 ? (
        <Loader />
      ) : videos.length > 0 && params.playlist !== 'playlist' ? (
        videos.map((item, idx) => (
          <Box item key={idx} style={{ margin: '0 auto', width: '100%' }}>
            {item.id && (
              <VideoCard
                index={idx}
                video={item}
                handleAddWatchList={handleAddWatchList}
                handleDeleteWatchList={handleDeleteWatchList}
              />
            )}
          </Box>
        ))
      ) : (
        watchlist.map((item, idx) => (
          <Box item key={idx} style={{ margin: '0 auto', width: '100%' }}>
            {item.id && (
              <VideoCard
                index={idx}
                video={item}
                handleAddWatchList={handleAddWatchList}
                handleDeleteWatchList={handleDeleteWatchList}
              />
            )}
          </Box>
        ))
      )}
    </Box>
  )
}

export default Videos
