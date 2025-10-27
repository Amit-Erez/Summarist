import styles from "./BookInfoLoad.module.css";

export default function BookInfoLoad() {
  return (
    <>
      <div className={styles.inner__book}>
        <div className={styles["inner__book--title-skl"]}></div>
        <div className={styles["inner__book--author-skl"]}></div>
        <div className={styles["inner__book--sub-title-skl"]}></div>
        <div className={styles["inner__book--wrapper-skl"]}>
          <div className={styles["inner__book--description-wrapper-skl"]}></div>
        </div>
        <div className={styles["inner__book--read-btn-wrapper-skl"]}></div>
        <div className={styles["inner__book--bookmark-skl"]}></div>
        <div className={styles["inner__book--tags-wrapper-skl"]}></div>
        <div className={styles["inner__book--book-description-skl"]}></div>
        <div className={styles["inner__book--author-description-skl"]}></div>
      </div>
      <div className={styles["inner__book--img-wrapper-skl"]}>
        <div className={styles["book__image--wrapper-skl"]}>
          <div className={styles.book__image} />
        </div>
      </div>
    </>
  );
}
