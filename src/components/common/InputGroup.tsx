import { FC, InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "password" | "email";
  field: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: FC<InputGroupProps> = ({
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
