import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";

import Navbar from "../components/Navbar";
import RateCard from "../components/RateCard";
import TitleWithProgress from "../components/TitleWithProgress";
import BookingProgress from "../components/BookingProgress";

// FUNCTIONS
function getRatesForRoom(roomid, setRates) {
  axios.get(`/rate/room/${roomid}`, null).then(
    (response) => {
      setRates(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

function getRoomInfo(roomid, setRoom) {
  axios.get(`/room/${roomid}`, null).then(
    (response) => {
      console.log(response.data);
      setRoom(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

export default function Rates() {
  // data from url - now changed to query params
  // const { state } = useLocation();
  // const { roomid } = state;

  // get roomid from query params in url
  const [searchParams] = useSearchParams();
  const roomid = searchParams.get("roomid");

  // state for rates
  const [rates, setRates] = useState([]);

  // state for room obj
  const [room, setRoom] = useState();

  useEffect(() => {
    // query rates for room if not null
    if (roomid !== null) {
      getRatesForRoom(roomid, setRates);
      getRoomInfo(roomid, setRoom);
    } else {
      // display error
      console.log("error");
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a rate" progress={66} />
        <Box sx={{ display: "flex", gap: "100px" }}>
          <Box sx={{ flex: "2" }}>
            <Stack spacing={2}>
              {room &&
                rates.map((rate) => (
                  <RateCard
                    key={rate.id}
                    rate={rate.name}
                    description={rate.description}
                    ppn={rate.multiplier}
                    roomBasePrice={room.basePrice}
                  />
                ))}
            </Stack>
          </Box>

          <Box sx={{ flex: "1" }}>
            <BookingProgress />
          </Box>
        </Box>
      </Container>
    </>
  );
}
