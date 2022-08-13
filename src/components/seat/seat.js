import { useEffect, useState } from "react";
import "../seat/seat.css";
function Seat(props) {
  let { seatStatus } = props;

  //   useEffect(() => {
  //     console.log(selected);
  //   }, []);
  return <div  id="seat" className={`seat ${seatStatus}`}></div>;
}

export default Seat;
