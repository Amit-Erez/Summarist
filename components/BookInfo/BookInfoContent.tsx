"use client";

import styles from "./BookInfoContent.module.css";
import type { Book } from "@/types/book";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";
import BookInfoLoad from "./BookInfoLoad";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBook } from "@/slices/bookSlice";
import type { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function BookInfoContent({ book }: { book: Book }) {
  const [loading, setLoading] = useState(true);

  const isPlan = useSelector((state: RootState) => state.user.plan);
  const router = useRouter();
  const dispatch = useDispatch();

  function Route() {
    localStorage.setItem("currentBook", JSON.stringify(book));
    dispatch(setCurrentBook(book));

    if (isPlan === "premium") {
      router.replace(`/player/${book.id}`);
    } else {
      router.replace("/choose-plan");
    }
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  return loading ? (
    <BookInfoLoad />
  ) : (
    <>
      <div className={styles.inner__book}>
        <div className={styles["inner__book--title"]}>{book.title}</div>
        <div className={styles["inner__book--author"]}>{book.author}</div>
        <div className={styles["inner__book--sub-title"]}>{book.subTitle}</div>
        <div className={styles["inner__book--wrapper"]}>
          <div className={styles["inner__book--description-wrapper"]}>
            <div className={styles["inner__book--description"]}>
              <div className={styles["inner__book--icon"]}>
                <FaRegStar />
              </div>
              <div className={styles["inner__book--overall-rating"]}>
                {book.averageRating}
              </div>
              <div className={styles["inner__book--total-rating"]}>
                &nbsp;({book.totalRating} ratings)
              </div>
            </div>
            <div className={styles["inner__book--description"]}>
              <div className={styles["inner__book--icon"]}>
                <LuClock3 />
              </div>
              <div className={styles["inner__book--duration"]}>03:24</div>
            </div>
            <div className={styles["inner__book--description"]}>
              <div className={styles["inner__book--icon"]}>
                <HiOutlineMicrophone />
              </div>
              <div className={styles["inner__book--type"]}>{book.type}</div>
            </div>
            <div className={styles["inner__book--description"]}>
              <div className={styles["inner__book--icon"]}>
                <HiOutlineLightBulb />
              </div>
              <div className={styles["inner__book--key-ideas"]}>
                {book.keyIdeas}&nbsp;Key ideas
              </div>
            </div>
          </div>
        </div>
        <div className={styles["inner__book--read-btn-wrapper"]}>
          <button className={styles["inner__book--read-btn"]}>
            <div className={styles["inner__book--read-icon"]}>
              <LuBookOpenText />
            </div>
            <div className={styles["inner__book--read-text"]} onClick={Route}>
              Read
            </div>
          </button>
          <button className={styles["inner__book--read-btn"]}>
            <div className={styles["inner__book--read-icon"]}>
              <HiOutlineMicrophone />
            </div>
            <div className={styles["inner__book--read-text"]} onClick={Route}>
              Listen
            </div>
          </button>
        </div>
        <div className={styles["inner__book--bookmark"]}>
          <div className={styles["inner__book--bookmark-icon"]}>
            <BsBookmark />
          </div>
          <div className={styles["inner__book--bookmark-text"]}>
            Add title to My Library
          </div>
        </div>
        <div className={styles["inner__book--secondary-title"]}>
          What's it about?
        </div>
        <div className={styles["inner__book--tags-wrapper"]}>
          <div className={styles["inner__book--tag"]}>{book.tags[0]}</div>
          {book.tags[1] && (
            <div className={styles["inner__book--tag"]}>{book.tags[1]}</div>
          )}
        </div>
        <div className={styles["inner__book--book-description"]}>
          {book.bookDescription}
        </div>
        <div className={styles["inner__book--secondary-title"]}>
          About the author
        </div>
        <div className={styles["inner__book--author-description"]}>
          {book.authorDescription}
        </div>
      </div>
      <div className={styles["inner__book--img-wrapper"]}>
        <figure className={styles["book__image--wrapper"]}>
          <img className={styles.book__image} src={book.imageLink} alt="book" />
        </figure>
      </div>
    </>
  );
}
