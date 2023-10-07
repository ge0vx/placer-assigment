import React, { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { FormInput, IInputTextProps } from "../FormIput/FormInput";
import { FormSelect, ISelectProps } from "../FormSelect/FormSelect";

export type TypeFormElement = IInputTextProps | ISelectProps;

export const FormElement = ({
  field: props,
}: {
  field: TypeFormElement;
}) => {

  const { formOnChange, formLoadSelectOptions, formChangeSelectOptions } = useContext(FormContext);
  
  switch (props.type) {
    case "text":
    case "email":
    case "password":
      return (
        <FormInput
          name={props.name}
          label={props.label}
          type={props.type}
          value={props.value}
          required={props.required}
          errorMessage={props.errorMessage}
          onChange={formOnChange}
          pattern={props.pattern}
          placeholder={props.placeholder}
        />
      );
    case "select":
      return (
        <FormSelect
              name={props.name}
              label={props.label}
              type={props.type}
              value={props.value}
              required={props.required}
              errorMessage={props.errorMessage}
              onChange={formOnChange}
              requestOptions={formLoadSelectOptions}
              changeSelectOptions={formChangeSelectOptions}
              placeholder={props.placeholder}
              options={props.options}
              optionsDependOn={props.optionsDependOn}
              loadOptionsFrom={props.loadOptionsFrom}
        />
      );
    default:
      return null;
  }
};
