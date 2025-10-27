import styles from "./BookCardLoad.module.css"

export default function BookCardLoad() {
    return (
        <div className={styles["for-you__recommended--books-link"]}>
            <div className={styles["book__img--wrapper"]}>
              <div
                className={styles["book__image--skeleton"]}
              />
            </div>
            <div className={styles["recommended__book--title-skl"]}>
            </div>
            <div className={styles["recommended__book--author-skl"]}>
            </div>
            <div className={styles["recommended__book--sub-title-skl"]}>
            </div>
            <div className={styles["recommended__book--details-wrapper-skl"]}>
              <div></div>
            </div>
          </div>
    )
}