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
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import "../styles/home.css";
import "../components/movies.css";

function Home() {
  let [movies, setMovies] = useState([]);
  let [allmovies, setallmovies] = useState([]);
  let [loader, setLoader] = useState(true);
  let searchBar = true;

  let navigate = useNavigate();
  // async function getMovies() {
  //   return await getDocs(collection(db, "movieDetails"));
  // }
  // {to get all movies}////////////////////////////////
  useEffect(() => {
    getAllMovies()
      .then((res) => {
        let result = [];
        res.forEach((res) => {
          let obj = {
            id: res.id,
            ...res.data(),
          };
          result.push(obj);
        });
        setMovies(result);
        setallmovies(result);
        setLoader(false);
      })
      .catch((res) => {
      });
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
      <h3 className="container mt-3  " style={{ marginLeft: "170px" }}>
        Recommended Movies
      </h3>

      {loader ? (
        <Moviefallback />
      ) : (
        <div className="section container ">
          <div className="row ">
            {movies.map((img, ind) => {
              return (
                <div
                  className="col-lg-4 col-sm-5  d-flex justify-content-center align-items-center  "
                  onClick={(e) => handleMovieselect(img.id)}
                  key={ind + 1}
                >
                  <div className="onHover">
                    <div className="imgContainer">
                      <img
                        src={img.image}
                        alt="poster"
                        className="images "
                        key={ind + 50}
                      />
                    </div>

                    <h5 className="text" key={ind + 100}>
                      {img.name}
                    </h5>
                    <h6 className="text text-muted" key={ind + 200}>
                      {img.category}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
export default Home;
