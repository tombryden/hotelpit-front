/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function setRemainingReservationTime(
  reservationEndDate,
  setReservationCountdown,
  setReservationCountdownFormatted,
  getReservationIfExists
) {
  const currentDate = new Date();
  const unixDiff =
    reservationEndDate.toDate().getTime() - currentDate.getTime();

  // get minutes and seconds of this time difference
  const dateDiff = new Date(unixDiff);
  const mins = dateDiff.getMinutes();
  const secs = dateDiff.getSeconds();
  const differenceString = `${mins} minutes ${secs} seconds`;

  // if minutes are above 10 (then time will have reversed as minus minute cant occur), expired so refresh to double check
  if (mins > 10) {
    getReservationIfExists();
    return;
  }

  setReservationCountdown(unixDiff);
  setReservationCountdownFormatted(differenceString);
}

export default function useReservation() {
  // state for reservation time
  const [reservationCreationTimeStamp, setReservationCreationTimeStamp] =
    useState();

  // state for reservation countdown.. countdown = unix time difference, formatted = text eg: 9 minutes 10 seconds
  const [reservationCountdown, setReservationCountdown] = useState();
  const [reservationCountdownFormatted, setReservationCountdownFormatted] =
    useState();

  // method for refreshing creation timestamp
  function getReservationIfExists() {
    axios.get("/user/reservation").then(
      (response) => {
        // reservation exists.. set creation timestamp
        setReservationCreationTimeStamp(response.data.creationTimestamp);
      },
      () => {
        // error - dont care what the error is, just reset the creation timestamp
        setReservationCreationTimeStamp();
        setReservationCountdownFormatted();
      }
    );
  }

  // on mount get reservation if exists
  useEffect(() => {
    getReservationIfExists();
  }, []);

  // count down on reservation creation timestamp change
  useEffect(() => {
    // ensure reservation exists before counting down
    if (!reservationCreationTimeStamp) return null;

    // add 10 mins to creationTimeStamp to calculate the end time
    const reservationCreationDate = new Date(reservationCreationTimeStamp);
    const reservationEndDate = moment(reservationCreationDate).add(
      10,
      "minutes"
    );

    // get current date and calculate unix time difference
    setRemainingReservationTime(
      reservationEndDate,
      setReservationCountdown,
      setReservationCountdownFormatted,
      getReservationIfExists
    );

    // create 1 second interval to countdown
    const countdownInterval = setInterval(() => {
      // refresh remaining time every 1 second
      setRemainingReservationTime(
        reservationEndDate,
        setReservationCountdown,
        setReservationCountdownFormatted,
        getReservationIfExists
      );
    }, 1000);

    // when component unmounts, clear the refresh interval
    return () => clearInterval(countdownInterval);
  }, [reservationCreationTimeStamp]);

  return [reservationCountdownFormatted, getReservationIfExists];
}
