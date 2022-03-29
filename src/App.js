import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Rates from "./pages/Rates";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/api";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
