import { useCallback, useEffect, useState } from "react";

async function fetchData(url, configuration) {
  const response = await fetch(url, configuration);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }

  return resData;
}

export default function useHttps(url, configuration, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await fetchData(url, configuration);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, configuration],
  );

  useEffect(() => {
    if (configuration && configuration.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, configuration]);

  return {
    sendRequest,
    isLoading,
    error,
    data,
  };
}
