import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import Loader from "./Loader";

const ChannelDetail = () => {
  const dataPromises = useLoaderData();
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height: '300px',
          background: 'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '46px',
        }}
        > Enjoy Algo Media ❣️</div>
        <Suspense fallback={<Loader />}>
          <Await resolve={dataPromises.channelData}>
            {
              (data) => (
                <ChannelCard channelDetail={data.items[0]} marginTop="-93px" />
              )
            }
          </Await>
        </Suspense>
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Suspense fallback={<Loader />}>
          <Await resolve={dataPromises.videosData}>
            {
              (data) => (
                <Videos videos={data.items} />
              )
            }
          </Await>
        </Suspense>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
