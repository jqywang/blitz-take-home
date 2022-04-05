import { useEffect, useState } from "react";
import {filter as fuzzyFilter} from "fuzzaldrin-plus";

const mockData = [
  { name: "Red", hex: "#DB2D2D" },
  { name: "Orange", hex: "#F2994A" },
  { name: "Yellow", hex: "#F2C94C" },
  { name: "Green", hex: "#27AE60" },
  { name: "Blue", hex: "#2F80ED" },
  { name: "Violet", hex: "#602FED" },
  { name: "Rebecca Purple", hex: "#663399" },
];
const nameArray = mockData.map(color => color.name);

// This function can be improved. for example, fuzzy search
const mockDatabaseResponse = (query) => {

  const fuzzyResults = fuzzyFilter(nameArray, query);
  return mockData.filter(({ name }) => {
    return fuzzyResults.indexOf(name) !== -1;
  });
};

// Emulates a slow API call, don't change this
const queryPromise = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabaseResponse(query));
    }, 500);
  });
};

// This hook can be modified for cache, debounce, etc.
const useGetColor = ({ query = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!query.length) {
      setData(null);
      setLoading(false);
      return;
    }
    queryPromise(query).then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [query]);

  return {
    data,
    loading,
  };
};

export default useGetColor;
