import { Button, Card, MenuItem, Stack, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import "./App.css";
import { DesktopDatePicker } from "@mui/lab";
import { useState } from "react";

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

// MAIN RENDER
function App() {
  // state for check in / out picker
  const [checkIn, setCheckIn] = useState(moment(new Date()));
  const [checkOut, setCheckOut] = useState(addDaysToDate(new Date(), 1));
  // begin min date +1 from now..
  const [minCheckOut, setMinCheckOut] = useState(addDaysToDate(new Date(), 1));

  // state for guests
  const [guests, setGuests] = useState("1");

  return (
    <div className="contHome">
      <Card className="cardSearch">
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
                setCheckOut(val);
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />

            <TextField
              className="inputGuests"
              label="Guests"
              select
              value={guests}
              onChange={(event) => {
                setGuests(event.target.value);
              }}
            >
              {guestNums.map((num) => (
                <MenuItem key={num.value} value={num.value}>
                  {num.label}
                </MenuItem>
              ))}
            </TextField>

            <Button className="btnSearch" variant="contained">
              Search
            </Button>
          </Stack>
        </LocalizationProvider>
      </Card>
    </div>
  );
}

export default App;
