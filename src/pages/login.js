import { useEffect } from "react";
import { useState } from "react";
function Login(props) {
  let { handleSubmit, toggle, errormsgLogin } = props;
  let [loginData, setloginData] = useState({});
  function onchangelogin(e) {
    loginData[e.target.id] = e.target.value;
    // console.log(loginData);
  }
 

  function handleLogin(e) {
    e.preventDefault();
    handleSubmit(loginData);
  }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
      <div className="auth p-4 ">
        <form onSubmit={handleLogin} className="">
          <h4 style={{ color: "white" }} className="mb-2  mt-5 text-center">
            login
          </h4>
          <input
            type="text"
            id="userId"
            placeholder="user ID"
            className="mb-2 input form-control"
            onChange={onchangelogin}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="mb-2 form-control"
            onChange={onchangelogin}
          />
          <div>
            <button type="submit" className="btn btn-danger container ">
              login
            </button>
          </div>

          <div
            onClick={toggle}
            className="onhover text-center"
            style={{ color: "white" }}
          >
            doesn't have an account? sign up
          </div>
          {errormsgLogin !== "" ? <div className=" text-danger text-center">{errormsgLogin}</div> : ""}
        </form>
      </div>
    </div>
  );
}
export default Login;
