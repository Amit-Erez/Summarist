import styles from "./Recommended.module.css";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import type { Book } from "@/types/book";


export default async function Recommended() {

  const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    { next: { revalidate: 0 } }
  );
  const books: Book[] = await res.json();
  
  return (
    <>
      <div>
        <div className={styles["for-you__title"]}>Recommended For You</div>
        <div className={styles["for-you__sub--title"]}>
          We think you'll like these
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {books.slice(0, 5).map((book) => 
          <a key={book.id} className={styles["for-you__recommended--books-link"]} href={`/book/${book.id}`}>
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

export function RecommendedSkeleton() {
  return (
    <>
    <div className={styles["for-you__title"]}>Recommended For You</div>
        <div className={styles["for-you__sub--title"]}>
          We think you'll like these
        </div>
    <div className={styles["for-you__recommended--books"]}>
      {new Array(5).fill(0).map((_, index) => 
          <div key={index} className={styles["for-you__recommended--books-link"]}>
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
          )}
    </div>
    </>
  )
}
