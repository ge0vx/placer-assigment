import React, { useEffect, useState } from "react";
import "./FormSelect.css";

type TypeSelectMethos = {
  onChange: (name: string, value: string) => void;
  requestOptions: (id: string, url: string, optionsDependOn?: string) => void;
  changeSelectOptions: (
    id: string,
    options: ISelectOptionProps[]
  ) => void;
};

export interface ISelectOptionProps {
  label: string | undefined;
  value: string | undefined;
}

export interface ISelectProps {
  name: string;
  label: string;
  type: "select";
  value: string;
  required: boolean;
  errorMessage: string;
  placeholder?: string;
  options?: ISelectOptionProps[];
  optionsDependOn?: string;
  loadOptionsFrom?: string;
}

export const FormSelect: React.FC<ISelectProps & TypeSelectMethos> = (
  props
) => {
  const {
    onChange,
    requestOptions,
    changeSelectOptions,
    name,
    label,
    value,
    required,
    errorMessage,
    placeholder,
    options: posibleOptions,
    optionsDependOn,
    loadOptionsFrom,
  } = props;
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const optionsIsNull = !(posibleOptions && posibleOptions.length > 0);

    if (!optionsIsNull) {
      //intial options
      changeSelectOptions(name, posibleOptions);
    }

    if (optionsIsNull && !loadOptionsFrom) {
      //no options posible options
      changeSelectOptions(name, [{ label: "No Options", value: "" }]);
    }

    if (optionsIsNull && !!loadOptionsFrom) {
      //loading posible options
      requestOptions(name, loadOptionsFrom, optionsDependOn);
    }
  }, []);

  const handleBlur = () => {
    setFocused(true);
  };

  const handleFocus = () => {
    setFocused(false);
  };

  const availableOptions = (aOptions: ISelectOptionProps[]) => {
    const alloptions =
      aOptions &&
      aOptions.map((option, i) => (
        <option value={option.value} key={i + 1}>
          {option.label}
        </option>
      ));

    if (alloptions.length > 1) {
      alloptions.unshift(<option key={0} />);
    }
    return alloptions;
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        required={!!required}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.name, e.target.value);
        }}
        placeholder={placeholder}
        autoFocus={focused}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        {posibleOptions && availableOptions(posibleOptions)}
      </select>
      <span>{errorMessage}</span>
    </div>
  );
};
