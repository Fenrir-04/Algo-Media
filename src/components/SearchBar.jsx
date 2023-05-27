import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Mic } from "@mui/icons-material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
    stopListening,
    finalTranscript,
  } = useSpeechRecognition();

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      window.alert(`Your Browser doesn't support this feature.`);
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (finalTranscript !== "") {
      setSearchTerm(finalTranscript);
      navigate(`/search/${finalTranscript}`);
      resetTranscript();      
    }
  }, [finalTranscript, resetTranscript,navigate]);

  const handleMicButton = () => {
    if (!isMicrophoneAvailable) {
      return window.alert(`Microphone Permission Not Available`);
    }
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening();
    }
  };
  
  return (
    <div style={{ display: 'flex' , alignItems:'center'}}>
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", color: "red" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          borderRadius: "50%",
        }}
      >
        <IconButton
          color="primary"
          aria-label="voice search"
          onClick={handleMicButton}
        >
          <Mic />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
