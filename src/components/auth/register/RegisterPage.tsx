import { ChangeEvent, useState } from "react";
import InputFileGroup from "../../common/InputFileGroup";
import InputGroup from "../../common/InputGroup";
import { IRegisterError, IRegisterPage, ISelectItem } from "./types";
import http from "../../../http_common";

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
  const [data, setData] = useState<IRegisterPage>(init);
  const [error, setError] = useState<IRegisterError>();

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    try{
      const result = await http.post("api/account/register", data);
      console.log("Result server good", result);
    } catch(err: any) {
      const error = err.response.data.errors as IRegisterError;
      setError(error);
      console.log("Bad request", err);
    }
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Електронна адреса"
          field="email"
          value={data.email}
          onChange={onChangeHandler}
          errors={error?.email}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Прізвище"
              field="secondName"
              value={data.secondName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Ім'я"
              field="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <InputFileGroup
          label="Оберіть фото для аватар"
          field="photo"
          onSelectFile={(base64) => {
            setData({ ...data, photo: base64 });
          }}
          errors={error?.photo}
        />

        <InputGroup
          label="Телефон"
          field="phone"
          value={data.phone}
          onChange={onChangeHandler}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Пароль"
              type="password"
              field="password"
              value={data.password}
              onChange={onChangeHandler}
              errors={error?.password}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Підтвердження пароль"
              type="password"
              field="confirmPassword"
              value={data.confirmPassword}
              onChange={onChangeHandler}
              errors={error?.confirmPassword}
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
