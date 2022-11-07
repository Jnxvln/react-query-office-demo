import { fetchPosts } from "../api/posts/postApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Posts() {
  const queryClient = useQueryClient();

  const { isError, isLoading, isSuccess, data, error } = useQuery(["posts"], fetchPosts, {
    staleTime: 6000,
  });

  const renderError = () => (
    <div style={{ fontWeight: "bold", color: "red" }}>Error Loading Posts!</div>
  );
  const renderLoading = () => <div>Loading...</div>;

  return (
    <div>
      <header>
        <h2>Posts</h2>

        {isError ? (
          renderError()
        ) : isLoading ? (
          renderLoading
        ) : (
          <ul>
            {data?.map((post) => (
              <li>{post.title}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}
