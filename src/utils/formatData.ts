import { IInputTextProps } from "../componets/FormIput/FormInput";
import {
  ISelectOptionProps,
  ISelectProps,
} from "../componets/FormSelect/FormSelect";

type option = {
  state_name?: string;
  city_name?: string;
};
export function formatSelectOptions(
  id: string,
  options: option[]
): ISelectOptionProps[] {
  switch (id) {
    case "state":
      return options.map((option) => ({
        label: option.state_name,
        value: option.state_name,
      }));
    case "city":
      return options.map((option) => ({
        label: option.city_name,
        value: option.city_name,
      }));
    default:
      return [];
  }
}

export function formatOutput(elements: IInputTextProps[] & ISelectProps[]) {
  return elements.map((element) => ({ [element.name]: element.value }));
}
