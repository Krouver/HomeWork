import { ChangeEvent, useState } from "react";
import InputFileGroup from "../../common/InputFileGroup/index";
import InputGroup from "../../common/InputGroup";
import { IRegisterPage, ISelectItem } from "./types";

const RegisterPage = () => {
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IRegisterPage = {
    email: "",
    password: "",
    image: null,
    countryId: 0,
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<IRegisterPage>(init);

  const [countries, setCountries] = useState<ISelectItem[]>([
    {
      id: 1,
      name: "Україна",
    },
    {
      id: 2,
      name: "Польща",
    },
    {
      id: 3,
      name: "Амерка USA",
    },
  ]);

  console.log("Render Login component", "------SALO----");

  //console.log("Дестурктуризація", {...data, password: "123456"});

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    //setData({email: "pylyp", password: "123456"});
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    //console.log("Щось вводити в інтпут");
    //console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const viewCountriesOption = countries.map((country, index) => (
    <option key={index} value={country.id}>
      {country.name}
    </option>
  ));
  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Електронна адреса"
          field="email"
          value={data.email}
          onChange={onChangeHandler}
        />

        <div className="mb-3">
          <label htmlFor="countryId" className="form-label">
            Країна
          </label>
          <select
            className="form-select"
            name="countryId"
            id="countryId"
            onChange={onChangeHandler}
          >
            <option>Оберіть країну</option>
            {viewCountriesOption}
          </select>
        </div>

        <InputFileGroup
          label="Оберіть фото для аватара"
          field="image"
          onSelectFile={(file) => {
            setData({ ...data, image: file });
          }}
        />

        <InputFileGroup
          label="Оберіть фото подружки"
          field="image2"
          onSelectFile={(file) => {
            console.log("SELECT 2", file);
            // setData({ ...data, image: file });
          }}
        />

        <InputGroup
          label="Пароль"
          type="password"
          field="password"
          value={data.password}
          onChange={onChangeHandler}
        />

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
