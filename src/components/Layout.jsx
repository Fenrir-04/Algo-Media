import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Footer from "./Footer";
const Layout = () => (
  <Box sx={{ backgroundColor: "#000" }}>
    <Navbar />
    <Outlet />
    <Footer />
  </Box>
);

export default Layout;
