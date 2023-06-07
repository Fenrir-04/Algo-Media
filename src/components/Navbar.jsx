import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import { SearchBar } from "./";
import MUISwitch from "./MUISwitch";

const Navbar = ({ darkMode, handleDarkMode }) => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: darkMode ? "#181818" : "#f9f9f9",
      top: 0,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBar />
    <MUISwitch darkMode={darkMode} handleDarkMode={handleDarkMode} />
  </Stack>
);

export default Navbar;
