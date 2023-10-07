import { useEffect, useState } from "react";
import * as LocationService from "../services/LocationService";
import { useFetch } from "./useFetch";

export const useUniversalTutorial = () => {
  const { fetchData, loading, error } = useFetch();
  const [token, setToken] = useState<string | null>(null);

  const fetchAccessToken = async () => {
    if (!token) {
      const data = await fetchData(LocationService.getTokenConfig());
      setToken(data.auth_token);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return {
    token,
    tokenLoading: loading,
    tokenErrorMessage: error
  };
};
