import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function RateCard(props) {
  // ppn = price per night
  const { rate, description, ppn, roomBasePrice, nights } = props;

  const finalPricePerNight = (roomBasePrice * ppn).toFixed(2);

  const finalPriceTotal = finalPricePerNight * nights;

  const navigate = useNavigate();

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

          <Button
            variant="contained"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Book for £{finalPriceTotal}
          </Button>
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
};

RateCard.defaultProps = {
  rate: "Rate",
  description: "Brief description about rate",
  ppn: 0,
  roomBasePrice: "0.00",
  nights: 0,
};
