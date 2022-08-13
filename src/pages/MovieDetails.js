import ReactPlayer from "react-player";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/movieDetails.css";
import { useEffect } from "react";
import { getMovieDetails } from "../api/moviesList";
import { useNavigate, useParams } from "react-router";
import img1 from "../images/2.avif";
import { useState, useContext } from "react";
import UserContext from "../store/context";

function Moviedetails() {
  let [movieDetail, setmovieDetail] = useState({});
  let params = useParams();
  let { movieId } = params;
  let navigate = useNavigate();
  let { setDetail } = useContext(UserContext);
  let {
    trailerUrl = "",
    posterUrl = "",
    name = "",
    description = "",
    releaseDate = "",
    director = "",
    casts = [],
    releaseStatus = "",
    _id = "",
  } = movieDetail;
  useEffect(() => {
    //componentDidMount
    //
    fetchMovieDetail(movieId);
    // console.log(theaterDetail);
  }, []);

  const fetchMovieDetail = (movieId) => {
    getMovieDetails(movieId)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          // console.log(data);
          setmovieDetail(data);
          setDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function TheaterDetails(e) {
    // console.log(e.target.innerText);
    if (e.target.innerText === "BOOKTICKET") {
      navigate(`/buy-tickets/${name}/${_id}`);
    }
  }

  let movieStatus = releaseStatus === "RELEASED" ? "BOOKTICKET" : "COMING SOON";

  return (
    <div>
      <Header />
      <div className="section ">
        <div className="d-flex justify-content-center align-items-center img mb-4">
          <ReactPlayer controls width="60%" height="400px" url={trailerUrl} />
        </div>
        <div className="container d-flex justify-content-around align-items-center">
          <img
            src={posterUrl}
            alt="img"
            style={{ width: "300px", height: "350px" }}
          />
          <div className="text-center">
            <h2>{name}</h2>
            <h4>{description}</h4>
            <hr />
            <h5>directed by: {director}</h5>
            <h5>Release date: {releaseDate}</h5>
            <hr />
            <h4>Casts</h4>
            {casts.map((data, ind) => {
              return <h5 key={ind}>{data}</h5>;
            })}
            <hr />
            <button className="btn btn-danger" onClick={TheaterDetails}>
              {movieStatus}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Moviedetails;
