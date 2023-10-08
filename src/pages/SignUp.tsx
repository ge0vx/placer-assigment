import React from "react";
import { Form } from "../componets/Form/Form";
import { IInputTextProps } from "../componets/FormIput/FormInput";
import formJSON from "../formData.json";
import { ISelectProps } from "../componets/FormSelect/FormSelect";

export const SignUp: React.FC = () => {
  const formLabel = formJSON["form_label"] as string;
  const fileds = formJSON["fields"] as IInputTextProps[] & ISelectProps[];

  return <Form title={formLabel} fields={fileds} />;
};
