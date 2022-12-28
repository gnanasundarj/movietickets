import { useEffect } from "react";
import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import UserContext from "../store/context";
import "../styles/tickets.css";
function PaymentModel(props) {
  let { theaterDetail, movieDetail } = useContext(UserContext);
  let { show, handleClose, selectedseat, amount } = props;
  let [paymentSuccess, setPaymentsuccess] = useState(false);
  function paymentStatus() {
    setPaymentsuccess(!paymentSuccess);
    // console.log(paymentSuccess);
  }

  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <div className="container">
          <h3 className=" d-flex justify-content-center align-items-center pt-3">
            {paymentSuccess === false
              ? "Ticket Details"
              : "your booking has been confrmed"}
          </h3>
        </div>
        {paymentSuccess && (
          <div>
            <hr />
            <div className="d-flex justify-content-center align-items-center">
              <img
                style={{ width: "200px", height: "200px" }}
                src={movieDetail.image}
                alt="img"
              />
            </div>
          </div>
        )}
        <hr />
        <div>
          <div className="m-3 row">
            <span className="col-4 text">Movie Name :</span>
            <div className="col">{movieDetail.name}</div>
          </div>
          <div className="m-3 row">
            <span className="col-4 text">Theater Name :</span>
            <div className="col">{theaterDetail.name}</div>
          </div>
          <div className="m-3 row">
            <div className="col-4 text">Seats selected :</div>
            <div className="col">{selectedseat.length}</div>
          </div>
          <div className="m-3 row">
            <div className="col-4 text">Total Amount :</div>
            <div className="col">{amount}</div>
          </div>
          <div className=" m-3 row">
            <div className="col-4 text">Seat No: </div>
            <div className="col">
              <div className="d-flex">
                {selectedseat.map((id, index) => {
                  let symbol = ",";
                  if (index === selectedseat.length - 1) {
                    symbol = ".";
                  }
                  return (
                    <div
                      key={index}
                      style={{ marginLeft: "3px" }}
                    >{`${id}${symbol}`}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer>
          <div className="">
            <button
              className="btn btn-danger"
              onClick={() => {
                handleClose(paymentSuccess);
              }}
            >
              {paymentSuccess === false ? "close" : "Explore more movies >>>"}
            </button>
            {!paymentSuccess && (
              <button
                style={{ marginLeft: "5px" }}
                className="btn btn-primary"
                onClick={paymentStatus}
              >
                Confirm booking
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default PaymentModel;
