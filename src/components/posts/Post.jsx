import { toTitleCase } from "../../util/utils";
import styles from "../../styles/Posts.module.scss";

export default function Post({ post }) {
  return (
    <article className={styles.postItemWrapper}>
      <header className={styles.postHeader}>
        <h2 className={styles.postTitle}>{toTitleCase(post.title)}</h2>
      </header>
      <div className={styles.postBody}>
        <div>{post.body}</div>
      </div>
    </article>
  );
}
