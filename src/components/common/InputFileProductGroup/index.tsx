import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import plusImage from "../../../assets/plus.png";
import { APP_ENV } from "../../../env";
import http from "../../../http_common";
import { IProductImageItem } from "../../admin/products/types";
import "./style.css";
import { IUploadImage, IUploadImageResult } from "./types";

interface InputFileProductGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  field: string;
  onRemoveFile: (id: number) => void; //обробник для видалення фото по id в батька
  onSelectFile: (id: number) => void; //Повертаємо id - фото, яке збережено на сервері для товару
  errors?: string[];
  error?: string[] | string | undefined;
  touched?: boolean | undefined;
  imgView?: IProductImageItem[]; //Масив фото, який ми хочемо відобразить
}

const InputFileProductGroup: FC<InputFileProductGroupProps> = ({
  label = "Оберіть файл",
  field,
  onRemoveFile,
  onSelectFile,
  errors,
  error,
  touched,
  imgView = [],
}) => {
  //Набір фото, які обрав користувач
  const [images, setImages] = useState<IProductImageItem[]>([]); //Список імен файлів, які ми будемо відображати в даному компоненті

  useEffect(() => {
    setImages(imgView);
  }, [imgView]);

  //console.log("----images-----", imgView);

  const onRemoveImage = (img: IProductImageItem) => {
    console.log("Remove image", img);
    setImages(images.filter((x) => x.id !== img.id));

    //setImages(images.splice(img, 1));
    onRemoveFile(img.id);
  };
  //Коли ми обрали файл
  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Не допустимий тип файлу");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        //обєкт, який ми вантажимо на сервер
        const upload: IUploadImage = {
          image: reader.result as string,
        };
        try {
          //відправляємо base64 на сервер і очікуємо результат
          const dataServer = await http.post<IProductImageItem>(
            "api/products/upload",
            upload
          );
          const imageServer = dataServer.data; //Якщо результат, був успішний ми отримуємо об'єкт, який включає назву файлу та id фото
          setImages([...images, imageServer]); //зберігаємо назву фото для відображення у списку
          onSelectFile(imageServer.id); //передаємо через callback - id фото для даного товару
        } catch (problem) {
          console.log("Error upload image to server");
        }
        //onSelectFile(reader.result as string);
      };
      //onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor={field} className="form-label">
            <h6>{label}</h6>

            <img
              width="80%"
              className="img-fluid"
              src={plusImage} //фото, по якому натискаємо і можемо вибрати файл
              style={{ cursor: "pointer" }}
            />
          </label>

          <input
            type="file"
            className="d-none"
            accept="image/jpeg, image/png, image/gif" //для інпута є обмеження по формату файлу
            id={field}
            onChange={onChangeFileHandler} //Обробник, який спрацьовує, коли ми обрали файл
          />
        </div>

        {/* відображаємо список файлів, які ми обрали */}
        {images.map((item) => (
          <div key={item.id} className="col-md-4 mt-5">
            <div>
              <i
                className="fa fa-times fa-2x fa-fw text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => onRemoveImage(item)}
              ></i>
            </div>
            <img
              width="80%"
              className="img-fluid"
              src={`${APP_ENV.BASE_URL}images/300_${item.name}`}
            />
          </div>
        ))}
      </div>

      {errors && (
        <div className="alert alert-danger">
          {errors.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      {error && touched && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputFileProductGroup;
