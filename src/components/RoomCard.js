import { Card, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

import HomeImg from "../images/home.jpg";
import "../index.css";
import useDefectCookie from "../hooks/useDefectCookie";

// FUNCTIONS
function reserveRoomAndRedirect(
  roomID,
  checkInDate,
  checkOutDate,
  totalGuests,
  navigate,
  setBtnLoading
) {
  setBtnLoading(true);

  axios
    .post("/booking/reserve", {
      roomID,
      checkInDate,
      checkOutDate,
      totalGuests,
    })
    .then(
      (response) => {
        // reservation created successfully.. get ID and redirect
        navigate({
          pathname: "/rates",
          search: createSearchParams({
            booking: response.data.id,
          }).toString(),
        });
      },
      (error) => {
        setBtnLoading(false);
        console.log(error);
      }
    );
}

function RoomCard(props) {
  const { roomid, name, description, basePrice, searchParams, authorised } =
    props;

  // get search params passed from parent rooms page
  const guests = searchParams.get("guests");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  // state for button loading
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const containsDefect = useDefectCookie();

  return (
    <Card>
      <Box>
        <img
          src={HomeImg}
          className="imgFit"
          alt="RoomCard"
          height="200px"
          width="100%"
        />

        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" component="h1">
            {containsDefect("Rooms_Mismatch") ? description : name}
          </Typography>

          <Typography mb={2}>
            {containsDefect("Rooms_Mismatch") ? name : description}
          </Typography>

          <Tooltip
            title={
              !authorised
                ? "Please log in to continue"
                : "Room will be reserved for 10 minutes"
            }
          >
            <Box component="span" sx={{ alignSelf: "center" }}>
              {!containsDefect("Rooms_NoBook") && (
                <LoadingButton
                  disabled={!authorised}
                  variant="contained"
                  loading={btnLoading}
                  size="large"
                  onClick={() => {
                    reserveRoomAndRedirect(
                      roomid,
                      checkin,
                      checkout,
                      guests,
                      navigate,
                      setBtnLoading
                    );
                  }}
                >
                  Book from £{basePrice}/night
                </LoadingButton>
              )}
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
}

// prop types
RoomCard.propTypes = {
  roomid: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  basePrice: PropTypes.string,
  searchParams: PropTypes.instanceOf(Object).isRequired,
  authorised: PropTypes.bool.isRequired,
};

RoomCard.defaultProps = {
  roomid: 1,
  name: "Example Room Name",
  description: "Example room description",
  basePrice: "99.99",
};

export default RoomCard;
