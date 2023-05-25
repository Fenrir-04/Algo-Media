import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchSuggestionFromSearchText } from "../utils/fetchFromAPI";
import _ from "lodash";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const abortController = useRef();
  const navigate = useNavigate();
  useEffect(() => {});

  const handleTextType = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSuggestions(term);
  };

  const fetchSuggestions = _.debounce(async (term) => {
    try {
      //cancel previous api request
      if (abortController.current) {
        console.log("cancel ");
        abortController.current.abort();
        abortController.current = null;
      }
      console.log("inside fetchSuggestions", term);
      abortController.current = new AbortController();
      const signal = abortController.current.signal;

      //if term is empty exirt
      if (_.isEmpty(term)) return;
      //fetch and transform data to extract suggestions
      fetchSuggestionFromSearchText(term, signal)
        .then((res) => _.get(res, "data"))
        .then((data) => _.get(data, "items"))
        .then((data) => _.map(data, (item) => _.get(item, "snippet")))
        .then((data) => console.log("api response", data));
    } catch (error) {
      if (error.name === "CanceledError") {
        console.log("Previous request aborted");
      } else {
        console.error("Error fetching recommendations:", error);
      }
    }
  }, 300); // 300ms delay

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
