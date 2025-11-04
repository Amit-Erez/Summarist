import styles from "./Finished.module.css";
import BookCard from "../BookCard/BookCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Finished() {
  const finishedBooks = useSelector(
    (state: RootState) => state.finished.finishedBooks
  );

  return (
    <>
      <div className={styles["for-you__title"]}>Finished</div>
      <div className={styles["for-you__sub-title"]}>
        {finishedBooks.length} item{finishedBooks.length !== 1 ? "s" : ""}
      </div>
      {finishedBooks.length === 0 ? (
        <div className={styles["finished__books--block-wrapper"]}>
          <div className={styles["finished__books--title"]}>
            Done and dusted!
          </div>
          <div className={styles["finished__books--sub-title"]}>
            When you finish a book, you can find it here later.
          </div>
        </div>
      ) : (
        <div className={styles["for-you__recommended--books"]}>
          {finishedBooks.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </>
  );
}
