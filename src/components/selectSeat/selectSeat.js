import { SeatArrangement } from "../../utils/seatArrangement";
import React, { useEffect, useState } from "react";
import { getSeatNumber } from "../../utils/seatArrangement";
import PaymentModel from "../paymentModel";
import { defaultAccupiedSeats } from "../../constants/Constants";
import "../seat/seat.css";
import "../selectSeat/selectSeat.css";
import { useNavigate } from "react-router";
function SelectSeat(props) {
  let [seats, setSeat] = useState(SeatArrangement());
  let [seatCount, setSeatCount] = useState(0);
  let [amount, setAmount] = useState(0);
  let [selectedseat, setSelectedseat] = useState([]);
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let [loginStatus, setLoginstatus] = useState(true);

  // useEffect(() => {
  //   if (localStorage.getItem("name")) {
  //     setLoginstatus(true);
  //   }
  // }, []);

  function handleSeatSelection(e, row, col) {
    if (!localStorage.getItem("name")) {
      // console.log("name")
      setLoginstatus(false);
    } else {
      let seatNo = getSeatNumber(row, col);

      if (!defaultAccupiedSeats.includes(seatNo) && e.target.id === "seat") {
        e.target.classList.toggle("selected");
        if (e.target.classList.contains("selected")) {
          setSeatCount(seatCount + 1);
          setAmount(amount + 100);
          selectedseat.push(seatNo);
          setSelectedseat([...selectedseat]);
        } else {
          setSeatCount(seatCount - 1);
          setAmount(amount - 100);
          let indexofseat = selectedseat.indexOf(seatNo);
          selectedseat.splice(indexofseat, 1);
          setSelectedseat([...selectedseat]);
        }
      }
    }
  }

  function handleClose(paymentStatus) {
    if (paymentStatus) {
      // console.log(paymentStatus);

      navigate("/");
    }
    setShow(!show);
  }

  return (
    <div className="container  mt-4">
      {seats.map((row, rowid) => {
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            key={rowid}
          >
            <div style={{ width: "500px" }} className="row mb-1">
              {row.map((col, colid) => {
                let seatStyle =
                  colid === 2 || colid === 6
                    ? "col-sm-1 offset-sm-2"
                    : "col-sm-1";

                return (
                  <div
                    key={colid}
                    className={seatStyle}
                    onClick={(e) => {
                      handleSeatSelection(e, rowid, colid);
                    }}
                  >
                    {col}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ticket detail and amt  and login details*/}
      {loginStatus ? (
        <div
          className={`d-flex justify-content-center align-items-center mt-3  ${
            seatCount > 0 ? "" : "invisible"
          }`}
        >
          <div
            style={{ width: "500px", height: "50px" }}
            className="card bg-dark text-white  d-flex justify-content-center align-items-center "
          >
            <span>
              you have selected <span className="text-info">{seatCount}</span>{" "}
              seats.Total amount is{" "}
              <span className="text-info">{`Rs ${amount}`}</span>
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`d-flex justify-content-center align-items-center mt-3 `}
        >
          <div
            style={{ width: "500px", height: "50px" }}
            className="card bg-dark text-info  d-flex justify-content-center align-items-center "
          >
            <span>Please login to continue booking...</span>
          </div>
        </div>
      )}

      {/* payment button */}
      <div
        style={{ marginTop: "30px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <button
          className={`btn btn-danger ${seatCount > 0 ? "" : "disabled"}`}
          onClick={() => {
            // console.log("botton");
            handleClose();
          }}
        >
          proceed payment
        </button>
      </div>
      {
        <PaymentModel
          show={show}
          handleClose={handleClose}
          selectedseat={selectedseat}
          amount={amount}
        />
      }
    </div>
  );
}
export default SelectSeat;
