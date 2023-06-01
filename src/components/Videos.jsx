import React from "react";
import { Box } from "@mui/material";

import { VideoCard } from "./";
import Loader from "./Loader/Loader";


const Videos = ({ videos, direction }) => {
	if (!videos?.length) return <Loader/>;
	return (
		<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: "20px" }}>
			{videos.map((item, idx) => (
				<Box item key={idx} style={{ margin: "0 auto", width: "100%" }}>
					{item.id && <VideoCard video={item} />}
				</Box>
				
			))}
		</Box>
	);
}

export default Videos;
