import { useState } from "react";

type UseApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  sendRequest: (url: string, options?: RequestInit) => Promise<void>;
};

function useApi<T>(): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (
    url: string,
    options?: RequestInit
  ): Promise<void> => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
}

export default useApi;
