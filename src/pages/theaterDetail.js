import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/theaterdetails.css";
import { getMovieDetails, getAllTheatres } from "../api/moviesList";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import getTheatresForCurrentMovie from "../utils/filterTheater";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/context";
import { GiTheater } from "react-icons/gi";
import { FaCity } from "react-icons/fa";

function TheaterDetail() {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [currentMovieTheatres, setCurrentMovieTheatres] = useState([]);
  const { _id } = params;
  let navigate = useNavigate();
  let { setDetail } = useContext(UserContext);

  useEffect(() => {
    //componentDidMount
    fetchMovieDetail(_id);
    fetchAllTheatres();
  }, []);

  let {
    name: moviename = "",
    category = "",
    date = "",
    director = "",
    status = "",
    language = "",
  } = movieDetail;

  const fetchMovieDetail = (movieId) => {
    getMovieDetails(movieId)
      .then((res) => {
        if (res.exists()) {
          setMovieDetail({ ...res.data(), id: movieId });
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAllTheatres = () => {
    getAllTheatres(_id)
      .then((res) => {
        let result = [];

        res.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setCurrentMovieTheatres(result);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  function selectTickets(theaterId, theaterData) {
    // console.log(theaterId, _id);
    navigate(`/select-seats/${theaterId}`);
    setDetail(theaterData, "theater");
  }

  return (
    <div>
      <Header />
      <div className="section">
        <div className="section-Movie text-center ">
          <h2 className="pt-5  mb-4 ">{moviename}</h2>
          <div className="d-flex justify-content-center align-items-center text-center">
            <div
              style={{ height: "40px" }}
              className="movie-detail text-center d-flex justify-content-center align-items-center  p-2"
            >
              {category}
            </div>
            <div
              style={{ height: "40px" }}
              className="movie-detail margin  bg-primary text-center d-flex justify-content-center align-items-center p-2"
            >
              {language}
            </div>
            <div
              style={{ height: "40px" }}
              className="movie-detail bg-success text-center d-flex justify-content-center align-items-center p-2"
            >
              {status}
            </div>
          </div>
          <hr />
          <div className="mt-4">Director: {director}</div>
          <div>Release date: {date}</div>
        </div>
        <h2 className="text-center ">Select theater</h2>
        <br />
        <div className="container ">
          {currentMovieTheatres.map((item, ind) => {
            return (
              <div
                key={ind}
                className="theater row"
                style={{ height: "70px" }}
                onClick={(e) => {
                  selectTickets(item.id, item);
                  // console.log(item._id);
                }}
              >
                <h4 className=" col-4  text-col1 mt-3  ">
                  <div className="row ">
                    <div className="col-2">
                      <GiTheater className="theaterFont" />
                    </div>
                    <div className="col">{item.name}</div>
                  </div>
                </h4>

                <h4 className="col-4 d-flex justify-content-center align-items-center text-center  text-col2">
                  Book-Ticket
                </h4>
                <h4 className="col-4 mt-3  text-col3">
                  <div style={{ marginLeft: "100px" }} className="row ">
                    <div className="col-2">
                      <FaCity className="movieFont" />
                    </div>
                    <div className="col">{item.city}</div>
                  </div>
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TheaterDetail;
