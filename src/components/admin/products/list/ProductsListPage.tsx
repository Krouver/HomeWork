import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import http from "../../../../http_common";
import { IProductSearch, IProductSearchResult } from "../types";
import * as Scroll from 'react-scroll';

const ProductsListPage = () => {

  const Element  = Scroll.Element;
  const scroller = Scroll.scroller;
  
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<IProductSearch>({
    page: searchParams.get("page") || 1
  });

  const [searchResult, setSearchResult] = useState<IProductSearchResult>({
    total: 0,
    categoryName: "",
    pages: 0,
    currentPage: 0,
    products: [],
  });

  useEffect(() => {
    console.log("Working useEffect");
    //setLoading(true);
    http.get<IProductSearchResult>(`api/products/search`, {
      params: search
    }).then((resp) => {
      const { data } = resp;
      console.log("Server responce", data);
      setSearchResult(data);
      scroller.scrollTo('myScrollToElement', {
        duration: 200,
        delay: 10,
        smooth: true,
        offset: -50, // Scrolls to element + 50 pixels down the page
      });
      //setList(data);
      //setLoading(false);
    });
  }, [search]);

  const { products, pages, currentPage } = searchResult;

  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map((x) => {
    return (
      <li className={classNames("page-item", {"active": x===currentPage})} key={x}>
        <Link className="page-link" to={`?page=${x}`} onClick={()=>setSearch({...search, page: x})}>
          {x}
        </Link>
      </li>
    );
  });

  const viewList = products.map((item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>
          {item.images.map((img) => {
            return (
              <span key={img}>
                <img
                  src={`${APP_ENV.BASE_URL}images/150_${img}`}
                  alt="Якась фотка"
                  width="75"
                />
              </span>
            );
          })}
        </td>
        <td>{item.categoryName}</td>
        <td>{item.description}</td>
      </tr>
    );
  });

  return (
    <>
      <Element name="myScrollToElement"></Element>
      <h1 className="text-center">Продукти</h1>
      <Link to="/admin/products/create" className="btn btn-success">
        Додати
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Назва</th>
            <th scope="col">Фото</th>
            <th scope="col">Категорія</th>
            <th scope="col">Опис</th>
          </tr>
        </thead>
        <tbody>{viewList}</tbody>
      </table>

      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
          </li>

          {pagination}

          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default ProductsListPage;
