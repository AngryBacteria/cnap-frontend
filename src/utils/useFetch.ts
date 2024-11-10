import { useState, useEffect } from 'react';

function useApi<T = unknown>(apiUrl: string) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        setError(true);
      } else {
        const data = (await response.json()) as T;
        setData(data);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchData();
  }, []);

  return [data, isLoading, error];
}

export default useApi;
