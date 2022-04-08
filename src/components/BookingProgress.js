import { Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { createSearchParams } from "react-router-dom";

import HomeImg from "../images/home.jpg";
import "../index.css";

function redirectToRates(navigate, bookingid) {
  // on click on rate text from payment page, redirect to rates page with booking id
  navigate({
    pathname: "/rates",
    search: createSearchParams({
      booking: bookingid,
    }).toString(),
  });
}

function redirectToRooms(navigate, checkin, checkout, guests) {
  // dates come in format yyyy-mm-dd, so just replace - with nothing and redirect
  const checkinFinal = checkin.replaceAll("-", "");
  const checkOutFinal = checkout.replaceAll("-", "");

  navigate({
    pathname: "/rooms",
    search: createSearchParams({
      guests,
      checkin: checkinFinal,
      checkout: checkOutFinal,
    }).toString(),
  });
}

export default function BookingProcess(props) {
  const { room, checkin, checkout, rate, price, bookingid, navigate, guests } =
    props;

  return (
    <Box>
      <img
        src={HomeImg}
        className="imgFit"
        alt="RoomCard"
        height="300px"
        width="100%"
      />

      <Box>
        <Stack alignItems="flex-start">
          <Tooltip title="Change room">
            <Typography
              variant="h6"
              component="span"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                redirectToRooms(navigate, checkin, checkout, guests);
              }}
            >
              <u>{room}</u>
            </Typography>
          </Tooltip>
          <Typography>Check in: {checkin}</Typography>
          <Typography>Check in: {checkout}</Typography>
          {rate && (
            <Typography>
              Rate:{" "}
              <Tooltip title="Change rate">
                <Typography
                  component="span"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    redirectToRates(navigate, bookingid);
                  }}
                >
                  <u>{rate}</u>
                </Typography>
              </Tooltip>
            </Typography>
          )}
          {price && <Typography>Price: £{price}</Typography>}
        </Stack>
      </Box>
    </Box>
  );
}

BookingProcess.propTypes = {
  room: PropTypes.string.isRequired,
  checkin: PropTypes.string.isRequired,
  checkout: PropTypes.string.isRequired,
  rate: PropTypes.string,
  price: PropTypes.string,
  bookingid: PropTypes.string,
  navigate: PropTypes.func.isRequired,
  guests: PropTypes.number.isRequired,
};

BookingProcess.defaultProps = {
  rate: null,
  price: null,
  bookingid: null,
};
