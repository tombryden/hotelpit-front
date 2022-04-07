import { Card, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function ModalCardContent(props) {
  const { children } = props;

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        padding: "20px",
        overflow: "auto",
      }}
    >
      {children}
    </Card>
  );
}

ModalCardContent.propTypes = {
  children: PropTypes.element,
};

ModalCardContent.defaultProps = {
  children: <Typography>Hello World</Typography>,
};
