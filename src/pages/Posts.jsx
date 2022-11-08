import { useState, useEffect } from "react";
import { fetchPosts } from "../api/posts/postApi";
import { useQuery } from "@tanstack/react-query";
import ComponentError from "../components/errors/ComponentError";
import Post from "../components/posts/Post";
import PostForm from "../components/posts/PostForm";
import Spinner from "../components/layout/Spinner";
// PrimeReact Components
import { Button } from "primereact/button";
import styles from "../styles/Posts.module.scss";
// PrimeReact Components
// import { Button } from "primereact/button";

export default function Posts() {
  // const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { isError, isLoading, data, isPreviousData, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    keepPreviousData: true,
  });

  // useEffect(() => {
  //   console.log("DATA ON CLIENT SIDE: ");
  //   console.log(data);
  // }, [data]);

  return (
    <div id="page-posts">
      <header>
        <h1 style={{ margin: 0, textAlign: "center" }}>Posts</h1>
      </header>

      <PostForm />

      <div>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ComponentError error={error} />
        ) : (
          <>
            <div style={{ display: "flex", marginTop: "1em" }}>
              <Button
                icon="pi pi-angle-left"
                className="p-button-sm p-button-secondary"
                label="Prev"
                disabled={page === 1}
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                style={{ marginRight: "0.5em" }}
              />
              <Button
                icon="pi pi-angle-right"
                className="p-button-sm p-button-secondary"
                label="Next"
                onClick={() => {
                  if (!isPreviousData && data?.data?.hasMore) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={isPreviousData || !data?.data?.hasMore}
              />
              <p style={{ marginLeft: "1em" }}>Page: {page}</p>
            </div>

            <ul style={{ marginTop: "1em" }} className={styles.postsList}>
              {data?.data?.posts?.map((post) => (
                <li key={post.id} className={styles.postsListItem}>
                  <Post post={post} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
