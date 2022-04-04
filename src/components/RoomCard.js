import { Button, Card, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

import HomeImg from "../images/home.jpg";
import "../index.css";

function RoomCard(props) {
  const { roomid, name, description, basePrice, searchParams, authorised } =
    props;

  // get search params passed from parent rooms page
  const guests = searchParams.get("guests");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("test");
  }, [authorised]);

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
            {name}
          </Typography>

          <Typography mb={2}>{description}</Typography>

          <Tooltip
            title={
              !authorised
                ? "Please log in to continue"
                : "Room will be reserved for 10 minutes"
            }
          >
            <Box component="span" sx={{ alignSelf: "center" }}>
              <Button
                disabled={!authorised}
                variant="contained"
                size="large"
                onClick={() => {
                  navigate({
                    pathname: "/rates",
                    search: createSearchParams({
                      guests,
                      checkin,
                      checkout,
                      roomid,
                    }).toString(),
                  });
                }}
              >
                Book from £{basePrice}/night
              </Button>
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
