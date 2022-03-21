import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export default function RateCard(props) {
  // ppn = price per night
  const { rate, description, ppn } = props;

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
            <strong>£{ppn} / night</strong>
          </Typography>
          <Typography>£300 total</Typography>

          <Button variant="contained">Book for £300</Button>
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
};

RateCard.defaultProps = {
  rate: "Rate",
  description: "Brief description about rate",
  ppn: 0,
};
