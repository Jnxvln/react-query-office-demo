import { fetchPosts } from "../api/posts/postApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ComponentError from "../components/errors/ComponentError";
import SiteDialog from "../components/SiteDialog";
import Post from "../components/posts/Post";
import PostForm from "../components/posts/PostForm";
import Spinner from "../components/layout/Spinner";
import styles from "../styles/Posts.module.scss";
// PrimeReact Components
import { Button } from "primereact/button";

export default function Posts() {
  const queryClient = useQueryClient();

  const { isError, isLoading, isSuccess, data, error } = useQuery(["posts"], fetchPosts, {
    staleTime: 6000,
  });

  return (
    <div id="page-posts">
      <header>
        <h1 style={{ margin: 0, textAlign: "center" }}>Posts</h1>
      </header>

      {/* <Button label="New Post" icon="pi pi-plus" iconPos="left" className="p-button-sm" /> */}
      <PostForm />

      <div>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ComponentError error={error} />
        ) : (
          <ul style={{ marginTop: "1em" }} className={styles.postsList}>
            {data?.map((post) => (
              <li key={post.id} className={styles.postsListItem}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
