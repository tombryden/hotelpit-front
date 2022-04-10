import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import useDefectCookie from "../hooks/useDefectCookie";
// import axios from "axios";

function addDefectToCookie(defectCookie, cookies, add) {
  // get current cookies if any
  const currentDefectCookies = cookies.get("defects");

  // if current defects selected, add to list
  if (currentDefectCookies) {
    // parse json
    const defectArr = currentDefectCookies;
    if (add) {
      defectArr.push(defectCookie);
    } else {
      const index = defectArr.indexOf(defectCookie);
      if (index > -1) {
        defectArr.splice(index, 1);
      }
    }

    // if no defects remain.. remove cookie
    if (defectArr.length === 0) {
      cookies.remove("defects");
      return;
    }

    const jsonArr = JSON.stringify(defectArr);
    console.log(jsonArr);

    // stringify json and set cookie
    cookies.set("defects", jsonArr, { path: "/", maxAge: 2147483647 });
  } else {
    // no defects currently, new list needed
    const defectArr = [defectCookie];

    const jsonArr = JSON.stringify(defectArr);

    console.log(jsonArr);

    // stingify json and set cookie
    cookies.set("defects", jsonArr, { path: "/", maxAge: 2147483647 });
  }
}

export default function DefectCheckbox(props) {
  // props
  const { label, cookie } = props;

  // cookies
  const cookies = new Cookies();

  // cookie hook
  const containsDefect = useDefectCookie();

  // state for checkbox
  const [checked, setChecked] = useState(false);

  // on change event - set cookie and update database
  function onHandleChange(event) {
    setChecked(event.target.checked);

    addDefectToCookie(cookie, cookies, event.target.checked);
  }

  // on comp mount (cookie change) check if current cookie is already in cookies
  // if true then set to checked
  useEffect(() => {
    if (containsDefect(cookie)) setChecked(true);
  }, [cookie]);

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox checked={checked} onChange={(e) => onHandleChange(e)} />
      }
    />
  );
}

DefectCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  cookie: PropTypes.string.isRequired,
};
