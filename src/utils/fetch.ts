import axios from "axios";

export const axiosFetch = () => {
  const fetch = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return fetch;
};
