import axios from "axios";

const API_URL = "http://localhost:4000/posts";

export const fetchPosts = async (page) => {
  const limit = 3;

  // PAGINATION QUERY
  let query = `${API_URL}?_page=${page}&_limit=${limit}`;

  // Get ALL posts (for use with `hasMore`)
  const allPostsResponse = await axios.get(API_URL);
  if (!allPostsResponse) throw new Error("No response from posts API");
  const hasMore = allPostsResponse.data.length > parseInt(page) * limit;

  // Get JUST the paginated items
  const paginatedPostsResponse = await axios.get(query);
  if (!paginatedPostsResponse) throw new Error("No response from API");

  let resp = {
    ...paginatedPostsResponse,
    data: { posts: [...paginatedPostsResponse.data], hasMore },
  };

  return resp;
};

export const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);

  if (!response) throw new Error("No response from API");
  if (!response.data) throw new Error("No `data` key found on response from API");
  return response.data;
};
