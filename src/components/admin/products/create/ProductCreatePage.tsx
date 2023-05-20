import { ICategorySelect, IProductCreate } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";
import { useEffect, useState } from "react";
import http from "../../../../http_common";

const ProductCreatePage = () => {

    const [categories, setCategories] = useState<ICategorySelect[]>([]);

    useEffect(() => {
      http.get<ICategorySelect[]>("api/categories/list")
        .then(resp => {
            setCategories(resp.data);
            console.log("categories", resp.data);
        });
    }, []);
    
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IProductCreate = {
    name: "",
    priority: 0,
    categoryId: 0,
    description: "",
    ids: [],
    price: 0,
  };

  const onFormikSubmit=async (values: IProductCreate) => {
    console.log("Formik submit data", values);
  }

  const validSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
    priority: yup.string().required("Вкажіть пріорітет"),
    categoryId: yup.string().required("Вкажіть категорію"),
    description: yup.string().required("Вкажіть опис"),
    price: yup.string().required("Вкажіть ціну"),
  });

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: validSchema
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue, setFieldError } = formik;

  return (
    <>
      <h1 className="text-center">Додати продукт</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <InputGroup
          label="Назва"
          field="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        <InputGroup
          label="Пріорітет"
          field="priority"
          value={values.priority}
          onChange={handleChange}
          error={errors.priority}
          touched={touched.priority}
          type={"number"}
        />
        <InputGroup
          label="Опис"
          field="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
        />
        
        <InputGroup
          label="Ціна"
          field="price"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
          touched={touched.price}
          type={"number"}
        />

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Оберіть категорію
          </label>
          <select
            className="form-select"
            defaultValue={values.categoryId}
            aria-label="Default select example"
            onChange={handleChange}
            name="categoryId"
            id="categoryid"
          >
            <option value="0" disabled>Оберіть категорію</option>
            {categories.map(item => {
                return (
                    <option value={item.id} key={item.id}>{item.title}</option>
                );
            })}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Створити товар
        </button>
      </form>
    </>
  );
};
export default ProductCreatePage;
