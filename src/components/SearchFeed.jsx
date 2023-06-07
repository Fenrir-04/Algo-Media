import { Typography, Box } from "@mui/material"; 
import { Await, useLoaderData, useParams } from "react-router-dom";
import { Loader, Videos } from "./"; 
import { Suspense } from "react"; 

const SearchFeed = () => { 
  const dataPromises = useLoaderData(); 
  const { searchTerm } = useParams(); 

  return ( 
    <Box minHeight="95vh"> 
      <Typography 
        variant="h4" fontWeight={900} color="white"
        mb={3} ml={{ sm: "100px" }} textAlign={{ xs: "center", sm: "left" }}
        pt={{ xs: "20px", sm: 0 }} pb="10px" 
      > 
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos 
      </Typography> 

      {/* updated Box component with padding to the right */}
      <Box 
        display="flex" 
        flexDirection={{ xs: "column", sm: "row" }} 
        justifyContent={{ xs: "center", sm: "flex-start" }} 
        alignItems="flex-start" 
        pl={{ xs: "20px", sm: "100px" }} 
        pr={{ xs: "20px", sm: "100px" }} // added pr prop
      > 
        <Suspense fallback={<Loader />} > 
          <Await resolve={dataPromises.data} > 
            {(data) => ( 
              <Box sx={{ width: { xs: "100%" } }} > 
                <Videos videos={data.items} /> 
              </Box> 
            )} 
          </Await> 
        </Suspense> 
      </Box> 
    </Box> 
  ); 
}; 

export default SearchFeed;