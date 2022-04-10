import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import DefectCheckbox from "./DefectCheckbox";

export default function DefectCheckboxes(props) {
  const { defects } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: 3,
        alignItems: "flex-start",
      }}
    >
      {defects.map((defect) => (
        <Tooltip key={defect.id} title={defect.helper} placement="right">
          <Box>
            <DefectCheckbox label={defect.title} cookie={defect.cookie} />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

DefectCheckboxes.propTypes = {
  defects: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
