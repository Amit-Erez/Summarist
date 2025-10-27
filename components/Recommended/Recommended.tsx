import styles from "./Recommended.module.css";
import type { Book } from "@/types/book";
import BookCard from "../BookCard/BookCard";


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
          <BookCard book={book} key={book.id}/>
          )}
        </div>
      </div>
    </>
  );
}

