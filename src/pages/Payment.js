import {
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";

import Navbar from "../components/Navbar";
import TitleWithProgress from "../components/TitleWithProgress";

export default function Payment() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Payment" progress={100} />

        <Typography variant="h6" component="h2">
          Ultimate Duluxe Suite | Flexible | 2nd June - 5th June
        </Typography>

        <Card sx={{ width: "50%" }}>
          <Box p={2}>
            <Typography mb={2}>
              <PaymentTwoToneIcon sx={{ position: "relative", top: "5px" }} />
              <strong>Payment</strong>
            </Typography>

            <Stack spacing={2}>
              <TextField label="Card number" />
              <TextField label="Exp MM" />
              <TextField label="Exp YY" />
              <Button variant="contained">Pay Now</Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </>
  );
}
