import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import TitleWithProgress from "../components/TitleWithProgress";

// FUNCTIONS
function getAllRooms(setRooms, guests, checkin, checkout) {
  axios.get("/room", { params: { guests, checkin, checkout } }).then(
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

  // get guests., checkin, checkout from query params in url
  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  useEffect(() => {
    // query rates for room if not null
    if (guests !== null && checkin !== null && checkout !== null) {
      getAllRooms(setRooms, guests, checkin, checkout);
    } else {
      // display error
      console.log("error");
    }
  }, [searchParams]);

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
                searchParams={searchParams}
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
