import {
  ICategorySelect,
  IProductCreate,
  IProductCreateResult,
} from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";
import { useEffect, useState } from "react";
import http from "../../../../http_common";
import InputFileGroup from "../../../common/InputFileGroup";
import InputFileProductGroup from "../../../common/InputFileProductGroup";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Editor } from "@tinymce/tinymce-react";
import EditorTiny from "../../../common/EditorTiny";

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategorySelect[]>([]);

  useEffect(() => {
    http.get<ICategorySelect[]>("api/categories/list").then((resp) => {
      setCategories(resp.data);
      //console.log("categories", resp.data);
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

  const onFormikSubmit = async (values: IProductCreate) => {
    console.log("Formik submit data", values);
    try {
      const result = await http.post<IProductCreateResult>(
        "api/products/add",
        values
      );
      console.log("result id = ", result.data.id);
      navigate("/admin/products/view/");
    } catch (error) {
      console.log("Send data server error");
    }
  };

  const validSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
    priority: yup
      .number()
      .min(1, "Пріорітет має бути більшим 0")
      .required("Вкажіть пріорітет"),
    categoryId: yup.number().min(1, "Вкажіть категорію"),
    description: yup.string().required("Вкажіть опис"),
    price: yup.string().required("Вкажіть ціну"),
    ids: yup
      .array()
      .of(yup.number())
      .min(1, "Мінімального одна фотка для товару")
      .required("Оберіть хочаб одне фото"),
  });

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: validSchema,
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;

  return (
    <>
      <h1 className="text-center">Додати продукт</h1>
      <form onSubmit={handleSubmit} className="col-md-10 offset-md-1">
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

        <EditorTiny
          value={values.description}
          label="Опис"
          field="description"
          error={errors.description}
          touched={touched.description}
          onEditorChange={(text: string) => {
            setFieldValue("description", text);
          }}
        />

        {/* <InputGroup
          label="Опис"
          field="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
        /> */}

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
            className={classNames("form-select", {
              "is-invalid": errors.categoryId && touched.categoryId,
            })}
            defaultValue={values.categoryId}
            aria-label="Default select example"
            onChange={handleChange}
            name="categoryId"
            id="categoryid"
          >
            <option value="0" disabled>
              Оберіть категорію
            </option>
            {categories.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>

        <InputFileProductGroup
          label="Оберіть фото товару"
          field="imageSelect"
          error={errors.ids}
          touched={touched.ids}
          onSelectFile={(id) => {
            setFieldValue("ids", [...values.ids, id]);
          }}
          onDeleteFile={(id) => {
            setFieldValue("ids", [...values.ids, id]);
          }}
        />

        <button type="submit" className="btn btn-primary">
          Створити товар
        </button>
      </form>
    </>
  );
};
export default ProductCreatePage;
