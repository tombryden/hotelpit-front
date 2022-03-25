import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import RateCard from "../components/RateCard";
import TitleWithProgress from "../components/TitleWithProgress";

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

export default function Rates() {
  // data from url - now changed to query params
  // const { state } = useLocation();
  // const { roomid } = state;

  // get roomid from query params in url
  const [searchParams] = useSearchParams();
  const roomid = searchParams.get("roomid");

  // state for rates
  const [rates, setRates] = useState([]);

  useEffect(() => {
    // query rates for room if not null
    if (roomid !== null) {
      getRatesForRoom(roomid, setRates);
    } else {
      // display error
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a rate" progress={66} />

        <Stack spacing={2}>
          {rates.map((rate) => (
            <RateCard
              key={rate.id}
              rate={rate.name}
              description={rate.description}
              ppn={rate.multiplier}
            />
          ))}

          {/* <RateCard
            rate="Flexible"
            description="Cancel up to one day before check in"
            ppn={100}
          />

          <RateCard
            rate="Flexible"
            description="Cancel up to one day before check in"
            ppn={100}
          />

          <RateCard
            rate="Flexible"
            description="Cancel up to one day before check in"
            ppn={100}
          />

          <RateCard
            rate="Flexible"
            description="Cancel up to one day before check in"
            ppn={100}
          /> */}
        </Stack>
      </Container>
    </>
  );
}
