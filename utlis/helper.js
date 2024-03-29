import { mutate } from "swr";

export const mutateData = async (url, method, data) => {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    // Trigger a revalidation of the data
    mutate(url, (cacheData) => ({...cacheData, data}));
  };

export const fetcher = (...args) => fetch(...args).then(res => res.json());
