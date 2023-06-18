import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const Layout = () => (
  <Box sx={{ backgroundColor: "#000" }}>
    <Navbar />
    <Outlet />
  </Box>
);

export default Layout;
