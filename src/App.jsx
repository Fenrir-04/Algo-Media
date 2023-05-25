import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout } from "./components";
import {loader as feedLoader} from "./components/Feed";
import {loader as searchFeedLoader} from "./components/SearchFeed";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={feedLoader} element={<Feed />} />
            <Route path="video/:id" element={<VideoDetail />} />
            <Route path="channel/:id" element={<ChannelDetail />} />
            <Route path="search/:searchTerm" loader={searchFeedLoader} element={<SearchFeed />} />
        </Route>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
