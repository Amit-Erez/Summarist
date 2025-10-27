import styles from "./book.module.css";
import { Book } from "@/types/book";
import BookInfoContent from "@/components/BookInfo/BookInfoContent";

export default async function BookInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { cache: "no-store" }
  );
  const book: Book = await res.json();
  console.log(book);

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.inner__wrapper}>
            <BookInfoContent book={book}/>
        </div>
      </div>
    </div>
  );
}
