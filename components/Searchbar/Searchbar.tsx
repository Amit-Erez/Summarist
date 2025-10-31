"use client";
import styles from "@/components/Searchbar/Searchbar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchBounce } from "@/utilities/searchBounce";
import { Book } from "@/types/book";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = searchBounce(query, 300);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);


  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setHasFetched(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setHasFetched(false);
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedQuery}`
      );
      const data = await res.json();
      setResults(data);
      setHasFetched(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className={styles.search__background}>
      <div className={styles.search__wrapper}>
        <figure></figure>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles["search__input--wrapper"]}>
              <input
                className={styles.search__input}
                placeholder="Search for books"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className={styles.search__icon}>
                <FaMagnifyingGlass />
              </div>
            </div>
          </div>
          <div className={styles["sidebar__toggle--btn"]}></div>
        </div>
        {results.length > 0 && (
          <div className={styles["search__books--wrapper"]}>
            {results.map((book: Book) =>
              loading ? (
                <div className={styles["search__book--skeleton"]}>
                  <div></div>
                </div>
              ) : (
                <>
                  <a
                    key={book.id}
                    className={styles["search__book--link"]}
                    href={`/book/${book.id}`}
                  >
                    <figure className={styles["book__image--wrapper"]}>
                      <img
                        className={styles.book__image}
                        src={book.imageLink}
                        alt=""
                      />
                    </figure>
                    <div>
                      <div className={styles["search__book--title"]}>
                        {book.title}
                      </div>
                      <div className={styles["search__book--author"]}>
                        {book.author}
                      </div>
                      <div className={styles["search__book--duration"]}>
                        <div className={styles["recommended__book--details"]}>
                          <div
                            className={styles["recommnded__book--details-icon"]}
                          >
                            <FaPlayCircle />
                          </div>
                          <div
                            className={styles["recommnded__book--details-text"]}
                          >
                            03:24
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </>
              )
            )}
          </div>
        )}
        {!loading && hasFetched && results.length === 0 && (
          <div className={styles["search__books--wrapper"]}>
            <p>No books found</p>
          </div>
        )}
      </div>
    </div>
  );
}
