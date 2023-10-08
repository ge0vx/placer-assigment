import { useContext, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import * as LocationService from "../services/LocationService";
import { useFetch } from "./useFetch";
import { ISelectOptionProps } from "../componets/FormSelect/FormSelect";
import { formatSelectOptions } from "../utils/formatData";

export const useSelectOptions = () => {
  const { token: authToken } = useContext(TokenContext);
  const [id, setId] = useState<string>();
  const [options, setOptions] = useState<ISelectOptionProps[]>();
  const { fetchData, loading, error } = useFetch();

  const fetchSelectOptions = async (id: string, url: string) => {
    setId(id);
    if (authToken) {
      const data = await fetchData(
        LocationService.getSelectOptionsConfig(url, authToken)
      );
      const options = formatSelectOptions(id, data);
      setOptions(options);
    }
  };

  return {
    fetchSelectOptions,
    id,
    options,
    optionsLoading: loading,
    optionsErrorMessage: error,
  };
};
