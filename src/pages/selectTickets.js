import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Seat from "../components/seat/seat";
import { getTheaterById } from "../api/moviesList";
import { useState, useContext } from "react";
import UserContext from "../store/context";
import SelectSeat from "../components/selectSeat/selectSeat";
import "../styles/tickets.css";

function SelectTickets() {
  let { theaterDetail, movieDetail } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div className="section-ticket ">
        <div className="container  ">
          <h2 className="text-white text-center pt-5">{`${movieDetail.name}-${theaterDetail.name}`}</h2>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{ width: "500px", height: "70px" }}
              className="cord bg-dark row text-white"
            >
              <div className="col d-flex justify-content-center align-items-center ">
                <Seat />
                <div className="p-2"> Available</div>
              </div>
              <div className="col d-flex justify-content-center align-items-center ">
                <Seat seatStatus={"selected"} />
                <div className="p-2"> Selected</div>
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <Seat seatStatus={"occupied"} />
                <div className="p-2"> Occupied</div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="screen"></div>
          </div>
        </div>
        <div className="container">
          <SelectSeat />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectTickets;
