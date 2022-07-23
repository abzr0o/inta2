import Post from "./post";
import styles from "../../styles/ColBase.module.scss";

function PostScroll({ children }: any) {
  return (
    <div className={`${styles.wrapper} ${styles.round}`}>
      <Post />
    </div>
  );
}

export default PostScroll;
