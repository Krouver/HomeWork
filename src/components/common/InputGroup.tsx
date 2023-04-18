import { FC, InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "password" | "email";  //--------------------------------------------------- для чого знак питання?
  field: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; //------------------------------------------------для чого ця строка і що вона виконує?
}

const InputGroup: FC<InputGroupProps> = ({ //--------------------------------------------------- FC? Памятаємо що це якась реаківська лажа, все що пам'ятаємо
  label,
  type = "text",
  field,
  value,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={field}
        name={field}
        value={value}
        onChange={onChange}
        aria-describedby="emailHelp"
      />
    </div>
  );
};

export default InputGroup;
