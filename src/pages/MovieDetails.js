import ReactPlayer from "react-player";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/movieDetails.css";
import { useEffect } from "react";
import { getMovieDetails } from "../api/moviesList";
import { useNavigate, useParams } from "react-router";
import img1 from "../images/2.avif";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useState, useContext } from "react";
import UserContext from "../store/context";

function Moviedetails() {
  let [movieDetail, setmovieDetail] = useState({});
  let params = useParams();
  let { movieId } = params;
  let navigate = useNavigate();
  let { setDetail } = useContext(UserContext);
  let {
    trailer = "",
    image = "",
    name = "",
    category = "",
    date = "",
    director = "",
    cast = [],
    status = "",
    id = "",
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
        if (res.exists()) {
        
          setmovieDetail({ ...res.data(), id: movieId });
          setDetail({ ...res.data(), movieId });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        // const { data, status } = res;
        // if (status === 200) {
        //   // console.log(data);
        //   setmovieDetail(data);
        //   setDetail(data);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function TheaterDetails(e) {
    // console.log(e.target.innerText);
    if (e.target.innerText === "BOOKTICKET") {
      // console.log("id", id);
      navigate(`/buy-tickets/${name}/${id}`);
    }
  }

  let movieStatus = status === "Released" ? "BOOKTICKET" : "COMING SOON";

  return (
    <div>
      <Header />
      <div className="section ">
        <div className="d-flex justify-content-center align-items-center img mb-4">
          <ReactPlayer controls width="60%" height="400px" url={trailer} />
        </div>
        <div className="container d-flex justify-content-around align-items-center">
          <img
            src={image}
            alt="img"
            style={{ width: "300px", height: "350px" }}
            className="image"
          />

          <div className="text-center">
            <h2>{name}</h2>
            <h4>{category}</h4>
            <hr />
            <h5>directed by: {director}</h5>
            <h5>Release date: {date}</h5>
            <hr />
            <h4>Casts</h4>
            {cast.map((data, ind) => {
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
