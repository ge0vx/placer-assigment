import React from "react";
import { ISelectOptionProps } from "../componets/FormSelect/FormSelect";

export const FormContext = React.createContext({
  formOnChange: (id: string, value: string) => {},
  formLoadSelectOptions: (
    id: string,
    url: string,
    optionsDependOn?: string
  ) => {},
  formChangeSelectOptions: (id: string, options: ISelectOptionProps[]) => {},
  // form: {},
});
