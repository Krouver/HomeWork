import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import http from "../../../../http_common";
import { ICategoryItem } from "../../../home/types";

const CategoriesListPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [list, setList] = useState<ICategoryItem[]>([]);

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
  return (
    <>
      <h1 className="text-center">Категорії</h1>
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

export default CategoriesListPage;
