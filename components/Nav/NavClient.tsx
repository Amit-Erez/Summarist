"use client";
import { useDispatch } from "react-redux";
import { openLogin } from "@/slices/uiLoginSlice";
import type { AppDispatch } from "@/store/store";
import styles from "../Nav/Nav.module.css";

export default function NavClient() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul className={styles["nav__list--wrapper"]}>
      <li
        className={`${styles.nav__list} ${styles["nav__list--login"]}`}
        onClick={() => dispatch(openLogin())}
      >
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
  );
}
