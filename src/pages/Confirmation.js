import { Container, Typography } from "@mui/material";

import Navbar from "../components/Navbar";

export default function Confirmation() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <Typography variant="h1">Thanks for booking</Typography>
      </Container>
    </>
  );
}
