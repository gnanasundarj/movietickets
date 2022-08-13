import { useState } from "react";
import Signup from "./signup";
import Login from "./login";
import { Userlogin, UserSignup } from "../api/authentication";
import Storage from "../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";
import { useNavigate } from "react-router";

function Auth() {
  let [toggleLogin, settoggleLogin] = useState(true);
  let [errormsgLogin, setErrormsgLogin] = useState("");
  let [errormsgSignin, setErrormsgSignin] = useState("");
  let navigate = useNavigate();
  // useEffect(() => {
  //   console.log("auth rendered");
  //   // setTimeout(() => {
  //   //   setErrormsgLogin("");
  //   }, 5000);
  // }, [errormsgLogin]);
  function toggle() {
    settoggleLogin(!toggleLogin);
    setErrormsgLogin("");
    setErrormsgSignin("");
  }

  function handleLoginSubmit(data) {
    let { userId, password } = data;

    let userData = { userId, password };
    // console.log(userData);
    Userlogin(userData)
      .then((response) => {
        // console.log(response);
        Storage(response.data);
        navigate(-1);
      })
      .catch((res) => {
        // console.log(res.response.data.message);
        let { message = "Network Error" } = res.response.data;
        setErrormsgLogin(message);
      });
  }
  function handleSignupSubmit(data, user) {
    let { userId, password, userName, email } = data;
    let userData = {
      userId,
      password,
      name: userName,
      email,
      userType: user,
    };
    // console.log(userData);
    UserSignup(userData)
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          // settoggleLogin(true);
          // console.log("sigind in");
          setErrormsgSignin("Signup success. Please login");
        }
      })
      .catch((res) => {
        let { message = "Network Error" } = res.response.data;
        // console.log(message);
        setErrormsgSignin(message);
      });
  }

  return (
    <div className="img">
      {toggleLogin ? (
        <Login
          handleSubmit={handleLoginSubmit}
          toggle={toggle}
          errormsgLogin={errormsgLogin}
        />
      ) : (
        <Signup
          handleSubmit={handleSignupSubmit}
          toggle={toggle}
          errormsgSignin={errormsgSignin}
        />
      )}
    </div>
  );
}
export default Auth;
