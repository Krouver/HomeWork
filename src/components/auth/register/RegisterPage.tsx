import { ChangeEvent, useState } from "react";
import { IRegisterPage } from "./types";
const RegisterPage = () => {
  const init: IRegisterPage = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    image: "",
  };
  const [data, setData] = useState<IRegisterPage>(init);
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    setData(init);
    //setData({email: "pylyp", password: "123456"});
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("Щось вводити в інтпут");
    // console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <>
        <h1 className="text-center">Реєстрація на сайті</h1>
        <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              onChange={onChangeHandler}
              value={data.firstname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              onChange={onChangeHandler}
              value={data.lastname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={onChangeHandler}
              value={data.confirmPassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="image"
              name="image"
              onChange={onChangeHandler}
              value={data.image}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Реєстрація
          </button>
        </form>
      </>
    </>
  );
};

export default RegisterPage;
