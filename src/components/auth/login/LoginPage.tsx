import { ChangeEvent, FormEvent, useState } from "react";
import http from "../../../http_common";
import InputGroup from "../../common/InputGroup";
import { ILoginPage, ILoginPageError } from "./types";

const LoginPage = () => {

    //створили конкретни екземлеяр на основі нашого інтерфейсу
    const init: ILoginPage = {
        email: "",
        password: ""
    };

    //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
    const [data, setData] = useState<ILoginPage>(init);


    // console.log("Render Login component", "------SALO----");

    //console.log("Дестурктуризація", {...data, password: "123456"});
    
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Ми відправляємо на сервер", data);
        http.post("api/account/login", data)
          .then(resp=> {
            console.log("Вхід успішний", resp);
          })
          .catch(badReqeust => {
            //Помилки, які ідуть від сервера
            const errors = badReqeust.response.data.errors as ILoginPageError; 
            console.log("Вхід не успішний", badReqeust.response.data);
            console.log("Errors ", errors);
            
          });
        //setData({email: "pylyp", password: "123456"});
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log("Щось вводити в інтпут");ь
        //console.log(e.target.name, e.target.value);
        setData({...data, [e.target.name]: e.target.value});
    }
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
