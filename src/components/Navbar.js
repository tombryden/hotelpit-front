import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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
      </Toolbar>
    </AppBar>
  );
}
