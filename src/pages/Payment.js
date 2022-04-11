import { Card, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import Navbar from "../components/Navbar";
import TitleWithProgress from "../components/TitleWithProgress";
import useAuthentication from "../hooks/useAuthentication";
import BookingProgress from "../components/BookingProgress";
import { getBookingInfo } from "./Rates";

function payAndConfirmReservation(
  cardNumber,
  expMonth,
  expYear,
  bookingID,
  setBtnLoading,
  navigate
) {
  setBtnLoading(true);
  axios.post("/booking/pay", { cardNumber, expMonth, expYear, bookingID }).then(
    () => {
      // successfully confirmed booking - redirect to confirmation page
      navigate("/confirmation");
    },
    (error) => {
      setBtnLoading(false);
      console.log(error);
    }
  );
}

export default function Payment() {
  const [authorised, logout, refreshAuthentication] = useAuthentication();

  // states for input
  const [card, setCard] = useState("");
  const [expM, setExpM] = useState("");
  const [expY, setExpY] = useState("");

  // get booking id from url
  const [searchParams] = useSearchParams();
  const bookingid = searchParams.get("booking");

  // navigate hook
  const navigate = useNavigate();

  // state for pay button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // state for booking info
  const [booking, setBooking] = useState();

  // on mount get booking info for progress
  useEffect(() => {
    getBookingInfo(bookingid, setBooking);
  }, []);

  return (
    <>
      <Navbar
        authorised={authorised}
        logout={logout}
        refreshAuthentication={refreshAuthentication}
      />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Step 3/3: Payment" progress={100} />

        <Box sx={{ display: "flex", gap: "100px" }}>
          <Card sx={{ flex: 2, height: "100%" }}>
            <Box p={2}>
              <Typography mb={2}>
                <PaymentTwoToneIcon sx={{ position: "relative", top: "5px" }} />
                <strong>Payment</strong>
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Card number"
                  onChange={(e) => {
                    setCard(e.target.value);
                  }}
                  value={card}
                />
                <TextField
                  label="Exp MM"
                  onChange={(e) => {
                    setExpM(e.target.value);
                  }}
                  value={expM}
                />
                <TextField
                  label="Exp YY"
                  onChange={(e) => {
                    setExpY(e.target.value);
                  }}
                  value={expY}
                />
                <LoadingButton
                  loading={btnLoading}
                  variant="contained"
                  onClick={() => {
                    payAndConfirmReservation(
                      card,
                      expM,
                      expY,
                      bookingid,
                      setBtnLoading,
                      navigate
                    );
                  }}
                >
                  Pay Now
                </LoadingButton>
              </Stack>
            </Box>
          </Card>

          <Box sx={{ flex: 1 }}>
            {booking && (
              <BookingProgress
                room={booking.room.name}
                checkin={booking.checkInDate}
                checkout={booking.checkOutDate}
                rate={booking.rate ? booking.rate.name : null}
                price={booking.totalPrice}
                navigate={navigate}
                bookingid={bookingid}
                guests={booking.totalGuests}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
