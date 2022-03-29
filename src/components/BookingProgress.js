import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import HomeImg from "../images/home.jpg";
import "../index.css";

export default function BookingProcess() {
  return (
    <Box>
      <img
        src={HomeImg}
        className="imgFit"
        alt="RoomCard"
        height="300px"
        width="100%"
      />

      <Box>
        <Stack alignItems="flex-start">
          <Typography variant="h6">The Duluxe Suite</Typography>
          <Typography>Check in: 29/03/22</Typography>
          <Typography>Check in: 01/04/22</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
