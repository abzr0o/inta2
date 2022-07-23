import styles from "../styles/ColBase.module.scss";
function CenterLayout({ children }: any) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default CenterLayout;
