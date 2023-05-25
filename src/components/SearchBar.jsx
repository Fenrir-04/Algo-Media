import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchSuggestionFromSearchText } from "../utils/fetchFromAPI";
import _ from "lodash";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      // fetchSuggestions.cancel();
    };
  });

  const handleTextType = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSuggestions(term);
  };

  // const debouncedResults = useMemo((e) => {
  //   return _.debounce(handleTextType, 300);
  // }, []);

  const fetchSuggestions = _.debounce(async (term) => {
    console.log("inside fetchSuggestions", term);
    fetchSuggestionFromSearchText(term)
      .then((res) => _.get(res, "data"))
      .then((data) => _.get(data, "items"))
      .then((data) => _.map(data, (item) => _.get(item, "snippet")))
      .then((data) => console.log("api response", data));
  }, 1000); // 300ms delay

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleTextType}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", color: "red" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
