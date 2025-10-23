"use client"
import { useDispatch } from "react-redux";
import { openLogin } from "@/slices/uiLoginSlice";
import type { AppDispatch } from "@/store/store";
import styles from "../Nav/Nav.module.css";

export default function Nav() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__wrapper}>
        <figure className={styles["nav__img--mask"]}>
          <img className={styles.nav__img} src="/assets/logo.png" alt="logo" />
        </figure>
        <ul className={styles["nav__list--wrapper"]}>
          <li className={`${styles.nav__list} ${styles["nav__list--login"]}`} 
          onClick={() => dispatch(openLogin())}>
            Login
          </li>
          <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>
            About
          </li>
          <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>
            Contact
          </li>
          <li className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}>
            Help
          </li>
        </ul>
      </div>
    </nav>
  );
}
