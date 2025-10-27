"use client";

import styles from "./BookCard.module.css";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import type { Book } from "@/types/book";
import { useState, useEffect } from "react";
import BookCardLoad from "./BookCardLoad";

export default function BookCard({ book }: { book: Book }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  return loading ? (
    <BookCardLoad />
  ) : (
    <a
      key={book.id}
      className={styles["for-you__recommended--books-link"]}
      href={`/book/${book.id}`}
    >
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
          <div className={styles["recommended__book--details-text"]}>03:24</div>
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
