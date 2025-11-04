"use client";
import styles from "./player.module.css";
import { ImSpinner8 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBook } from "@/slices/bookSlice";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import Audio from "@/components/Audio/Audio";
import AudioLoad from "@/components/Audio/AudioLoad";

export default function Player() {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.book.currentBook);
  const fontSize = useSelector((state: RootState) => state.fontSize.fontSize);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!book) {
      const stored = localStorage.getItem("currentBook");
      if (stored) {
        dispatch(setCurrentBook(JSON.parse(stored)));
      }
    }
  }, [book, dispatch]);

  if (isLoading || !book)
    return (
      <div className={styles.summary__load}>
        <div className={styles["audio__book--spinner"]}>
          <ImSpinner8 />
        </div>
        <AudioLoad />
      </div>
    );

  return (
    <div className={styles.summary}>
      <div className={styles["audio__book--summary"]}>
        <div className={styles["audio__book--summary-title"]}>
          <b>{book?.title}</b>
        </div>
        <div
          className={` ${styles["audio__book--summary-text"]} 
        ${
          (fontSize === "small" && styles.small) ||
          (fontSize === "medium" && styles.medium) ||
          (fontSize === "large" && styles.large) ||
          (fontSize === "xlarge" && styles.xlarge)
        }
        `}
        >
          {book?.summary}
        </div>
      </div>
      <Audio book={book} />
    </div>
  );
}
