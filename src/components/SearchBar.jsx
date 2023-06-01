import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchSuggestionFromSearchText } from "../utils/fetchFromAPI";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import _ from "lodash";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const abortController = useRef();
  const navigate = useNavigate();
  useEffect(() => {});

  const handleTextType = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSuggestions(term);
  };

  const fetchSuggestions = _.debounce(async (term) => {
    //cancel previous api request
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }

    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    //if term is empty exirt
    if (_.isEmpty(term)) return;
    //fetch and transform data to extract suggestions
    fetchSuggestionFromSearchText(term, signal)
      .then((res) => _.get(res, "data"))
      .then((data) => _.get(data, "items"))
      .then((data) => _.map(data, (item) => _.get(item, "snippet")))
      .then((data) => setRecommendations(data));
  }, 300); // 300ms delay

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleSelect = (e, value) => {
    new Promise((resolve) => {
      setSearchTerm(value);
      setTimeout(resolve, 300);
    }).then(() => onhandleSubmit(e));
  };

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={recommendations.map((option) => option.title)}
      hiddenLabel="true"
      onChange={(e, value) => handleSelect(e, value)}
      sx={{
        width: "300px",
        background: "white",
        borderRadius: "30px",
        display: "flex",
      }}
      renderInput={(params) => (
        <>
          <TextField
            placeholder="search"
            {...params}
            sx={{ background: "white", borderRadius: "30px" }}
            value={searchTerm}
            onChange={handleTextType}
            variant="outlined"
            fullWidth
          />
          <IconButton
            type="submit"
            onClick={onhandleSubmit}
            sx={{ p: "10px", color: "red" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    />
  );
};

export default SearchBar;