import React, { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Videos, Sidebar } from "./";
import ScrollToTopButton from "./TopButton";
import Loader from "./Loader";

const Feed = () => {
	const [searchParams] = useSearchParams()
	const selectedCategory = searchParams.get("category") || "New";
	const dataPromises = useLoaderData();
	let year = new Date().getFullYear();

	return (
		<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
			<Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
				<Sidebar />

				<Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
					Copyright © {year} Algo-Media
				</Typography>
			</Box>

			<Box p={2} sx={{ overflowY: "auto", minHeight: "90vh", flex: 2 }}>
				<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
					{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
				</Typography>
				<Suspense fallback={<Loader />}>
					<Await resolve={dataPromises.data}>
						{(data) => (
							<Videos videos={data.items} />
						)}
					</Await>
				</Suspense>
			</Box>
			<ScrollToTopButton />
		</Stack>
	);
};

export default Feed;
