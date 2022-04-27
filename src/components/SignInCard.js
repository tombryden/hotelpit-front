import { Card, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

// FUNCTIONS
function signIn(
  username,
  password,
  setBtnLoading,
  refreshAuthentication,
  getReservationIfExists,
  setLoginError
) {
  setBtnLoading(true);

  axios
    .post("/user/login", { username, password })
    .then(
      (response) => {
        // success user authenticated
        if (response.data.message === "Credentials incorrect") {
          // invalid login
          setLoginError(true);
        } else {
          // login successful refresh authentication and get if any reservations exist
          refreshAuthentication();
          getReservationIfExists();
        }
      },
      () => {
        // error
        setLoginError(true);
      }
    )
    .finally(() => {
      setBtnLoading(false);
    });
}

export default function SignInCard(props) {
  const { visible, refreshAuthentication, getReservationIfExists } = props;

  // state for text input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state for button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // state for input error on username
  const [loginError, setLoginError] = useState(false);

  return (
    <Box>
      {visible && (
        <Card
          sx={{
            width: "300px",
            position: "absolute",
            right: "20px",
            top: "60px",
            padding: "10px",
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => {
                setLoginError(false);
                setUsername(e.target.value);
              }}
              error={loginError}
              helperText={loginError && "Invalid username or password"}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setLoginError(false);
                setPassword(e.target.value);
              }}
            />
            <LoadingButton
              variant="contained"
              onClick={() => {
                signIn(
                  username,
                  password,
                  setBtnLoading,
                  refreshAuthentication,
                  getReservationIfExists,
                  setLoginError
                );
              }}
              loading={btnLoading}
              //   loadingPosition="start"
              startIcon={<LoginIcon />}
            >
              Sign in
            </LoadingButton>
          </Stack>
        </Card>
      )}
    </Box>
  );
}

// prop types
SignInCard.propTypes = {
  visible: PropTypes.bool,
  refreshAuthentication: PropTypes.func.isRequired,
  getReservationIfExists: PropTypes.func.isRequired,
};

SignInCard.defaultProps = {
  visible: false,
};
