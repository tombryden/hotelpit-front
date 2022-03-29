import { Button, Container, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <Typography mt={2}>Login</Typography>
        <TextField label="Username" />
        <TextField label="Password" />
        <Button variant="contained">Login</Button>

        <Typography mt={2}>Sign up</Typography>
        <TextField label="Username" />
        <TextField label="Password" />
        <Button variant="contained">Sign up</Button>
      </Container>
    </>
  );
}
