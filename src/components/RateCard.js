import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useDefectCookie from "../hooks/useDefectCookie";

// FUNCTIONS
function addRateToBookingAndRedirect(
  bookingid,
  rateid,
  navigate,
  setBtnLoading
) {
  setBtnLoading(true);

  axios.patch(`/booking/${bookingid}/rate`, null, { params: { rateid } }).then(
    () => {
      // successfully added rate to booking.. redirect to payment page
      navigate({
        pathname: "/payment",
        search: createSearchParams({
          booking: bookingid,
        }).toString(),
      });
    },
    (error) => {
      setBtnLoading(false);
      console.log(error);
    }
  );
}

export default function RateCard(props) {
  // ppn = price per night
  const { rate, description, ppn, roomBasePrice, nights, bookingid, rateid } =
    props;

  const finalPricePerNight = (roomBasePrice * ppn).toFixed(2);

  let finalPriceTotal = finalPricePerNight * nights;

  // defect cookie hook
  const containsDefect = useDefectCookie();
  // if there is rate calc defect then edit the total price
  if (containsDefect("Rates_CalculationIncorrect")) {
    finalPriceTotal += Math.floor(Math.random() * 200) + 1;
  }

  const navigate = useNavigate();

  // state for button loading
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        p={2}
      >
        <Box>
          <Typography variant="h5" component="h1">
            {rate}
          </Typography>
          <Typography>{description}</Typography>
        </Box>

        <Box ml="auto">
          <Typography variant="h5" component="p">
            <strong>£{finalPricePerNight} / night</strong>
          </Typography>
          <Typography>
            {nights}x {nights === 1 ? "night" : "nights"} = £{finalPriceTotal}{" "}
            total
          </Typography>

          <LoadingButton
            variant="contained"
            loading={btnLoading}
            onClick={() => {
              addRateToBookingAndRedirect(
                bookingid,
                rateid,
                navigate,
                setBtnLoading
              );
            }}
          >
            Book for £{finalPriceTotal}
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  );
}

// prop types
RateCard.propTypes = {
  rate: PropTypes.string,
  description: PropTypes.string,
  ppn: PropTypes.number,
  roomBasePrice: PropTypes.string,
  nights: PropTypes.number,
  bookingid: PropTypes.string.isRequired,
  rateid: PropTypes.number.isRequired,
};

RateCard.defaultProps = {
  rate: "Rate",
  description: "Brief description about rate",
  ppn: 0,
  roomBasePrice: "0.00",
  nights: 0,
};
