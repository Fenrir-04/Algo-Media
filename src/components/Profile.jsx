import { Avatar, Button, Paper, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logOut } = UserAuth();
  const Navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      await logOut();
      console.log("logged out");
    } catch (err) {
      throw err;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {user ? (
        <>
          <Avatar onClick={handleClick} sx={{ cursor: "pointer" }} src={user.photoURL} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <Button onClick={logout}>Logout</Button>
            </Typography>
          </Popover>
        </>
      ) : (
        <Button onClick={() => Navigate("/auth/login")}>Signin</Button>
      )}
    </>
  );
};
export default Profile;
