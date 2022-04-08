import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import SignInCard from "./SignInCard";
import useReservation from "../hooks/useReservation";
import ModalBookings from "./ModalBookings";
import ModalDefects from "./ModalDefects";

function redirectToReservation(navigate, getReservationIfExists) {
  // get user current reservation, check if rate is null.. if it is, redirect to rate page.. if not null, redirect to payment page
  axios.get("/user/reservation").then(
    (response) => {
      if (response.data.rate) {
        navigate({
          pathname: "/payment",
          search: createSearchParams({
            booking: response.data.id,
          }).toString(),
        });
      } else {
        navigate({
          pathname: "/rates",
          search: createSearchParams({
            booking: response.data.id,
          }).toString(),
        });
      }
    },
    () => {
      // no reservation found.. reffresh reservation info
      getReservationIfExists();
    }
  );
}

export default function Navbar(props) {
  const navigate = useNavigate();

  // custom authentication hook
  const { authorised, logout, refreshAuthentication } = props;

  // reservation hook
  const [reservationRemaining, getReservationIfExists] = useReservation();

  // state for sign in card visibility
  const [signVisible, setSignVisible] = useState(false);

  // state for account menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // state for backdrop
  const [modalOpen, setModalOpen] = useState({ modal: "none", open: false });

  return (
    <>
      {/* modal - overlay for account menu stuff */}
      <Modal
        sx={{ padding: "80px", zIndex: "999999" }}
        p={2}
        open={modalOpen.open}
        onClose={() => {
          setModalOpen({ modal: "none", open: false });
        }}
      >
        <>
          {modalOpen.modal === "bookings" && <ModalBookings />}
          {modalOpen.modal === "defects" && <ModalDefects />}
        </>
      </Modal>

      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="span"
            onClick={() => {
              navigate("/");
            }}
          >
            HotelPit
          </Typography>

          <Tooltip title="Return to booking reservation">
            <Typography
              sx={{ cursor: "pointer" }}
              component="span"
              onClick={() => {
                redirectToReservation(navigate, getReservationIfExists);
              }}
            >
              {reservationRemaining && `Reservation: ${reservationRemaining}`}
            </Typography>
          </Tooltip>

          <Box>
            {!authorised ? (
              <>
                <Typography
                  sx={{ cursor: "pointer" }}
                  component="span"
                  onClick={() => {
                    // set sign in card visible to opposite of current state
                    setSignVisible(!signVisible);
                  }}
                >
                  Sign In
                </Typography>
                <SignInCard
                  visible={signVisible}
                  refreshAuthentication={refreshAuthentication}
                  getReservationIfExists={getReservationIfExists}
                />
              </>
            ) : (
              <>
                <Tooltip title="Your account">
                  <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    <Avatar>T</Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => {
                    setAnchorEl(null);
                  }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setModalOpen({ modal: "defects", open: true });
                    }}
                  >
                    Defects
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setModalOpen({ modal: "bookings", open: true });
                    }}
                  >
                    Bookings
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={async () => {
                      setAnchorEl(null);
                      await logout();
                      getReservationIfExists();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

Navbar.propTypes = {
  authorised: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  refreshAuthentication: PropTypes.func.isRequired,
};
