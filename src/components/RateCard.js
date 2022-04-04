import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function RateCard(props) {
  // ppn = price per night
  const { rate, description, ppn, roomBasePrice } = props;

  const finalPrice = (roomBasePrice * ppn).toFixed(2);

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
            <strong>£{finalPrice} / night</strong>
          </Typography>
          <Typography>£xxx total</Typography>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Book for £xxx
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
};

RateCard.defaultProps = {
  rate: "Rate",
  description: "Brief description about rate",
  ppn: 0,
  roomBasePrice: "0.00",
};
