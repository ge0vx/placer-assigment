import React, { useState, useEffect } from "react";
import { FormContext } from "../../context/FormContext";
import { FormElement, TypeFormElement } from "../FormElement/FormElement";
import { IInputTextProps } from "../FormIput/FormInput";
import { ISelectOptionProps, ISelectProps } from "../FormSelect/FormSelect";
import { useSelectOptions } from "../../hooks/useSelectOptions";
import "./Form.css";
import { formatOutput } from "../../utils/formatData";

type TypeFormFileds = IInputTextProps[] & ISelectProps[];

type typeDependencies = {
  name: string;
  url: string;
  optionsDependOn: string;
};

interface IFormProps {
  title: string | null;
  fields: TypeFormFileds;
}

export const Form: React.FC<IFormProps> = ({ title, fields }) => {
  const [elements, setElements] = useState<TypeFormFileds>(fields);
  const [dependency, setDependency] = useState<typeDependencies>();
  const {
    fetchSelectOptions,
    id,
    options,
    optionsLoading,
    optionsErrorMessage,
  } = useSelectOptions();

  let findValue: string | null = null;

  elements.forEach((element) => {
    const { name } = element;
    if (dependency && name === dependency.optionsDependOn) {
      findValue = element.value;
    }
  });

  useEffect(() => {
    if (findValue && dependency?.name && dependency?.url) {
      fetchSelectOptions(dependency.name, `${dependency.url}${findValue}`);
      setDependency(undefined);
    }
  }, [findValue]);

  useEffect(() => {
    if (id && optionsErrorMessage) {
      formChangeSelectOptions(id, [
        { label: `${optionsErrorMessage}`, value: "" },
      ]);
    }

    if (id && optionsLoading) {
      formChangeSelectOptions(id, [{ label: "Loading Options...", value: "" }]);
    }
    if (id && options) {
      formChangeSelectOptions(id, options);
    }
  }, [id, options, optionsLoading]);

  const formChangeSelectOptions = (
    id: string,
    options: ISelectOptionProps[]
  ) => {
    const newElements: TypeFormFileds = [...elements];
    newElements.forEach((element: ISelectProps) => {
      const { name } = element;
      if (id === name) {
        element.options = [...options];
      }
      setElements(newElements);
    });
  };

  const formOnChange = (id: string, value: string) => {
    const newElements: TypeFormFileds = [...elements];
    newElements.forEach((element: TypeFormElement) => {
      const { name } = element;
      if (id === name) {
        element.value = value;
      }
      setElements(newElements);
    });
  };

  const formLoadSelectOptions = (
    id: string,
    url: string,
    optionsDependOn?: string
  ) => {
    if (!!optionsDependOn) {
      const dependency: typeDependencies = { name: id, url, optionsDependOn };
      setDependency(dependency);
    }
    if (!optionsDependOn) {
      fetchSelectOptions(id, url);
    }
  };

  const formHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = formatOutput(elements);
    console.log("requestBody: ", requestBody);
    alert(`${JSON.stringify({ requestBody: requestBody })}`);
  };

  return (
    <FormContext.Provider
      value={{ formOnChange, formLoadSelectOptions, formChangeSelectOptions }}
    >
      <form onSubmit={formHandleSubmit}>
        <h1>{title}</h1>
        {elements
          ? elements.map((field: TypeFormElement, i: number) => (
              <FormElement key={i} field={field} />
            ))
          : null}
        <button>Submit</button>
      </form>
    </FormContext.Provider>
  );
};
