import { useEffect } from "react";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function Signup(props) {
  let [userType, setuserType] = useState("SELECT");
  let [signupdata, setsignupdata] = useState({});
  let { handleSubmit, toggle, errormsgSignin } = props;
  function onchangesignup(e) {
    signupdata[e.target.id] = e.target.value;

    // console.log(signupdata);
  }
  
  function handleLogin(e) {
    e.preventDefault();
    handleSubmit(signupdata, userType);

  }
  function handleSelect(key) {
    setuserType(key);
  }
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
      <div className="auth p-4 ">
        <form onSubmit={handleLogin} className="">
          <h3 style={{ color: "white" }} className="mb-2  mt-5 text-center">
            Signup
          </h3>
          <input
            type="text"
            id="userId"
            placeholder="user ID"
            className="mb-2 input form-control"
            onChange={onchangesignup}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="mb-2 form-control"
            onChange={onchangesignup}
          />
          <input
            type="text"
            id="userName"
            placeholder="username"
            className="mb-2 input form-control"
            onChange={onchangesignup}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="mb-2 input form-control"
            onChange={onchangesignup}
          />
          <div className="d-flex justify-content-between align-items-center">
            <h6 style={{ color: "white" }}>USERTYPE</h6>
            <DropdownButton
              align="end"
              title={userType}
              variant="light"
              className="mx-1"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
              {/* <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item> */}
            </DropdownButton>
          </div>

          <button type="submit" className="btn btn-danger container ">
            Signup
          </button>

          <div
            onClick={toggle}
            className="onhover text-center"
            style={{ color: "white" }}
          >
            already have account? login
          </div>
          <div className="text-center">
            {errormsgSignin !== "" ? (
              <div className="text-danger">{errormsgSignin}</div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
