import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import http from "../../../../http_common";
import {
  ICategorySelect,
  IProductSearch,
  IProductSearchResult,
} from "../types";
import * as Scroll from "react-scroll";
import ModalDelete from "../../../common/ModalDelete";
import parse from "html-react-parser";
import { useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";

const ProductsListPage = () => {
  const Element = Scroll.Element;
  const scroller = Scroll.scroller;

  const [searchParams, setSearchParams] = useSearchParams();

  //Список категорій у селекті
  const [categories, setCategories] = useState<ICategorySelect[]>([]);

  useEffect(() => {
    //Посилаємо запит на сервер по список категорій для тега select
    http.get<ICategorySelect[]>("api/categories/list").then((resp) => {
      setCategories(resp.data);
      console.log("categories", resp.data);
    });
  }, []);

  const [search, setSearch] = useState<IProductSearch>({
    name: searchParams.get("name") || "",
    categorySlug: searchParams.get("categorySlug") || "",
    page: searchParams.get("page") || 1,
  });

  //Проводимо пошук товарів
  const onSubmitSearch = (values: IProductSearch) => {
    //console.log("Проводимо пошук", values);
    setSearch(values);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit: onSubmitSearch,
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
    http
      .get<IProductSearchResult>(`api/products/search`, {
        params: search,
      })
      .then((resp) => {
        const { data } = resp;
        console.log("Server responce", data);
        setSearchResult(data);
        scroller.scrollTo("myScrollToElement", {
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
      <li
        className={classNames("page-item", { active: x === currentPage })}
        key={x}
      >
        <Link
          className="page-link"
          to={`?page=${x}`}
          onClick={() => setSearch({ ...search, page: x })}
        >
          {x}
        </Link>
      </li>
    );
  });
  const onDeleteProduct = async (id: number) => {
    try {
      await http.delete("api/products/delete/" + id);
      setSearch({ ...search, page: 1 });
    } catch (error) {
      console.log("Error Delete", error);
    }
    //console.log("Delete product: ", id);
  };

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
        <td>{parse(item.description)}</td>
        <td>
          <ModalDelete
            id={item.id}
            text={`Ви дійсно бажаєте видалиати '${item.name}'?`}
            deleteFunc={onDeleteProduct}
          />
          &nbsp;
          <Link to={`edit/${item.id}`} className="btn btn-success">
            Змінити
          </Link>
        </td>
      </tr>
    );
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <>
      <Element name="myScrollToElement"></Element>
      <h1 className="text-center">Продукти</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <InputGroup
              label="Назва"
              field="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
            />
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Оберіть категорію
              </label>
              {/* Select - містить у собі значення категорій, по default - 0 */}
              <select
                className={classNames("form-select", {
                  "is-invalid": errors.categorySlug && touched.categorySlug,
                })}
                defaultValue={values.categorySlug} //Значення, яке міститься в select
                aria-label="Default select example"
                onChange={handleChange} //якщо значення міняється, воно записується у формік
                name="categorySlug" //значення поля у форміку = categoryId - якщо його не буде - formik - не буде знать, яке поле оновлять
                id="categorySlug" //це використовується для label
              >
                {/* значення, яке завжди буде не обране, для того, що нагадать, що треба
            вказувать категорію */}
                <option value="">Оберіть категорію</option>
                {/* Перебираємо список категорій і виводимо їз у вигляд <option></option> */}
                {categories.map((item) => {
                  return (
                    <option value={item.urlSlug} key={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary">
              Пошук
            </button>
          </div>
        </div>
      </form>
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
            <th></th>
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
