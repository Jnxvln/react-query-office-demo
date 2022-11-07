import axios from "axios";

const API_URL = "http://localhost:4000/posts";

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);

  if (!response) throw new Error("No response from API");
  if (!response.data) throw new Error("No `data` key found on response from API");
  return response.data;
};
