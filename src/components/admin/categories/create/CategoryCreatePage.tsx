import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../../http_common";
import InputFileGroup from "../../../common/InputFileGroup";
import InputGroup from "../../../common/InputGroup";
import { ICategoryCreate } from "../types";

const CategoryCreatePage = () => {

    //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: ICategoryCreate = {
    title: "",
    urlSlug: "",
    image: "",
    priority: 0,
  };

  const [data, setData] = useState<ICategoryCreate>(init);
  const navigator = useNavigate();

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    try{
      const result = await http.post("api/categories/add", data);
      navigator("/");
    } catch(err: any) {
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
      <h1 className="text-center">Додати категорію</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Назва"
          field="title"
          value={data.title}
          onChange={onChangeHandler}
        />
        <InputGroup
          label="Url Slug"
          field="urlSlug"
          value={data.urlSlug}
          onChange={onChangeHandler}
        />
        <InputGroup
          label="Пріорітет"
          field="priority"
          value={data.priority}
          type="number"
          onChange={onChangeHandler}
        />
        
        <InputFileGroup
          label="Оберіть фото для категорії"
          field="image"
          onSelectFile={(base64) => {
            setData({ ...data, image: base64 });
          }}
        />

        <button type="submit" className="btn btn-primary">
          Додати категорію
        </button>
      </form>
    </>
  );
};

export default CategoryCreatePage;
