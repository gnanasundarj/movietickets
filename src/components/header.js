import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../store/context";
import "../styles/auth.css";
function Header(props) {
  let [input, setinput] = useState("");
  let [loginStatus, setloginStatus] = useState(false);
  let { searchMovies, searchBar } = props;
  let { userName, setUserName } = useContext(UserContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
    setloginStatus(false);
    setUserName("user");
  }
  function search() {
    searchMovies(input);
  }
  useEffect(() => {
    loginstate();
  }, []);
  function loginstate() {
    if (localStorage.getItem("userId")) {
      setloginStatus(true);
      setUserName(localStorage.getItem("name"));
    } else {
      setloginStatus(false);
    }
  }

  return (
    <div
      style={{ height: "70px" }}
      className=" d-flex justify-content-between align-items-center   bg-black "
    >
      <h2
        style={{ color: "white" }}
        className="onhover "
        onClick={() => {
          navigate("/");
        }}
      >
        BOOK TICKETS
      </h2>
      {searchBar && (
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="form-control inputSearch"
            placeholder="enter movie to search"
            onChange={(e) => {
              setinput(e.target.value);
              if (e.target.value === "") {
                // console.log("is empty");
                searchMovies("");
              }
              // console.log(e.target.value);
            }}
          />
          <div
            style={{ height: "50px", width: "100px" }}
            className="d-flex justify-content-center align-items-center p-1 "
          >
            <button
              style={{ backgroundColor: "red", color: "white" }}
              className=" text-center  h-100 w-100 inputSearch "
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
      <div className="text-info d-flex justify-content-center align-items-center p-2">
        <h5 className=" p-2">{userName}</h5>
        {loginStatus === true ? (
          <div
            style={{ height: "50px", width: "100px" }}
            className="d-flex justify-content-center align-items-center p-1 "
          >
            <button
              style={{ backgroundColor: "red", color: "white" }}
              className=" text-center  h-100 w-100 inputSearch
      "
              onClick={logout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div
            style={{ height: "50px", width: "100px" }}
            className="d-flex justify-content-center align-items-center p-1 "
          >
            <button
              style={{ backgroundColor: "red", color: "white" }}
              className=" text-center  h-100 w-100 inputSearch"
              onClick={() => {
                navigate("/login");
              }}
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
