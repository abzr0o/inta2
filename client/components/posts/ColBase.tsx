import styles from "../../styles/ColBase.module.scss";
import Post from "./post";

function ColBase() {
  return (
    <div className={styles.wrapper}>
      <Post />
    </div>
  );
}

export default ColBase;
