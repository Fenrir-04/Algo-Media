import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'

import ErrorPage from './components/404Errorpage'
import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Feed,
  Layout,
  Loader,
} from './components'
import {
  fetchVideos,
  fetchSearch,
  videoDetails,
  fetchChannel,
} from './utils/fetchFromAPI'
import { AuthContextProvider } from './context/AuthContext'
const Login = lazy(() => import('./components/Auth/Login'))
const Signup = lazy(() => import('./components/Auth/Signup'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index loader={fetchVideos} element={<Feed />} />
      <Route path='video/:id' loader={videoDetails} element={<VideoDetail />} />
      <Route
        path='channel/:id'
        loader={fetchChannel}
        element={<ChannelDetail />}
      />
      <Route
        path='search/:searchTerm'
        loader={fetchSearch}
        element={<SearchFeed />}
      />
      <Route path='/:playlist' element={<Feed />} />
      <Route path='auth/login' element={<Login />} />
      <Route path='auth/signup' element={<Signup />} />
      <Route path='*' loader={fetchSearch} element={<ErrorPage />} />
    </Route>
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
