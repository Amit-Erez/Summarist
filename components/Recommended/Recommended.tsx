import styles from "./Recommended.module.css";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import type { Book } from "@/types/book";


export default async function Recommended() {

  const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended");
  const books: Book[] = await res.json()
  
  return (
    <>
      <div>
        <div className={styles["for-you__title"]}>Recommended For You</div>
        <div className={styles["for-you__sub--title"]}>
          We think you'll like these
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {books.slice(0, 5).map((book) => 
          <a key={book.id} className={styles["for-you__recommended--books-link"]} href={`/books/${book.id}`}>
            <figure className={styles["book__img--wrapper"]}>
              <img
                className={styles.book__image}
                src={book.imageLink}
                alt="book"
              />
            </figure>
            <div className={styles["recommended__book--title"]}>
              {book.title}
            </div>
            <div className={styles["recommended__book--author"]}>
              {book.author}
            </div>
            <div className={styles["recommended__book--sub-title"]}>
              {book.subTitle}
            </div>
            <div className={styles["recommended__book--details-wrapper"]}>
              <div className={styles["recommended__book--details"]}>
                <div className={styles["recommended__book--details-icon"]}>
                  <LuClock3 />
                </div>
                <div className={styles["recommended__book--details-text"]}>
                  03:24
                </div>
              </div>
              <div className={styles["recommended__book--details"]}>
                <div className={styles["recommended__book--details-icon"]}>
                  <FaRegStar />
                </div>
                <div className={styles["recommended__book--details-text"]}>
                  {book.averageRating}
                </div>
              </div>
            </div>
          </a>
          )}
        </div>
      </div>
    </>
  );
}
