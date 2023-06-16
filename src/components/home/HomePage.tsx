import { useEffect, useState } from "react";
import Slider from "./Slider";
import { IProductHomePage } from "./types";
import http from "../../http_common";
import EclipseWidget from "../common/eclipse";
import { APP_ENV } from "../../env";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [home, setHome] = useState<IProductHomePage>();

  useEffect(() => {
    setLoading(true);
    http.get<IProductHomePage>(`api/products/search`).then((resp) => {
      const { data } = resp;
      //console.log("----Products---", data);
      setHome(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <EclipseWidget />}
      <Slider />
      <h1 className="text-center">Товари</h1>
      <div className="row ">
        {home?.products.map((p) => (
          <div className="card col-md-3 h-100">
            <img
              style={{ width: "100%", height: "250px", objectFit: "contain" }}
              src={`${APP_ENV.BASE_URL}images/300_${p.images[0]}`}
              className="card-img-top p-2"
              alt="Козачка"
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.categoryName}</p>
              <a href="#" className="btn btn-primary">
                Купить
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
