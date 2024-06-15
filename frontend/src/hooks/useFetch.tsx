// Third party
import { useCallback, useState } from "react";

export function useFetch() {
  const [data, setData] = useState<Record<string, unknown>>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(
    async (url: string, options?: Record<string, string>) => {
      try {
        const response = await fetch(url, {
          credentials: "include",
          mode: "cors",
          ...options,
        });

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);

        return json;
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, error, isLoading, fetchData };
}
