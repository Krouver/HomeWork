import { ChangeEvent, useState } from "react";
import InputFileGroup from "../../common/InputFileGroup";
import InputGroup from "../../common/InputGroup";
import { IRegisterError, IRegisterPage, ISelectItem } from "./types";
import http from "../../../http_common";
import { useFormik } from "formik";
import * as yup from "yup";

const RegisterPage = () => {
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IRegisterPage = {
    email: "",
    firstName: "",
    secondName: "",
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  // const [data, setData] = useState<IRegisterPage>(init);
  const [error, setError] = useState<IRegisterError>();



  const onFormikSubmit=async (values: IRegisterPage) => {
    console.log("Formik Submit Form to Server", values);
     try{
      const result = await http.post("api/account/register", values);
      console.log("Result server good", result);
    } catch(err: any) {
      const error = err.response.data.errors as IRegisterError;
      if(error.email)
      {
        setFieldError("email", error.email[0]);
        return;
      }
      setError(error);
      console.log("Bad request", err);
    }
  }

  const registerSchema = yup.object({
    email: yup.string()
      .required("Вкажіть пошту")
      .email("Введіть коректно пошту"),
    firstName: yup.string().required("Вкажіть ім'я"),
    secondName: yup.string().required("Вкажіть прізвище"),
    photo: yup.string().required("Оберіть фото"),
    phone: yup.string().required("Вкажіть телефон"),
    password: yup
      .string()
      .min(5, "Пароль повинен містити мініму 5 символів")
      .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
      .required("Поле не повинне бути пустим"),
    confirmPassword: yup
      .string()
      .min(5, "Пароль повинен містити мініму 5 символів")
      .oneOf([yup.ref("password")], () => "Паролі повинні співпадати")
      .required("Поле не повинне бути пустим"),
  });

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: registerSchema
  });

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue, setFieldError } = formik;

  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <InputGroup
          label="Електронна адреса"
          field="email"
          value={values.email}
          onChange={handleChange}
          errors={error?.email}
          error={errors.email}
          touched={touched.email}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Прізвище"
              field="secondName"
              value={values.secondName}
              onChange={handleChange}
              error={errors.secondName}
              touched={touched.secondName}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Ім'я"
              field="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              touched={touched.firstName}
            />
          </div>
        </div>

        <InputFileGroup
          label="Оберіть фото для аватар"
          field="photo"
          onSelectFile={(base64) => {
            setFieldValue("photo", base64);
          }}
          errors={error?.photo}
          error={errors.photo}
          touched={touched.photo}
        
        />

        <InputGroup
          label="Телефон"
          field="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          touched={touched.phone}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Пароль"
              type="password"
              field="password"
              value={values.password}
              onChange={handleChange}
              errors={error?.password}
              error={errors.password}
              touched={touched.password}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Підтвердження пароль"
              type="password"
              field="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              errors={error?.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
