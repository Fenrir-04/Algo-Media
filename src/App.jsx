import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout } from "./components";
import {loader as feedLoader} from "./components/Feed";
import {loader as searchFeedLoader} from "./components/SearchFeed";
import {loader as videoDetailLoader} from "./components/VideoDetail";
import {loader as channelDetailLoader} from "./components/ChannelDetail";
import ErrorPage from "./components/404Errorpage";

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
);

const App = () => <RouterProvider router={router} />;

export default App;
