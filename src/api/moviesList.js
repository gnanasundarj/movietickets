import axios from "axios";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllMovies = async () => {
  return await getDocs(collection(db, "movieDetails"));
};
export const getMovieDetails = async (movieId) => {
  const docRef = doc(db, "movieDetails", movieId);
  return await getDoc(docRef);
};
export const getAllTheatres = async (id) => {
  const citiesRef = collection(db, "theaterDetails");
  const q = query(citiesRef, where("movieID", "array-contains-any", [id]));
  return await getDocs(q);
};
export const getTheaterById = async (theatreId) => {
  const url = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
  return await axios.get(url, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};
