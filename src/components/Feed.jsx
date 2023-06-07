import React, { Suspense, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Videos, Sidebar } from "./";
import ScrollToTopButton from "./TopButton";
import Loader from "./Loader";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("q") || "New";
  const dataPromises = useLoaderData();
  let year = new Date().getFullYear();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 960
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
      }}
    >
      {/*Sidebar*/}
      <Box
        sx={{
          height: { sx: "auto" },
          borderRight: { sx: 0, md: "1px solid #3d3d3d" },
          borderBottom: { sx: "1px solid #3d3d3d", md: 0 },
          borderColor: "#3d3d3d",
          px: { sx: 0, md: 2 },
          position: { sx: "inherit", md: "fixed" },
          top: { sx: 100, md: 100 },
          left: 0,
          width: { sx: "100%", md: "250px" },
          zIndex: 1,
        }}
      >
        <Sidebar />
        {!isSidebarCollapsed && (
          <Typography
            variant="body2"
            sx={{ mt: 110, color: "#fff", position: "fixed", bottom: 10 }}
          >
            Copyright © {year} Algo-Media
          </Typography>
        )}
      </Box>
      {/*Feed*/}
      <Box
        p={2}
        sx={{
          overflowY: "auto",
          minHeight: "90vh",
          flex: 2,
          marginLeft: { sx: 0, md: "280px" },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        <Suspense fallback={<Loader />}>
          <Await resolve={dataPromises.data}>
            {(data) => <Videos videos={data.items} />}
          </Await>
        </Suspense>
      </Box>
      <ScrollToTopButton />
    </Stack>
  );
};

export default Feed;