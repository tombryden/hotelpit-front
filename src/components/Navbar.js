import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInCard from "./SignInCard";

export default function Navbar() {
  const navigate = useNavigate();

  // state for sign in card visibility
  const [signVisible, setSignVisible] = useState(false);

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
          <SignInCard visible={signVisible} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
