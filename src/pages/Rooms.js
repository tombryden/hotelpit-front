import { Container, Grid } from "@mui/material";

import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import TitleWithProgress from "../components/TitleWithProgress";

export default function Rooms() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a room" progress={33} mt={2} mb={2} />

        <Grid container spacing={2}>
          <Grid item xl={3}>
            <RoomCard />
          </Grid>
          <Grid item xl={3}>
            <RoomCard />
          </Grid>
          <Grid item xl={3}>
            <RoomCard />
          </Grid>
          <Grid item xl={3}>
            <RoomCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
