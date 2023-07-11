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
  InputAdornment
} from "@mui/material";
import { toast } from "react-toastify";
import validation from "../../common/validation";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: true, password: true
  })
  const { logIn, googleAuth, user } = UserAuth();
  const [showPassword, setShowPassword] = useState(false)
  const Navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;
    setLogin((prev)=>{
      return {...prev, [name]: value}
    })
    const errorMessage = validation[name](value);
    setError((prev)=>{
      return {...prev, ...errorMessage}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitable = true;
    Object.values(error).forEach((e)=>{
      if(e !== false){
       submitable = false;
       return;
      }
    })
    if(submitable){
    try {
      await logIn(logIn.email, login.password);
      return Navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "top-center", autoClose: 5000, theme: "colored" });
    }
  }else{
    alert("Please fill all fields with valid data.")
  }
  };
  const google = async () => {
    try {
      await googleAuth();
      return Navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "top-center", autoClose: 5000, theme: "colored" });
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
          value={login.email}
          sx={{ backgroundColor: "white", borderRadius: "5px", opacity:"0.6" }}
          onChange={handleChange}
        />
         {error.email && error.emailError && <p className="formError">{error.emailError}</p>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type={showPassword? "text":"password"}
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px",opacity:"0.6" }}
          value={login.password}
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
         {error.password && error.passwordError && <p className="formError">{error.passwordError}</p>}
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
