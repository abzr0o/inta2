import Post from "./post";
import styles from "../../styles/ColBase.module.scss";

function PostScroll({ children }: any) {
  return (
    <div className={`${styles.wrapper} ${styles.round} expand1`}>
      <Post />
    </div>
  );
}

export default PostScroll;
