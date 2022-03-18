import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

import HomeImg from "../images/home.jpg";
import "../index.css";

function RoomCard() {
  const navigate = useNavigate();

  return (
    <Card>
      <Box>
        <img
          src={HomeImg}
          className="imgFit"
          alt="RoomCard"
          height="200px"
          width="100%"
        />

        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" component="h1">
            Ultimate Duluxe Suite
          </Typography>

          <Typography mb={2}>A brief description about the room</Typography>

          <Button
            variant="contained"
            sx={{ alignSelf: "center" }}
            size="large"
            onClick={() => {
              navigate("/details");
            }}
          >
            Book for £80/night
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default RoomCard;
