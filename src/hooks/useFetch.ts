import { useState } from "react";

interface FetchOptions {
  headers?: any;
}

export const useFetch = <T = any>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    fetchData: { url: string; options: FetchOptions },
  ): Promise<T> => {
    try {
      setLoading(true);
      const response = await fetch(fetchData.url, fetchData.options);

      return await response.json();
    } catch (err) {
      setError(err as string);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};
