import { Carousel } from "react-bootstrap";
import "../carousal/carousal.css";

function Carousels(props) {
  let { images } = props;
  return (
    <div className=" mt-1 d-flex justify-content-center align-items-center">
      <div style={{ width: "98vw" }}>
        <Carousel className="shadow-lg">
          {images.map((img, id) => {
            return (
              <Carousel.Item>
                <img
                  key={id + 1}
                  className=" w-100"
                  src={img}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
export default Carousels;
