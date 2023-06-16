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
  //Навігація
  const navigate = useNavigate();
  //Зберігаємо списко категорій
  const [categories, setCategories] = useState<ICategorySelect[]>([]);

  useEffect(() => {
    //Посилаємо запит на сервер по список категорій для тега select
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
  //Дані, які приходять після валіації із форміка
  const onFormikSubmit = async (values: IProductCreate) => {
    //Вивовдимо дані на консоль, щоб їх побачить
    console.log("Formik submit data", values);
    try {
      //запит на створення продукта
      const result = await http.post<IProductCreateResult>(
        "api/products/add",
        values
      );
      //виводимо id продукта із БД
      console.log("result id = ", result.data.id);
      //переходимо до списку продуктів у нашому випадку на один рівень назад
      navigate("..");
    } catch (error) {
      //якщо запит на сервер буде не успішний
      console.log("Send data server error"); //вивдимо помилку на консоль
    }
  };
  //Схема валідації даних
  const validSchema = yup.object({
    name: yup.string().required("Вкажіть назву"), //валідуємо назву товару
    priority: yup
      .number()
      .min(1, "Пріорітет має бути більшим 0")
      .required("Вкажіть пріорітет"), //перевіряємо пріорітет
    categoryId: yup.number().min(1, "Вкажіть категорію"), //Має бути обрана категорія
    description: yup.string().required("Вкажіть опис"), //Має бути опис у товару
    price: yup.string().required("Вкажіть ціну"), //має бути ціна товару
    ids: yup
      .array()
      .of(yup.number())
      .min(1, "Мінімального одна фотка для товару")
      .required("Оберіть хочаб одне фото"), //перевіряємо чи масив має елементи
  });
  //створюємо formik
  const formik = useFormik({
    initialValues: init, //початкові налаштування для полів
    onSubmit: onFormikSubmit, //метод, який спрацьовує, коли усі дані у форміку валідні
    validationSchema: validSchema, //схема валідації даних
  });
  const {
    values, //отримуємо доступ до полів у форміку
    touched, //Відстлідковує подію виклику методу handleSubmit
    errors, //Містить набері помилок для сервака
    handleSubmit, //метод, який спрацьовує на форміку для валідації даних і якщо вони валідні то буде спрацьосувать onFormikSubmit
    handleChange, //метод, який відслідковує зміни значення полів у формі
    setFieldValue, //можна задавати значення полів через іменовані параметри (імя поля, значення)
  } = formik; //сам об'єкт із якого ми витягуємо потрібні властивості форми

  return (
    <>
      <h1 className="text-center">Додати продукт</h1>
      {/* Форма, яка зберігає значення усіх полів */}
      <form onSubmit={handleSubmit} className="col-md-10 offset-md-1">
        {/* Значення - Назва товару */}
        <InputGroup
          label="Назва"
          field="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        {/* Пріорітет - Отримує від користувача пріорітет */}
        <InputGroup
          label="Пріорітет"
          field="priority"
          value={values.priority}
          onChange={handleChange}
          error={errors.priority}
          touched={touched.priority}
          type={"number"}
        />
        {/* Використовує наш компонент для вводу опису, який формується за допомогою TinyMCE */}
        <EditorTiny
          value={values.description} //Значення, яке ми вводимо в поле
          label="Опис" //Підпис для даного інпуту
          field="description" //Назва інпуту
          error={errors.description} //Якщо є помилка, то вона буде передаватися
          touched={touched.description} //Якщо натискалася кнопка Submit
          onEditorChange={(text: string) => {
            //Метод, який викликає сам компонет, коли в інпуті змінюється значення
            setFieldValue("description", text); //Текст, який в середині інпуту, записуємо у формік в поле description
          }}
        />
        {/* Значення ціни */}
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
          {/* Select - містить у собі значення категорій, по default - 0 */}
          <select
            className={classNames("form-select", {
              "is-invalid": errors.categoryId && touched.categoryId,
            })}
            defaultValue={values.categoryId} //Значення, яке міститься в select
            aria-label="Default select example"
            onChange={handleChange} //якщо значення міняється, воно записується у формік
            name="categoryId" //значення поля у форміку = categoryId - якщо його не буде - formik - не буде знать, яке поле оновлять
            id="categoryid" //це використовується для label
          >
            {/* значення, яке завжди буде не обране, для того, що нагадать, що треба
            вказувать категорію */}
            <option value="0" disabled>
              Оберіть категорію
            </option>
            {/* Перебираємо список категорій і виводимо їз у вигляд <option></option> */}
            {categories.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
        {/* Відповідає за вибір фото для товару, і вивід самих фото на екран. Дані
        фото передаються на сервер і id записуються у formik */}
        <InputFileProductGroup
          label="Оберіть фото товару"
          field="imageSelect"
          error={errors.ids} //якщо є помилки, то буде їх показувать
          touched={touched.ids} //якщо нажали Submit
          onSelectFile={(id) => {
            // callback - метод, який вертає id - зображення товару, який було збережено на серваку
            setFieldValue("ids", [...values.ids, id]); //додаємо у колекції новий елемент id - фото товару
            //console.log("Select image", id);
            //setData({ ...data, image: base64 });
          }}
          onRemoveFile={(id) => {
            setFieldValue(
              "ids",
              values.ids.filter((x) => x !== id)
            );
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
