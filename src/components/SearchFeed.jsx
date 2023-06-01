import { Typography, Box } from "@mui/material";
import { Await, useLoaderData, useParams } from "react-router-dom";
import { Loader, Videos } from "./";
import { Suspense } from "react";

const SearchFeed = () => {
	const dataPromises = useLoaderData()
	const { searchTerm } = useParams();

	return (
		<Box p={2} minHeight="95vh">
			<Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
				Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
			</Typography>
			<Box display="flex">
				<Box sx={{ mr: { sm: '100px' } }} />
				<Suspense fallback={<Loader />}>
					<Await resolve={dataPromises.data}>
						{(data) => (
							<Videos videos={data.items} />
						)}
					</Await>
				</Suspense>
			</Box>
		</Box>
	);
};


export default SearchFeed;
