import {lazy} from 'react';

export { default as ChannelCard } from "./ChannelCard";
export { default as VideoCard } from "./VideoCard";
export { default as Feed } from "./Feed";
export { default as Loader } from "./Loader/Loader";
export { default as Navbar } from "./Navbar";
export { default as SearchBar } from "./SearchBar";
export { default as Videos } from "./Videos";
export { default as Sidebar } from "./Sidebar";
export { default as Layout } from "./Layout";

const ChannelDetail = lazy(() => import("./ChannelDetail"));
const VideoDetail = lazy(() => import("./VideoDetail"));
const SearchFeed = lazy(() => import("./SearchFeed"));

export {ChannelDetail,VideoDetail,SearchFeed}