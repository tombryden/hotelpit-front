import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import ModalCardContent from "./ModalCardContent";

function getAllBookings(setBookings) {
  axios.get("/user/bookings").then(
    (response) => {
      // successfully got bookings
      setBookings(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

export default function ModalBookings() {
  // state for bookings
  const [bookings, setBookings] = useState();

  // on mount get all bookings to add to table
  useEffect(() => {
    getAllBookings(setBookings);
  }, []);

  return (
    <ModalCardContent>
      <Typography variant="h4" component="h1" mb={1}>
        Bookings
      </Typography>

      <TableContainer sx={{ maxHeight: "90%" }}>
        <Table stickyHeader>
          {/* table header row */}
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>

          {/* table row content */}
          <TableBody>
            {bookings &&
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell component="th" scope="row">
                    {booking.id}
                  </TableCell>
                  <TableCell>{booking.room.name}</TableCell>
                  <TableCell>
                    {booking.rate ? booking.rate.name : "N/A"}
                  </TableCell>
                  <TableCell>{booking.checkInDate}</TableCell>
                  <TableCell>{booking.checkOutDate}</TableCell>
                  <TableCell>{booking.totalGuests}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    {booking.totalPrice ? `£${booking.totalPrice}` : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ModalCardContent>
  );

  /** roomid: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  basePrice: PropTypes.string,
  searchParams: PropTypes.instanceOf(Object).isRequired,
  authorised: PropTypes.bool.isRequired, */
}
