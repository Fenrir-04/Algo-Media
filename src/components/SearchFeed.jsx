import { Typography, Box } from "@mui/material";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Loader, Videos } from "./";
import { Suspense } from "react";

export async function loader({ params }) {
	const searchTerm = params.searchTerm;
	const data = fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
	return defer({ data: data });
}

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
