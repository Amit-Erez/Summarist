"use client";

import styles from "./BookInfoContent.module.css";
import type { Book } from "@/types/book";
import { bookDurations } from "@/public/bookDurations";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import BookInfoLoad from "./BookInfoLoad";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBook } from "@/slices/bookSlice";
import { openLogin } from "@/slices/uiLoginSlice";
import { saveBook, removeBook } from "@/slices/savedSlice";
import { removeFinished } from "@/slices/finishedSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { formatTime } from "@/utilities/formatTime";

export default function BookInfoContent({ book }: { book: Book }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const { savedBooks } = useSelector((state: RootState) => state.saved);
  const { plan, isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setAdded(savedBooks.some((b) => b.id === book.id));
  }, [savedBooks, book.id]);

  const seconds = bookDurations[book.id];
  const timeFormatted = seconds ? formatTime(seconds) : "00:00";

  function Route() {
    localStorage.setItem("currentBook", JSON.stringify(book));
    dispatch(setCurrentBook(book));

    if (!isLoggedIn) {
      dispatch(openLogin());
      return;
    }

    // 2️⃣ If logged in but still basic → redirect to upgrade
    if (plan === "basic" || !plan) {
      router.push("/choose-plan");
      return;
    }

    // 3️⃣ If premium or premium plus → go to player
    router.push(`/player/${book.id}`);
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  console.log(savedBooks);

  if (loading) return <BookInfoLoad />;

  return (
    <>
      <div className={styles.booktop}>
        <div className={styles["inner__book--img-wrapper"]}>
          <figure className={styles["book__image--wrapper"]}>
            <img
              className={styles.book__image}
              src={book.imageLink}
              alt="book"
            />
            <button
              className={styles.removefinished}
              onClick={() => dispatch(removeFinished(book.id))}
            >
              remove
            </button>
          </figure>
        </div>
      </div>
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
              <div className={styles["inner__book--duration"]}>
                {timeFormatted}
              </div>
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
          <button className={styles["inner__book--read-btn"]} onClick={Route}>
            <div className={styles["inner__book--read-icon"]}>
              <LuBookOpenText />
            </div>
            <div className={styles["inner__book--read-text"]}>Read</div>
          </button>
          <button className={styles["inner__book--read-btn"]} onClick={Route}>
            <div className={styles["inner__book--read-icon"]}>
              <HiOutlineMicrophone />
            </div>
            <div className={styles["inner__book--read-text"]}>Listen</div>
          </button>
        </div>
        {!added ? (
          <div
            className={styles["inner__book--bookmark"]}
            onClick={() => {
              dispatch(saveBook(book)), setAdded(true);
            }}
          >
            <div className={styles["inner__book--bookmark-icon"]}>
              <BsBookmark />
            </div>
            <div className={styles["inner__book--bookmark-text"]}>
              Add title to My Library
            </div>
          </div>
        ) : (
          <div
            className={styles["inner__book--bookmark"]}
            onClick={() => {
              dispatch(removeBook(book.id)), setAdded(false);
            }}
          >
            <div className={styles["inner__book--bookmark-icon"]}>
              <BsBookmarkFill />
            </div>
            <div className={styles["inner__book--bookmark-text"]}>
              Saved in My Library
            </div>
          </div>
        )}
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
      <div className={styles.bookside}>
        <div className={styles["inner__book--img-wrapper"]}>
          <figure className={styles["book__image--wrapper"]}>
            <img
              className={styles.book__image}
              src={book.imageLink}
              alt="book"
            />
            <button
              className={styles.removefinished}
              onClick={() => dispatch(removeFinished(book.id))}
            >
              remove
            </button>
          </figure>
        </div>
      </div>
    </>
  );
}
