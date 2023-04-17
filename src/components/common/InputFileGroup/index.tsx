import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import defaultImage from "../../../assets/SelectImage.jpg";
import "./style.css";

interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  field: string;
  onSelectFile: (file: File) => void;
}

const InputFileGroup: FC<InputFileGroupProps> = ({
  label = "Оберіть файл",
  field,
  onSelectFile,
}) => {
  const [selectImage, setSelectImage] = useState<File | null>(null);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setSelectImage(file);
      onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        <h6>{label}</h6>
        <div className="output">
          <section>
            {selectImage == null ? (
              <img src={defaultImage} alt="#" style={{ cursor: "pointer" }} />
            ) : (
              <img
                src={URL.createObjectURL(selectImage)}
                alt="#"
                style={{ cursor: "pointer" }}
              />
            )}
          </section>
        </div>
      </label>

      <input
        type="file"
        className="d-none"
        id={field}
        onChange={onChangeFileHandler}
      />
    </div>
  );
};

export default InputFileGroup;
