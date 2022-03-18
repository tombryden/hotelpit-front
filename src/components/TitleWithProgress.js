import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export default function TitleWithProgress(props) {
  const { title, progress, mt, mb } = props;

  return (
    <Box mt={mt} mb={mb}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

// prop types
TitleWithProgress.propTypes = {
  title: PropTypes.string,
  progress: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
};

TitleWithProgress.defaultProps = {
  title: "Title",
  progress: 33,
  mt: 0,
  mb: 0,
};
