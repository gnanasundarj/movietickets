import { useState } from "react";
import Signup from "./signup";
import Login from "./login";
import Storage from "../utils/storage";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";

function Auth() {
  let [toggleLogin, settoggleLogin] = useState(true);
  let [errormsgLogin, setErrormsgLogin] = useState("");
  let [errormsgSignin, setErrormsgSignin] = useState("");
  let navigate = useNavigate();

  function toggle() {
    settoggleLogin(!toggleLogin);
    setErrormsgLogin("");
    setErrormsgSignin("");
  }

  //////fetch data from dp//////////
  async function fetchData(id) {
    const docRef = doc(db, "userData", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      Storage(docSnap.data());
      navigate(-1);
    } else {
      console.log("No such document!");
    }
  }
  /////////////login////////////////
  function handleLoginSubmit(data) {
    let { userId, password } = data;

    let userData = { userId, password };

    //////////
    signInWithEmailAndPassword(auth, userData.userId, userData.password)
      .then((res) => {
        fetchData(res.user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
        let msg = errorMessage.slice(22, errorMessage.indexOf(")"));

        setErrormsgLogin(msg ? msg : "network error");
      });
  }

  //////////////////////stroting in firebase.////////////
  async function storeinFirebase(id, data) {
    const docRef = await setDoc(doc(db, "userData", id), {
      username: data.username,
      usertype: data.usertype,
      userID: data.userId,
      mail: data.mail,
    });
    setErrormsgSignin("Signup success. Please login");
  }
  ////////////////////////////storing in db///////////////
  async function storeinDB(data) {
    createUserWithEmailAndPassword(auth, data.mail, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        storeinFirebase(user.uid, data);
      })
      .catch((error) => {
        const errorMessage = error.message;
        let msg = errorMessage.slice(
          errorMessage.indexOf("/") + 1,
          errorMessage.length - 2
        );

        setErrormsgSignin(msg ? msg : "network error");
      });
  }
  ////////////////handlesignupcrt/////////////////////
  function handleSignupSubmit(userData, type) {
    let { userId, password, userName, email } = userData;
    let user = {
      userId,
      password,
      username: userName,
      mail: email,
      usertype: type,
    };

    storeinDB(user);
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
