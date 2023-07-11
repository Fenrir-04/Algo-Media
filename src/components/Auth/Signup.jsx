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
import { toast } from "react-toastify";
import validation from "../../common/validation";

const Signup = () => {

  const {signUp} = UserAuth();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
   email: "",
   password: "",
   confirmPassword: ""
  });
  const [error, setError] = useState({
    email: true, password: true, confirmPassword: true
  })
  const Navigate  = useNavigate();

  function handleChange(e){
    const {name, value} = e.target;
    setForm((prev)=>{
      return {...prev, [name]: value}
    })
    let errorMessage = validation[name](value);
    if(name === "confirmPassword") errorMessage = validation.confirmPassword(value, form.password)
    setError((prev)=>{
      return {...prev, ...errorMessage}
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("Submit")
     let submitable = true;
     Object.values(error).forEach((e)=>{
       if(e !== false){
        submitable = false;
        return;
       }
     })
     if(submitable){
    try{
      const a = await signUp(signUp.email,signUp.password);
      console.log(a)
      return Navigate('/');
    } catch (err){
      toast.error(err.message, { position: "top-center", autoClose: 5000, theme: "colored" });
      throw err
    }
  }else{
     alert("Please fill all fields with valid data.")
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
          required
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={form.email}
          sx={{ backgroundColor: "white", borderRadius: "5px", opacity:"0.6", width:"450px", margin: "20px auto", display: "flex" }}
          onChange={handleChange}
        />
        {error.email && error.emailError && <p className="formError">{error.emailError}</p>}
        <TextField
          required
          name="password"
          placeholder="Password"
          type={showPassword? "text": "password"}
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px",opacity:"0.6", display:"flex" }}
          value={form.password}
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

         <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          placeholder="Confirm Password"
          type={showConfirmPassword? "text": "password"}
          id="confirmPassword"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px",opacity:"0.6" }}
          value={form.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            ),
          }}
        />
          {error.confirmPassword && error.confirmPasswordError && <p className="formError">{error.confirmPasswordError}</p>}
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
