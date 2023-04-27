import { FC, InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    type?: "text"|"password"|"email",   //може не передаватися у пропсах для компонента(| - один із можливих варіатнів, які можуть буть)
    field: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputGroup : FC<InputGroupProps> = ({
    label,
    type="text", //Якщо не передає значення у type - то буде "text"
    field,
    value,
    onChange
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