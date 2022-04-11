import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import TitleWithProgress from "../components/TitleWithProgress";
import useAuthentication from "../hooks/useAuthentication";
import useDefectCookie from "../hooks/useDefectCookie";

// random misspelt titles
const titles = [
  "Step 1/3: Chose a rome",
  "cHOOSE A ROOM",
  "...",
  "user will now select a room",
];

// FUNCTIONS
function getAllRooms(setRooms, guests, checkin, checkout, setLoading) {
  setLoading(true);
  axios
    .get("/room", { params: { guests, checkin, checkout } })
    .then(
      (response) => {
        setRooms(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
    .finally(() => {
      setLoading(false);
    });
}

function closeSnackbar(setSnackOpen, event, reason) {
  if (reason === "clickaway") return;

  setSnackOpen(false);
}

export default function Rooms() {
  // state for rooms
  const [rooms, setRooms] = useState([]);

  // state for rooms loading
  const [loading, setLoading] = useState(true);

  // get guests., checkin, checkout from query params in url
  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  // state for snackbar
  const [snackOpen, setSnackOpen] = useState(false);

  // authentication hook
  const [authorised, logout, refreshAuthentication] = useAuthentication();

  // defect cookies hook
  const containsDefect = useDefectCookie();

  useEffect(() => {
    // query rates for room if not null
    if (guests !== null && checkin !== null && checkout !== null) {
      getAllRooms(setRooms, guests, checkin, checkout, setLoading);
    } else {
      // display error
      console.log("error");
    }
  }, [searchParams]);

  // on authorised update set snackbar to open or closed
  useEffect(() => {
    setSnackOpen(!authorised);
  }, [authorised]);

  return (
    <>
      <Navbar
        authorised={authorised}
        logout={logout}
        refreshAuthentication={refreshAuthentication}
      />
      <Snackbar
        // anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={10000}
        onClose={(event, reason) => {
          closeSnackbar(setSnackOpen, event, reason);
        }}
      >
        <Alert
          severity="warning"
          onClose={(event, reason) => {
            closeSnackbar(setSnackOpen, event, reason);
          }}
        >
          You must log in to reserve &amp; book a room
        </Alert>
      </Snackbar>

      <Container
        maxWidth="false"
        sx={{
          paddingTop: "64px",
        }}
      >
        <TitleWithProgress
          title={
            !containsDefect("Rooms_TitleTypo")
              ? "Step 1/3: Choose a room"
              : titles[Math.floor(Math.random() * titles.length)]
          }
          progress={33}
          mt={2}
          mb={2}
        />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            pt={2}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {rooms.map((room) => (
              <Grid item xl={3} key={room.id}>
                <RoomCard
                  roomid={room.id}
                  name={room.name}
                  description={room.description}
                  basePrice={room.basePrice}
                  searchParams={searchParams}
                  authorised={authorised}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
