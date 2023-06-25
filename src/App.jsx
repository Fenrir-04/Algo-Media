import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout } from "./components";

import {loader as feedLoader} from "./components/Feed";
import {loader as searchFeedLoader} from "./components/SearchFeed";
import {loader as videoDetailLoader} from "./components/VideoDetail";
import {loader as channelDetailLoader} from "./components/ChannelDetail";
import ErrorPage from './components/404Errorpage'
import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout,Loader } from "./components";

import {fetchVideos as feedLoader} from "./utils/fetchFromAPI";
import {fetchSearch as searchFeedLoader} from "./utils/fetchFromAPI";
import {videoDetails as videoDetailLoader} from "./utils/fetchFromAPI";
import {fetchChannel as channelDetailLoader} from "./utils/fetchFromAPI";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Feed,
  Layout,
  Loader,
} from './components'
import { fetchVideos as feedLoader } from './utils/fetchFromAPI'
import { fetchSearch as searchFeedLoader } from './utils/fetchFromAPI'
import { videoDetails as videoDetailLoader } from './utils/fetchFromAPI'
import { fetchChannel as channelDetailLoader } from './utils/fetchFromAPI'
import { AuthContextProvider } from './context/AuthContext'

const Login = lazy(() => import('./components/Auth/Login'))
const Signup = lazy(() => import('./components/Auth/Signup'))

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route index loader={feedLoader} element={<Feed />} />
          <Route path="video/:id" loader={videoDetailLoader} element={<VideoDetail />} />
          <Route path="channel/:id" loader={channelDetailLoader} element={<ChannelDetail />} />
          <Route path="search/:searchTerm" loader={searchFeedLoader} element={<SearchFeed />} />
          <Route path="*" loader={searchFeedLoader} element={<ErrorPage/>} />
      </Route>
  )

  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index loader={feedLoader} element={<Feed />} />
        <Route
          path='video/:id'
          loader={videoDetailLoader}
          element={<VideoDetail />}
        />
        <Route
          path='channel/:id'
          loader={channelDetailLoader}
          element={<ChannelDetail />}
        />
        <Route path='/:playlist' element={<Feed />} />
        <Route
          path='search/:searchTerm'
          loader={searchFeedLoader}
          element={<SearchFeed />}
        />
        <Route path='auth/login' element={<Login />} />
        <Route path='auth/signup' element={<Signup />} />
      </Route>
    </>
  )
)

const App = () => (
  <AuthContextProvider>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
    ;
  </AuthContextProvider>
)

export default App
