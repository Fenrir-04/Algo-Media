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
        width: "40%",
        margin:"auto",
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: "#242c3f",
        boxShadow: "rgb(104 104 109 / 20%) 0px 8px 24px"
      }}
    >
      <Typography component="h1" variant="h4" color={"white"}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} aria-label="Login Form">
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={login.email}
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
          onChange={handleChange} aria-label="Email Input"
          aria-describedby="email-error"
        />
         {error.email && error.emailError && <p className="formError" role="alert" id="email-error">{error.emailError}</p>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type={showPassword? "text":"password"}
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
          value={login.password}
          onChange={handleChange}
          InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end" aria-label={showPassword ? "Hide Password" : "Show Password"}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
        aria-label="Password Input"
        aria-describedby="password-error"
        />
         {error.password && error.passwordError && <p className="formError" role="alert" id="password-error">{error.passwordError}</p>}
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          role="navigation"
          aria-label="Additional Options"
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
            aria-label="Sign In Button"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
