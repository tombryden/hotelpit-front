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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SignInCard from "./SignInCard";

export default function Navbar(props) {
  const navigate = useNavigate();

  // custom authentication hook
  const { authorised, logout, refreshAuthentication } = props;

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
              refreshAuthentication={refreshAuthentication}
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
                  logout();
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

Navbar.propTypes = {
  authorised: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  refreshAuthentication: PropTypes.func.isRequired,
};
