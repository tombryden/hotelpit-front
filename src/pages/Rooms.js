import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import TitleWithProgress from "../components/TitleWithProgress";

// FUNCTIONS
function getAllRooms(setRooms) {
  axios.get("/room", null).then(
    (response) => {
      setRooms(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

export default function Rooms() {
  // state for rooms
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllRooms(setRooms);
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a room" progress={33} mt={2} mb={2} />

        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xl={3} key={room.id}>
              <RoomCard
                roomid={room.id}
                name={room.name}
                description={room.description}
                basePrice={room.basePrice}
              />
            </Grid>
          ))}

          {/* <Grid item xl={3}>
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
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
