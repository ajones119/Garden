import React, { useEffect, useState } from "react";

type useLocalStorageProps<T> = {
  key: string;
  initialValue: T;
  setInitialOnEmpty?: boolean;
};

const useLocalStorage = <T,>({
  key,
  initialValue,
  setInitialOnEmpty = false,
}: useLocalStorageProps<T>) => {
  const [value, setValue] = useState<T>(initialValue); // always safe on first render

  // Hydrate value on mount (only on client)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      } else if (setInitialOnEmpty) {
        localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (err) {
      console.warn("Error reading localStorage", err);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
