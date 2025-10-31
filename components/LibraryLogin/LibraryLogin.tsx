"use client"

import styles from "./LibraryLogin.module.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { openLogin } from "@/slices/uiLoginSlice";


export default function LibraryLogin() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()

    return (
        <>
         <div className={styles["settings__login--wrapper"]}>
            <img src="/assets/login.png" alt="login image" />
            <div className={styles["settings__login--text"]}>
              Log in to your account to see your details.
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