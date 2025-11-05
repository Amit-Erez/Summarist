"use client";
import styles from "./settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { openLogin } from "@/slices/uiLoginSlice";
import { useEffect, useState } from "react";

export default function Settings() {
  
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);
  if (!isHydrated) return null; 


  if (user.isLoading) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={`${styles.section__title} ${styles.page__title}`}>
              Settings
            </div>
            <div className={styles["setting__content"]}>
              <div className={styles["settings__sub--title-skeleton"]}></div>
            </div>
            <div className={styles["setting__content"]}>
              <div className={styles["settings__sub--title-skeleton"]}></div>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.section__title} ${styles.page__title}`}>
          Settings
        </div>
        {user.isLoggedIn ? (
          <>
            <div className={styles["setting__content"]}>
              <div className={styles["settings__sub--title"]}>
                Your Subscription plan
              </div>
              <div className={styles.settings__text}>
                {user.isPlanLoading
                  ? ""
                  : user.plan
                  ? user.plan.replace("_", " ")
                  : "basic"}
              </div>
              {user.plan === "basic" && (
                <a
                  className={`${styles.btn} ${styles["settings__upgrade--btn"]}`}
                  href="/choose-plan"
                >
                  Upgrade to Premium
                </a>
              )}
              {user.plan === "premium" && (
                <a
                  className={`${styles.btn} ${styles["settings__upgrade--btn-pp"]}`}
                  href="/choose-plan"
                >
                  Upgrade to Premium Plus
                </a>
              )}
              {user.plan === "premium plus" && null}
            </div>
            <div className={styles["setting__content"]}>
              <div className={styles["settings__sub--title"]}>Email</div>
              <div className={styles.settings__text}>{user.email}</div>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
}
