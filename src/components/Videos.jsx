import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction, darkMode, handleDarkMode }) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && (
            <VideoCard
              video={item}
              darkMode={darkMode}
              handleDarkMode={handleDarkMode}
            />
          )}
          {item.id.channelId && (
            <ChannelCard
              channelDetail={item}
              darkMode={darkMode}
              handleDarkMode={handleDarkMode}
            />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
