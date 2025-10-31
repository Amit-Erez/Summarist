import styles from "./Finished.module.css";
import type { Book } from "@/types/book";
import BookCard from "../BookCard/BookCard";

export default function Finished() {
 

  return (
    <>
      <div className={styles["for-you__title"]}>Finished</div>
      <div className={styles["for-you__sub-title"]}>5 items</div>
      <div className={styles["for-you__recommended--books"]}>
        
      </div>
    </>
  );
}
