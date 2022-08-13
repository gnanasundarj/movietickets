import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllMovies = async () => {
  const postUrl = `${BASE_URL}/mba/api/v1/movies`;
  return await axios.get(postUrl);
};
export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
  return await axios.get(url);
};
export const getAllTheatres = async () => {
  const getUrl = `${BASE_URL}/mba/api/v1/theatres`;
  return await axios.get(getUrl);
};
export const getTheaterById = async theatreId => {
  const url = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
  return await axios.get(url, {
      headers: {
          "x-access-token": localStorage.getItem("accessToken"),
      },
  });
};
