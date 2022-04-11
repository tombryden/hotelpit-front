import { Button, Card, MenuItem, Stack, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { DesktopDatePicker } from "@mui/lab";
import { useState } from "react";
import { Box } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";

import HomeImg from "../images/home.jpg";
import Navbar from "../components/Navbar";
import useAuthentication from "../hooks/useAuthentication";
import useDefectCookie from "../hooks/useDefectCookie";

const guestNums = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];

// FUNCTIONS
function addDaysToDate(date, days) {
  const newDate = moment(date).add(days, "days");
  return newDate;
}

function convertDateToReqStr(date) {
  return moment(date).format("YYYYMMDD");
}

// MAIN RENDER
function Home() {
  // state for check in / out picker
  const [checkIn, setCheckIn] = useState(moment(new Date()));
  const [checkOut, setCheckOut] = useState(addDaysToDate(new Date(), 1));
  // begin min date +1 from now..
  const [minCheckOut, setMinCheckOut] = useState(addDaysToDate(new Date(), 1));

  // state for guests
  const [guests, setGuests] = useState("1");

  // navigation hook
  const navigate = useNavigate();

  // authentication hook
  const [authorised, logout, refreshAuthentication] = useAuthentication();

  // cookies hook
  const containsDefect = useDefectCookie();

  return (
    <>
      <Navbar
        authorised={authorised}
        logout={logout}
        refreshAuthentication={refreshAuthentication}
      />
      <Box
        sx={{
          height: "100vh",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          backgroundImage: `url(${HomeImg})`,
          backgroundPosition: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",
            padding: "20px",
          }}
        >
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={2} direction="row">
              <DesktopDatePicker
                disablePast
                label="CHECK-IN"
                inputFormat="DD/MM/YYYY"
                value={checkIn}
                onChange={(val) => {
                  setCheckIn(val);
                  setCheckOut(addDaysToDate(val, 1));
                  setMinCheckOut(addDaysToDate(val, 1));
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />

              <DesktopDatePicker
                minDate={minCheckOut}
                label="CHECK-OUT"
                inputFormat="DD/MM/YYYY"
                value={checkOut}
                onChange={(val) => {
                  if (containsDefect("Home_Checkout")) return;
                  setCheckOut(val);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />

              <TextField
                sx={{ width: "200px" }}
                label="Guests"
                select
                value={guests}
                onChange={(event) => {
                  if (containsDefect("Home_GuestSelector")) return;
                  setGuests(event.target.value);
                }}
              >
                {guestNums.map((num) => (
                  <MenuItem key={num.value} value={num.value}>
                    {num.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                sx={{ width: "200px" }}
                variant="contained"
                onClick={() => {
                  // check if defect cookies contains searchNotWorking
                  // console.log(containsDefect("searchNotWorking"));
                  if (containsDefect("Home_Search")) return;

                  navigate({
                    pathname: "/rooms",
                    search: createSearchParams({
                      guests,
                      checkin: convertDateToReqStr(checkIn),
                      checkout: convertDateToReqStr(checkOut),
                    }).toString(),
                  });
                }}
              >
                Search
              </Button>
            </Stack>
          </LocalizationProvider>
        </Card>
      </Box>
    </>
  );
}

export default Home;
