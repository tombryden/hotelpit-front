import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuthentication() {
  // state for authorisation status
  const [authorised, setAuthorised] = useState(false);

  // logout function
  function logout() {
    axios.post("/user/logout").then(
      () => {
        // success
        setAuthorised(false);
        console.log("set authorised state to false");
      },
      () => {
        // error - make them unauthorised anyway
        setAuthorised(false);
      }
    );
  }

  // check authentication
  function refreshAuthentication() {
    axios.get("/user/auth").then(
      () => {
        // user is authorised as 200 status
        setAuthorised(true);
      },
      () => {
        // user not authorised.. 401 unauth or error
        setAuthorised(false);
      }
    );
  }

  // on load get if user is authorised and set state
  useEffect(() => {
    refreshAuthentication();
  }, []);

  return [authorised, logout, refreshAuthentication];
}
