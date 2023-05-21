import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { ChannelDetail, VideoDetail, SearchFeed, Feed, Layout } from "./components";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="video/:id" element={<VideoDetail />} />
            <Route path="channel/:id" element={<ChannelDetail />} />
            <Route path="search/:searchTerm" element={<SearchFeed />} />
        </Route>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
