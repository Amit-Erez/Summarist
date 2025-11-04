"use client";
import { useDispatch } from "react-redux";
import { openLogin } from "@/slices/uiLoginSlice";
import type { AppDispatch } from "@/store/store";
import styles from "@/components/Landing/Landing.module.css";

export default function LandingButton() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      className={`${styles.btn} ${styles["home__cta--btn"]}`}
      onClick={() => dispatch(openLogin())}
    >
      Login
    </button>
  );
}
