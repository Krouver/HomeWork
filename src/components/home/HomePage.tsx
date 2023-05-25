import { useEffect, useState } from "react";
import Slider from "./Slider";
import { ICategoryItem } from "./types";
import { APP_ENV } from "../../env";
import http from "../../http_common";
import { Link } from "react-router-dom";
import EclipseWidget from "../common/eclipse";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [list, setList] = useState<ICategoryItem[]>([]);

  // map - перебирає список елементів, як foreach, але при цьому він повертає розмітку (можна використовувати return)
  // key - є обов'язковим, тому, що коли буде порівнюватися Virtual DOM і фактичний дом на сторінці 
  //- будуть виникати помилки по відображеню елементів, бо не буде зрозуміло, як кожен із елементів відрізняється між собою
  const viewList = list.map((item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
          <img src={`${APP_ENV.BASE_URL}images/150_${item.image}`} alt="Якась фотка" width="75" />
        </td>
        <td>{item.title}</td>
      </tr>
    );
  });


  useEffect(() => {
    console.log("Working useEffect");
    setLoading(true);
    http.get<ICategoryItem[]>(`api/categories/list`)
      .then(resp => {
        console.log("Server responce", resp.data); 
        const {data} = resp;
        setList(data);
        setLoading(false);
      });
  },[]);
  
  console.log("Render component", APP_ENV);


  
  
  return (
    <>
      {loading && <EclipseWidget/>}
      <Slider />
      <h1 className="text-center">Головна сторінка</h1>
      <Link to="/admin/categories/create" className="btn btn-success">Додати</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
          </tr>
        </thead>
        <tbody>
          {viewList}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
