import Auth from "./pages/auth";
import Home from "../src/pages/home";
import TheaterDetail from "./pages/theaterDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectTickets from "./pages/selectTickets";
import Moviedetails from "./pages/MovieDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/login"} element={<Auth />} />
        <Route exact path={"/"} element={<Home />}></Route>
        <Route
          exact
          path={"/movie_details/:movieId"}
          element={<Moviedetails />}
        />
        <Route
          exact
          path={"/buy-tickets/:name/:_id"}
          element={<TheaterDetail />}
        ></Route>
        <Route
          exact
          path={"/select-seats/:id"}
          // path={"/"}

          element={<SelectTickets />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
