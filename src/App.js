import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const handleDarkMode = () => setDarkMode(!darkMode);
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: darkMode ? "dark" : "light" }}>
          <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Feed darkMode={darkMode} handleDarkMode={handleDarkMode} />
              }
            />
            <Route
              path="/video/:id"
              element={
                <VideoDetail
                  darkMode={darkMode}
                  handleDarkMode={handleDarkMode}
                />
              }
            />
            <Route
              path="/channel/:id"
              element={
                <ChannelDetail
                  darkMode={darkMode}
                  handleDarkMode={handleDarkMode}
                />
              }
            />
            <Route
              path="/search/:searchTerm"
              element={
                <SearchFeed
                  darkMode={darkMode}
                  handleDarkMode={handleDarkMode}
                />
              }
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
