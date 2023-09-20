
import { useState } from "react";


export function useLocalStorage<T>(keyName: string, defaultValue: T): [T, (value: T) => void, (fn: (data: T) => T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) { }
    setStoredValue(newValue);
  };

  const setReducer = (fn: (data: T) => T) => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        let newValue = fn(JSON.parse(value));
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);
      } else {
        let newValue = fn(defaultValue);
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return [storedValue, setValue, setReducer];
};