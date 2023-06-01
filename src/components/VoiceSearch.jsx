import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "@mui/icons-material";
import { Paper, IconButton } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceSearch = ({setSearchTerm}) => {
  const navigate = useNavigate();
  const {
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
    stopListening,
    finalTranscript,
  } = useSpeechRecognition();

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
  }, [finalTranscript, resetTranscript, navigate,setSearchTerm]);

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
  );
};

export default VoiceSearch;
