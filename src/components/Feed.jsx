import React, { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar, Loader } from "./";

export async function loader({ request }) {
	const category = new URL(request.url).searchParams.get("q") || "New";
	return defer({ data: fetchFromAPI(`search?part=snippet&q=${category}`)});
}

const Feed = () => {
	const [searchParams] = useSearchParams()
	const selectedCategory = searchParams.get("q") || "New";
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

			<Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
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
