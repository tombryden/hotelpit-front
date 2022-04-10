import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

import DefectCheckboxes from "./DefectCheckboxes";
import ModalCardContent from "./ModalCardContent";

// get defect by category & page
function getDefectsByCategoryAndPage(category, page, setDefects) {
  axios.get("/defect", { params: { category, page } }).then(
    (response) => {
      setDefects(response.data);
    },
    (error) => {
      // unauthorised
      console.log(error);
    }
  );
}

export default function ModalDefects() {
  // state for defects
  const [homeFunctionalDefects, setHomeFunctionalDefects] = useState();

  // on mount, load defects
  useEffect(() => {
    getDefectsByCategoryAndPage("FUNCTIONAL", "HOME", setHomeFunctionalDefects);
  }, []);

  return (
    <ModalCardContent>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1, borderRight: "1px solid black" }}>
          <Typography variant="h4" component="h2" mb={1} align="center">
            <u>Functional Defects</u>
          </Typography>

          <Typography variant="h5" component="p">
            Home page defects
          </Typography>
          {homeFunctionalDefects && (
            <DefectCheckboxes defects={homeFunctionalDefects} />
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h2" mb={1} align="center">
            <u>Non-Functional Defects</u>
          </Typography>
        </Box>
      </Box>
    </ModalCardContent>
  );
}
