"use client"

import styles from "@/components/Landing/Landing.module.css";
import { useDispatch } from "react-redux";
import { openLogin } from "@/slices/uiLoginSlice";
import type { AppDispatch } from "@/store/store";

export default function Landing() {

  const dispatch = useDispatch<AppDispatch>();

  return (
    <section id="landing">
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.landing__wrapper}>
            <div className={styles.landing__content}>
              <div className={styles.landing__content__title}>
                Gain more knowledge <br className={styles["remove--tablet"]} />
                in less time
              </div>
              <div className={styles.landing__content__subtitle}>
                Great summaries for busy people,&nbsp;
                <br className={styles["remove--tablet"]} />
                individuals who barely have time to read,&nbsp;
                <br className={styles["remove--tablet"]} />
                and even people who don’t like to read.
              </div>
              <button className={`${styles.btn} ${styles["home__cta--btn"]}`}
              onClick={() => dispatch(openLogin())}>
                Login
              </button>
            </div>
            <figure className={styles["landing__image--mask"]}>
              <img src="/assets/landing.png" alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
