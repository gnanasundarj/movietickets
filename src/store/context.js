import { createContext, useState } from "react";

let UserContext = createContext();

export function ContextProvider(props) {
  let [theaterDetail, setTheaterdetail] = useState({});
  let [movieDetail, setMoviedetail] = useState({});

  let [userName, setUserName] = useState("user");
  function setDetail(detail, type="movie") {
    if (type === "theater") {
      setTheaterdetail(detail);
      // console.log("theater", detail);
    } else {
      setMoviedetail(detail);

      // console.log("movie", detail);
    }
  }

  return (
    <UserContext.Provider
      value={{ setDetail, theaterDetail, movieDetail, userName, setUserName }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
