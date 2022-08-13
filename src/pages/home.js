import React from "react";
import img1 from "../images/1.avif";
import img2 from "../images/2.avif";
import img3 from "../images/3.avif";
import img4 from "../images/4.avif";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../api/moviesList";
import Moviefallback from "../components/fallback";
import Carousels from "../components/carousal/carousal";
import { useNavigate } from "react-router";
import "../styles/home.css";
import "../components/movies.css";

function Home() {
  let [movies, setMovies] = useState([]);
  let [allmovies, setallmovies] = useState([]);
  let [loader, setLoader] = useState(true);
  let searchBar = true;

  let navigate = useNavigate();
  // {to get all movies}////////////////////////////////
  useEffect(() => {
    getAllMovies()
      .then((res) => {
        if (res.status === 200) {
          setMovies(res.data);
          setallmovies(res.data);
          setLoader(false);
        }
        // console.log(res);
      })
      .catch((res) => console.log(res));
  }, []);

  // ////////////////////to know user login status////////////

  function searchMovies(str) {
    // console.log("str is", str);
    let filteredmovie = allmovies.filter((movie) => {
      return movie.name.toLowerCase().includes(str.toLowerCase());
    });
    setMovies(filteredmovie);
  }

  function handleMovieselect(id) {
    navigate(`/movie_details/${id}`);
  }

  return (
    <div className="bg">
      <Header searchMovies={searchMovies} searchBar={searchBar} />
      <Carousels images={[img1, img2, img3, img4]} />
      <h3 className="container mt-3 ">Recommended Movies</h3>

      {loader ? (
        <Moviefallback />
      ) : (
        <div className="section container ">
          <div className="row">
            <div className="section container-fluid ">
              <div className="row ">
                {movies.map((img, ind) => {
                  return (
                    <div
                      className="col-lg-4 col-sm-5 text-center onHover "
                      onClick={(e) => handleMovieselect(img._id)}
                      key={ind + 1}
                    >
                      <img
                        src={img.posterUrl}
                        alt="poster"
                        className="size "
                        key={ind + 50}
                      />
                      <h5 className="text" key={ind + 100}>
                        {img.name}
                      </h5>
                      <h6 className="text text-muted" key={ind + 200}>
                        {img.description}
                      </h6>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
export default Home;
