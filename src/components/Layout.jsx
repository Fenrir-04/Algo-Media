import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const Layout = () => (
    <Box sx={{ backgroundColor: '#212427' }}>
        <Navbar />
        <Outlet />
    </Box>
);

export default Layout;
