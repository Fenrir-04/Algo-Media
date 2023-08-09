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
        Sign Up
      </Typography>
      <p style={{color: "red"}}><strong>Learn and Enjoy with Videos</strong></p>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} aria-label="Signup Form">
        <TextField
          required
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={form.email}
          sx={{backgroundColor: "white", borderRadius: "5px", width:"450px", display: "flex", marginTop:"15px"}}
          onChange={handleChange} aria-label="Email Input"
          aria-describedby="email-error"
        /> 
        {error.email && error.emailError && <p className="formError" role="alert" id="email-error" style={{marginBottom: "15px"}}>{error.emailError}</p>}
        <TextField
          required
          name="password"
          placeholder="Password"
          type={showPassword? "text": "password"}
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px", display:"flex", marginTop:"15px" }}
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <IconButton style={{color: "black"}} onClick={()=>setShowPassword(!showPassword)} edge="end" aria-label={showPassword ? "Hide Password" : "Show Password"}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            ),
          }}
          aria-label="Password Input"
          aria-describedby="password-error"
        />
        {error.password && error.passwordError && <p className="formError" role="alert" id="password-error">{error.passwordError}</p>}
{/* e9e6e6 bgcolor input */}
         <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          placeholder="Confirm Password"
          type={showConfirmPassword? "text": "password"}
          id="confirmPassword"
          autoComplete="current-password"
          sx={{ backgroundColor: "white", borderRadius: "5px"}}
          value={form.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <IconButton style={{color: "black"}} onClick={()=>setShowConfirmPassword(!showConfirmPassword)} edge="end" aria-label={showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}>
                {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            ),
          }}
          aria-label="Confirm Password Input"
          aria-describedby="confirmPassword-error"
        />
          {error.confirmPassword && error.confirmPasswordError && <p className="formError" role="alert" id="confirmPassword-error">{error.confirmPasswordError}</p>}
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
            aria-label="Sign Up Button"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
