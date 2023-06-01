import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout } from "./components";
import {fetchVideos as feedLoader} from "./utils/fetchFromAPI";
import {fetchSearch as searchFeedLoader} from "./utils/fetchFromAPI";
import {videoDetails as videoDetailLoader} from "./utils/fetchFromAPI";
import {fetchChannel as channelDetailLoader} from "./utils/fetchFromAPI";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={feedLoader} element={<Feed />} />
            <Route path="video/:id" loader={videoDetailLoader} element={<VideoDetail />} />
            <Route path="channel/:id" loader={channelDetailLoader} element={<ChannelDetail />} />
            <Route path="search/:searchTerm" loader={searchFeedLoader} element={<SearchFeed />} />
        </Route>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
