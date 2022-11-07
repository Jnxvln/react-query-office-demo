import { fetchPosts } from "../api/posts/postApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toTitleCase } from '../util/utils'
import ComponentError from "../components/errors/ComponentError"
import Spinner from "../components/layout/Spinner";

export default function Posts() {
  const queryClient = useQueryClient();

  const { isError, isLoading, isSuccess, data, error } = useQuery(["posts"], fetchPosts, {
    staleTime: 6000,
  });

  const renderError = () => (
    <div style={{ padding: "1em" }}>
      <div style={{ fontWeight: "bold" }}>Error Loading Posts</div>
      <div style={{ fontWeight: "bold" }}>
        Reason: <span style={{ color: "red" }}>{error.message}</span>
      </div>
    </div>
  );

  return (
    <div id="page-posts">
      <header>
        <h2 style={{ margin: 0 }}>Posts</h2>
      </header>
      <div>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ComponentError error={error} />
        ) : (
          <ul style={{ marginTop: "1em" }}>
            {data?.map((post) => (
              <li>{toTitleCase(post.title)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
