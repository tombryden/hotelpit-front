import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function FunctionalHomeDefects() {
  // state for checkbox's
  const [checked, setChecked] = useState([true, false]);

  function handleParentChange(event) {
    setChecked([event.target.checked, event.target.checked]);
  }

  function handleChange0(event) {
    setChecked([event.target.checked, checked[1]]);
  }

  function handleChange1(event) {
    setChecked([checked[0], event.target.checked]);
  }

  return (
    <>
      <FormControlLabel
        label={
          <Typography variant="h5" component="p">
            Home page defects
          </Typography>
        }
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={(e) => handleParentChange(e)}
          />
        }
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        <FormControlLabel
          label="First home defect"
          control={
            <Checkbox
              checked={checked[0]}
              onChange={(e) => {
                handleChange0(e);
              }}
            />
          }
        />

        <FormControlLabel
          label="Second home defect"
          control={
            <Checkbox
              checked={checked[1]}
              onChange={(e) => {
                handleChange1(e);
              }}
            />
          }
        />
      </Box>
    </>
  );
}
