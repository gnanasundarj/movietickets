const render = () => {
  return (
    <>
      <Navbar
        movies={movieList.map((movie) => movie.name)}
        onMovieSelect={selectedMovie}
      />
      {!pageLoading ? (
        <>
          <Slider />
          <div className="container my-4">
            <p className="fw-bolder">Recomended Movies</p>{" "}
            <div className="row">
              
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div>Fetching Movies from backend...</div>
      )}
    </>
  );
};





{movieList.map((movie) => (
    <div className="col-lg-3 col-xs-6 my-2" key={movie._id}>
      <Link key={movie._id} to={`/movie/${movie._id}/details`}>
        <div
          className="d-flex align-items-stretch"
          style={{ height: 25 + "rem" }}
        >
          <div
            className="card bg-dark shadow-lg"
            style={{ width: 14 + "rem" }}
          >
            <img
              src={movie.posterUrl}
              className="card-img-top"
              alt="..."
              style={{ height: "100%" }}
            />
            <i className="bi bi-hand-thumbs-up-fill text-success px-2 ">
              58k{" "}
            </i>
            <p className="text-white fw-bolder px-2">
              {movie.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ))}