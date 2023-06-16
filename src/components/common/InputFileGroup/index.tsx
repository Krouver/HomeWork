import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import defaultImage from "../../../assets/defaultImage.jpg";
import "./style.css";

//Властивості, які може мати інпут для вибору декількох файлі
interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; //Назва інпута
  field: string; //ідентифікатор поля
  onSelectFile: (base64: string) => void; //метод, який вертає base64, коли ми обираємо новий файл
  errors?: string[]; //список помилок від сервера
  error?: string | undefined; //Помилка для самого інпута із Formik
  touched?: boolean | undefined; //із Formik
}

const InputFileGroup: FC<InputFileGroupProps> = ({
  label = "Оберіть файл", //Якщо не вказали значення, то буде Оберіть файл
  field,
  onSelectFile,
  errors,
  error,
  touched,
}) => {
  const [selectImage, setSelectImage] = useState<File | null>(null); //Файл, який було обрано для даного інпута

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; //Отримуємо файли, які були обрані
    if (files) {
      const file = files[0]; //Беремо 1 файл із списку
      //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Не допустимий тип файлу");
        return;
      }
      //console.log("Ви обрали файл", file);
      setSelectImage(file); //Зберігаємо в selectImage - сайт файл, який ми обрали на ПК
      const reader = new FileReader();
      reader.readAsDataURL(file); //проводимо читання дагого файлу, для отримання base64
      reader.onload = function () {
        //якщо читання успішні
        onSelectFile(reader.result as string); //передаємо результат (base64) у callback - метод батьквському компоненту
      };
      //onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        <h6>{label}</h6>
        {selectImage == null ? ( //якщо фото відстунє, тод відобрається фото, по якому можна натиснути і обрати файл на вашому ПК
          <img
            width="150"
            className="img-fluid"
            src={defaultImage}
            style={{ cursor: "pointer" }}
          />
        ) : (
          //Якщо фото обране, тоді відображаємо дане фото
          <img width="150" src={URL.createObjectURL(selectImage)} />
        )}
      </label>

      <input
        type="file"
        className="d-none" //інпут для вибору файлу є скритий, для того, щоб по ньому натиснути використовуємо label
        accept="image/jpeg, image/png, image/gif"
        id={field}
        onChange={onChangeFileHandler} //Подія яка спрацьомує коли ми обрали файл.
      />
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

export default InputFileGroup;
