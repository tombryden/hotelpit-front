import { Container, Typography } from "@mui/material";

import Navbar from "../components/Navbar";
import useAuthentication from "../hooks/useAuthentication";

export default function Confirmation() {
  const [authorised, logout, refreshAuthentication] = useAuthentication();

  return (
    <>
      <Navbar
        authorised={authorised}
        logout={logout}
        refreshAuthentication={refreshAuthentication}
      />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <Typography variant="h3" component="h1" mt={1}>
          Booking confirmed
        </Typography>
      </Container>
    </>
  );
}
