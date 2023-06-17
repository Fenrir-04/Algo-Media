import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
} from "@mui/material";

const Login = () => {
  const [input, setInput] = useState("");
  const { logIn, googleAuth, user } = UserAuth();
  const Navigate = useNavigate();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    try {
      await logIn(email, password);
      return Navigate("/");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };
  const google = async () => {
    try {
      await googleAuth();
      return Navigate("/");
    } catch (err) {
      alert("Inalid Request");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography component="h1" variant="h4" color={"white"}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={input.email}
          sx={{ backgroundColor: "white", borderRadius: "5px", opacity:"0.6" }}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px",opacity:"0.6" }}
          value={input.password}
          onChange={handleChange}
        />
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span onClick={()=>Navigate('/auth/signup')} style={{cursor:"pointer"}}>
            <Link variant="body1">Sign up</Link>
          </span>
          <span onClick={google} style={{cursor:"pointer"}}>
            <Link variant="body1">Login with Google</Link>
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 1, backgroundColor: "Red", width: "100px" }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
