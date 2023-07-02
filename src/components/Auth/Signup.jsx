import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

const Signup = () => {

  const [input,setInput] = useState('');
  const {signUp} = UserAuth();
  const [showPassword, setShowPassword] = useState(false)
  const Navigate  = useNavigate();

  function handleChange(e){
    setInput({...input,[e.target.name]: e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {email, password} = input;
    try{
      const a = await signUp(email,password);
      console.log(a)
      return Navigate('/');
    } catch (err){
      alert("Invalid Credentials");
      throw err
    }
  }

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
        Sign Up
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
          type={showPassword? "text": "password"}
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px",opacity:"0.6" }}
          value={input.password}
          onChange={handleChange}
          InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
        />
          <span onClick={()=>Navigate('/auth/login')} style={{cursor:"pointer"}}>
            <Link variant="body1">Sign In</Link>
          </span>
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
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
