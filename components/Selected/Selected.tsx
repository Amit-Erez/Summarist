import styles from "./Selected.module.css";
import { FaPlayCircle } from "react-icons/fa";
import type { Book } from "@/types/book";

export default async function Selected() {

  const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected");
  const data: Book[] = await res.json()
  const book: Book = data[0];

  return (
    <> 
      <div className={styles["for-you__title"]}>Selected just for you</div>
      <a className={styles.selected__book} href={`/books/${book.id}`}>
        <div className={styles["selected__book--sub-title"]}>
          {book.subTitle}
        </div>
        <div className={styles["selected__book--line"]}></div>
        <div className={styles["selected__book--content"]}>
          <figure className={styles["book__image--wrapper"]}>
            <img
              className={styles.book__image}
              src={book.imageLink}
              alt="book"
            />
          </figure>
          <div className={styles["selected__book--text"]}>
            <div className={styles["selected__book--title"]}>
              {book.title}
            </div>
            <div className={styles["selected__book--author"]}>
              {book.author}
            </div>
            <div className={styles["selected__book--duration-wrapper"]}>
              <div className={styles["selected__book--icon"]}>
                <FaPlayCircle />
              </div>
              <div className={styles["selected__book--duration"]}>
                3 mins 23 secs
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
