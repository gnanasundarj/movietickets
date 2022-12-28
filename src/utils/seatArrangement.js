import Seat from "../components/seat/seat";
import { rows, col, defaultAccupiedSeats } from "../constants/Constants";

export const getSeatNumber = (rowIndex, colIndex) => {
  return rowIndex * rows + colIndex + 1;
};
export function SeatArrangement() {
  let finalSeats = [];
  for (let i = 0; i < rows; i++) {
    let rowseats = [];
    for (let j = 0; j < col; j++) {
      let seatNo = getSeatNumber(i, j);
      if (defaultAccupiedSeats.includes(seatNo)) {
        // console.log(seatNo);
        rowseats.push(<Seat seatStatus={"occupied"}/>);
      } else rowseats.push(<Seat />);
    }
    finalSeats.push(rowseats);
  }
  return finalSeats;
}
