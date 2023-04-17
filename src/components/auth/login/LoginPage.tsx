import { ChangeEvent, useState } from "react";
import { ILoginPage } from "./types";
import InputGroup from "../../common/InputGroup";

const LoginPage = () => {
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: ILoginPage = {
    email: "",
    password: "",
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<ILoginPage>(init);

  // console.log("Render Login component", "------SALO----");

  //console.log("Дестурктуризація", {...data, password: "123456"});

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    //setData({email: "pylyp", password: "123456"});
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("Щось вводити в інтпут");
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="text-center">Вхід на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Електронна адреса"
          field="email"
          value={data.email}
          onChange={onChangeHandler}
        />

        <InputGroup
          label="Пароль"
          type="password"
          field="password"
          value={data.password}
          onChange={onChangeHandler}
        />

        <button type="submit" className="btn btn-primary">
          Вхід
        </button>
      </form>
    </>
  );
};

export default LoginPage;
