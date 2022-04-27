import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function useAuthentication() {
  // state for authorisation status
  const [authorised, setAuthorised] = useState(false);

  const cookies = new Cookies();

  // logout function - await result for reservation refresh
  async function logout() {
    try {
      await axios.post("/user/logout");
      setAuthorised(false);
      cookies.remove("defects");
    } catch (error) {
      console.log(error);
      setAuthorised(false);
    }
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
        // clear defect cookies
        cookies.remove("defects");
      }
    );
  }

  // on load get if user is authorised and set state
  useEffect(() => {
    refreshAuthentication();
  }, []);

  return [authorised, logout, refreshAuthentication];
}
