import classNames from "classnames";
import { useState } from "react";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";

interface ICarusel {
  img: any;
}

const Slider = () => {
  const [items, setItems] = useState<ICarusel[]>([
    { img: image1 },
    { img: image2 },
    { img: image3 },
  ]);

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div
              key={index}
              className={classNames("carousel-item", { active: index === 1 })}
            >
              <img
                src={item.img}
                className="d-block"
                alt="#"
                style={{ width: "100%", height: "700px" }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Slider;
