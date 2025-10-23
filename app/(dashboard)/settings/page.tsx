"use client"
import styles from "./settings.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { openLogin } from "@/slices/uiLoginSlice";

export default function Settings() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={`${styles.section__title} ${styles.page__title}`}>Settings</div>
                <div className={styles["settings__login--wrapper"]}>
                    <img src="/assets/login.png" alt="login image" />
                <div className={styles["settings__login--text"]}>Log in to your account to see your details.</div>
                <button className={`${styles.btn} ${styles["settings__login--btn"]}`}
                onClick={() => dispatch(openLogin())}>Login</button>
                </div>
            </div>
        </div>
    )
}