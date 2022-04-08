import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";

import Navbar from "../components/Navbar";
import RateCard from "../components/RateCard";
import TitleWithProgress from "../components/TitleWithProgress";
import BookingProgress from "../components/BookingProgress";
import useAuthentication from "../hooks/useAuthentication";

// FUNCTIONS
export function getBookingInfo(bookingID, setBooking) {
  axios.get(`/booking/${bookingID}`).then(
    (response) => {
      // success - store booking data in state
      setBooking(response.data);
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
  const bookingid = searchParams.get("booking");

  // state for booking
  const [booking, setBooking] = useState();

  // authentication hook
  const [authorised, logout, refreshAuthentication] = useAuthentication();

  // navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    // query rates for room if not null
    if (bookingid !== null) {
      getBookingInfo(bookingid, setBooking);
    } else {
      // display error
      console.log("error");
    }
  }, [searchParams]);

  return (
    <>
      <Navbar
        authorised={authorised}
        logout={logout}
        refreshAuthentication={refreshAuthentication}
      />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Step 2/3: Choose a rate" progress={66} />
        <Box sx={{ display: "flex", gap: "100px" }}>
          <Box sx={{ flex: "2" }}>
            <Stack spacing={2}>
              {booking &&
                booking.room.rates.map((rate) => (
                  <RateCard
                    key={rate.id}
                    rate={rate.name}
                    description={rate.description}
                    ppn={rate.multiplier}
                    roomBasePrice={booking.room.basePrice}
                    nights={booking.nights}
                    bookingid={booking.id}
                    rateid={rate.id}
                  />
                ))}
            </Stack>
          </Box>

          <Box sx={{ flex: "1" }}>
            {booking && (
              <BookingProgress
                room={booking.room.name}
                checkin={booking.checkInDate}
                checkout={booking.checkOutDate}
                navigate={navigate}
                guests={booking.totalGuests}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
