import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DefectCheckbox(props) {
  // state for checkbox
  const [checked, setChecked] = useState(false);

  const { label } = props;
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      }
    />
  );
}

DefectCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
};
