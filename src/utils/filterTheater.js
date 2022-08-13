function getTheatresForCurrentMovie(data = [], id = "") {
  const filteredTheatres = data.filter((theatre) => {
    const { movies = [] } = theatre;
    return movies.includes(id);
  });

  return filteredTheatres;
}
export default getTheatresForCurrentMovie;
