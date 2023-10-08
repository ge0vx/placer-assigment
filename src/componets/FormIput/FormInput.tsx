import React, { useState } from "react";
import "./FormInput.css";

type TypeInputTextMethos = {
  onChange: (name: string, value: string) => void;
};

export interface IInputTextProps {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  value: string;
  required: boolean | string;
  errorMessage: string;
  placeholder?: string;
  pattern?: string;
}

export const FormInput: React.FC<IInputTextProps & TypeInputTextMethos> = (
  props
) => {
  const {
    name,
    label,
    type,
    value,
    required,
    errorMessage,
    onChange,
    placeholder,
    pattern,
  } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setFocused(true);
  };

  const handleFocus = () => {
    setFocused(false);
  };

  return (
    <div className="formInput">
      <label className="label">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        required={!!required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.name, e.target.value);
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        pattern={pattern}
        placeholder={placeholder}
        autoFocus={focused}
      />
      <span>{errorMessage}</span>
    </div>
  );
};
