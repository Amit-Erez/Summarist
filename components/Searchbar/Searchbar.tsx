import styles from "@/components/Searchbar/Searchbar.module.css"
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Searchbar() {
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
                  />
                  <div className={styles.search__icon}>
                    <FaMagnifyingGlass />
                  </div>
                </div>
              </div>
              <div className={styles["sidebar__toggle--btn"]}></div>
            </div>
          </div>
        </div>
    )
}