"use client";

import styles from "./BookCard.module.css";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import type { Book } from "@/types/book";
import { useState, useEffect } from "react";
import BookCardLoad from "./BookCardLoad";
import { bookDurations } from "@/public/bookDurations";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function BookCard({ book }: { book: Book }) {
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const seconds = bookDurations[book.id];
  const timeFormatted = seconds ? formatTime(seconds) : "00:00";

  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return loading ? (
    <BookCardLoad />
  ) : (
    <a
      key={book.id}
      className={styles["for-you__recommended--books-link"]}
      href={`/book/${book.id}`}
    >
      {(book.subscriptionRequired && user.plan === "basic") ||
        (book.subscriptionRequired && !isLoggedIn && (
          <div className={styles["book__pill"]}>Premium</div>
        ))}
      <figure className={styles["book__img--wrapper"]}>
        <img className={styles.book__image} src={book.imageLink} alt="book" />
      </figure>
      <div className={styles["recommended__book--title"]}>{book.title}</div>
      <div className={styles["recommended__book--author"]}>{book.author}</div>
      <div className={styles["recommended__book--sub-title"]}>
        {book.subTitle}
      </div>
      <div className={styles["recommended__book--details-wrapper"]}>
        <div className={styles["recommended__book--details"]}>
          <div className={styles["recommended__book--details-icon"]}>
            <LuClock3 />
          </div>
          <div className={styles["recommended__book--details-text"]}>
            {timeFormatted}
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
  );
}
