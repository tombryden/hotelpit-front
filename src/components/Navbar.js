import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInCard from "./SignInCard";

// FUNCTIONS
function setAuthorisedOptions(setAuthorised) {
  axios.get("/user/auth").then(
    () => {
      // user is authorised as 200 status
      setAuthorised(true);
    },
    () => {
      // user not authorised.. 401 unauth or error
      setAuthorised(false);
    }
  );
}

function logout(setAuthorised) {
  axios.post("/user/logout").then(
    () => {
      setAuthorisedOptions(setAuthorised);
    },
    () => {
      setAuthorisedOptions(setAuthorised);
    }
  );
}

export default function Navbar() {
  const navigate = useNavigate();

  // state for if user is logged in
  const [authorised, setAuthorised] = useState(false);
  useEffect(() => {
    // on comp load check if user is authorised and set state
    setAuthorisedOptions(setAuthorised);
  }, []);

  // state for sign in card visibility
  const [signVisible, setSignVisible] = useState(false);

  // state for account menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="span"
          onClick={() => {
            navigate("/");
          }}
        >
          HotelPit
        </Typography>

        {!authorised ? (
          <Box ml="auto">
            <Typography
              sx={{ cursor: "pointer" }}
              component="span"
              onClick={() => {
                // set sign in card visible to opposite of current state
                setSignVisible(!signVisible);
              }}
            >
              Sign In
            </Typography>
            <SignInCard
              visible={signVisible}
              setAuthorisedOptions={() => {
                setAuthorisedOptions(setAuthorised);
              }}
            />
          </Box>
        ) : (
          <Box ml="auto">
            <Tooltip title="Your account">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                <Avatar>T</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Bookings</MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  logout(setAuthorised);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
