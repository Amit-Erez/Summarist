"use client"

import styles from "./LibraryLogin.module.css"
import { useDispatch } from "react-redux"
import { openLogin } from "@/slices/uiLoginSlice";


export default function LibraryLogin() {
    const dispatch = useDispatch()

    return (
        <>
         <div className={styles["settings__login--wrapper"]}>
            <img src="/assets/login.png" alt="login image" />
            <div className={styles["settings__login--text"]}>
              Log in to your account to see your library.
            </div>
            <button
              className={`${styles.btn} ${styles["settings__login--btn"]}`}
              onClick={() => dispatch(openLogin())}
            >
              Login
            </button>
          </div>
        </>
    )
}