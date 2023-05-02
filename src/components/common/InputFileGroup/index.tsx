import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import defaultImage from "../../../assets/defaultImage.jpg";
import "./style.css";

interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  field: string;
  onSelectFile: (base64: string) => void;
  errors?: string[];
}

const InputFileGroup: FC<InputFileGroupProps> = ({
  label = "Оберіть файл",
  field,
  onSelectFile,
  errors
}) => {
  const [selectImage, setSelectImage] = useState<File | null>(null);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      //console.log("Ви обрали файл", file);
      setSelectImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        onSelectFile(reader.result as string);
      };
      //onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        <h6>{label}</h6>
        {selectImage == null ? (
          <img width="150"
            className="img-fluid"
            src={defaultImage}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <img width="150" src={URL.createObjectURL(selectImage)} />
        )}
      </label>

      <input
        type="file"
        className="d-none"
        id={field}
        onChange={onChangeFileHandler}
      />
      {errors && (
        <div className="alert alert-danger">
          {errors.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputFileGroup;
