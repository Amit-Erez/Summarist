"use client";

import styles from "./Saved.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import BookCard from "../BookCard/BookCard";
import { useState, useEffect } from "react";

export default function Saved() {
  const savedBooks = useSelector((state: RootState) => state.saved.savedBooks);
  const user = useSelector((state: RootState) => state.user);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;


  return (
    <> 
      <div className={styles["for-you__title"]}>Saved Books</div>
      <div className={styles["for-you__sub-title"]}>{savedBooks.length} item{savedBooks.length !== 1 ? "s" : ""}</div>
      <div className={styles["for-you__recommended--books"]}>
        {savedBooks.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </>
  );
}
