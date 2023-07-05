import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "@mui/icons-material";
import { Paper, IconButton } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "react-toastify";

const VoiceSearch = () => {
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
      toast.error(`Your Browser doesn't support this feature.`, { position: "top-center", autoClose: 5000, theme: "colored" });
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (finalTranscript !== "") {
      navigate(`/search/${finalTranscript}`);
      resetTranscript();
    }
  }, [finalTranscript, resetTranscript, navigate]);

  const handleMicButton = () => {
    if (!isMicrophoneAvailable) {
      return toast.error(`Microphone Permission Not Available`, { position: "top-center", autoClose: 5000, theme: "colored" });
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
        margin: 5
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
