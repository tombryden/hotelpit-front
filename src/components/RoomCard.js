import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import HomeImg from "../images/home.jpg";
import "../index.css";

function RoomCard(props) {
  const { name, description, basePrice } = props;

  const navigate = useNavigate();

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

          <Button
            variant="contained"
            sx={{ alignSelf: "center" }}
            size="large"
            onClick={() => {
              navigate("/details");
            }}
          >
            Book from £{basePrice}/night
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

// prop types
RoomCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  basePrice: PropTypes.string,
};

RoomCard.defaultProps = {
  name: "Example Room Name",
  description: "Example room description",
  basePrice: "99.99",
};

export default RoomCard;
