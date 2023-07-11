import React, { useState } from 'react'
import { Stack } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { categories } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('')


  const handleSearchParams = (params, type) => {
    const searchParams = new URLSearchParams(params)
    const category = searchParams.get('category')
    setSelectedCategory(category)
    navigate(`/${type}?${searchParams.toString()}`)
  }

  return (
    <Stack
      direction='row'
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto', md: '95%' },
        flexDirection: { md: 'column' },
      }}
    >
      {categories.map((category) => (
        <button
          className='category-btn'
          onClick={() =>
            handleSearchParams(
              {
                q: category.categoryId,
                category: category.name,
              },
              'feed'
            )
          }
          style={{
            background:
              (category.name === selectedCategory ||
                (!selectedCategory && category.name === 'New')) &&
              '#FC1503',
            color: 'white',
          }}
          key={category.name}
        >
          <span
            style={{
              color:
                category.name === selectedCategory ||
                (!selectedCategory && category.name === 'New')
                  ? 'white'
                  : 'red',
              marginRight: '15px',
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity:
                category.name === selectedCategory ||
                (!selectedCategory && category.name === 'New')
                  ? '1'
                  : '0.8',
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
      <button
        className='category-btn'
        onClick={() => handleSearchParams({ q: 'watchlist' }, 'playlist')}
        style={{
          background: selectedCategory === 'watchlist' && '#FC1503',
          color: 'white',
        }}
      >
        <span
          style={{
            color: selectedCategory === 'watchlist' ? 'white' : 'red',
            marginRight: '15px',
          }}
        >
          <PlaylistAddIcon />
        </span>
        <span
          style={{
            opacity: selectedCategory === 'watchlist' ? '1' : '0.8',
          }}
        >
          WatchList
        </span>
      </button>
    </Stack>
  )
}

export default Categories
