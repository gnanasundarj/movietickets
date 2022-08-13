import loader from "../images/load.gif";
import "./movies.css";
function Moviefallback() {
  return (
    <div className="container d-flex justify-content-center align-items-center section">
      <img src={loader} alt="loader" />
    </div>
  );
}
export default Moviefallback;
