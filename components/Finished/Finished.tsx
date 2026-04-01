import styles from "./Finished.module.css";
import BookCard from "../BookCard/BookCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect, useRef } from "react";

export default function Finished() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const finishedBooks = useSelector(
    (state: RootState) => state.finished.finishedBooks
  );

    useEffect(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;
  
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        gallery.scrollLeft += event.deltaY * 0.5;
      };
  
      gallery.addEventListener("wheel", handleWheel, { passive: false });
  
      return () => {
        gallery.removeEventListener("wheel", handleWheel);
      };
    }, [finishedBooks.length]);

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
        <div className={styles["for-you__finished--books"] } ref={galleryRef}>
          {finishedBooks.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </>
  );
}
