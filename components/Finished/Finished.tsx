import styles from "./Finished.module.css";
import BookCard from "../BookCard/BookCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Finished() {
  const finishedBooks = useSelector((state: RootState) => state.finished.finishedBooks);

  //  const [mounted, setMounted] = useState(false);
  //   useEffect(() => setMounted(true), []);
  //   if (!mounted) return null;
 

  return (
    <>
      <div className={styles["for-you__title"]}>Finished</div>
      <div className={styles["for-you__sub-title"]}>
        {finishedBooks.length} item{finishedBooks.length !== 1 ? "s" : ""}
      </div>
      <div className={styles["for-you__recommended--books"]}>
        {finishedBooks.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
      </div>
    </>
  );
}
