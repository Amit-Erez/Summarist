"use client";

import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeLogin } from "@/slices/uiLoginSlice";
import { useState } from "react";
import type { RootState } from "@/store/store";
import type { AppDispatch } from "@/store/store";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { setUser } from "@/slices/userSlice";
import {store} from "@/store/store"
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.uiLogin.isLoginOpen);
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const router = useRouter();

  const handleGuestLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;
      await updateProfile(user, { displayName: "Guest User" });
      const fakeEmail = "amit@summarist.com";

      dispatch(
        setUser({
          uid: user.uid,
          email: fakeEmail,
          plan: "premium",
          isLoggedIn: true,
        })
      );

      localStorage.setItem("guestProfile", JSON.stringify(user));
      console.log("Guest user signed in:", store.getState().user);
      dispatch(closeLogin());
      router.push("/for-you")
    } catch (error) {
      console.log("Guest login failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.auth__wrapper}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeLogin());
          setMode("login");
        }
      }}
    >
      <div className={styles.auth}>
        {mode === "login" && (
          <>
            <div className={styles.auth__content}>
              <div className={styles.auth__title}>Log in to Summarist</div>
              <button
                className={`${styles.btn} ${styles["guest__btn--wrapper"]}`}
                onClick={handleGuestLogin}
              >
                <figure
                  className={`${styles["google__icon--mask"]} ${styles["guest__icon--mask"]}`}
                >
                  <FaUser />
                </figure>
                <div>Login as a guest</div>
              </button>
              <div className={styles.auth__separator}>
                <span className={styles["auth__separator--text"]}>or</span>
              </div>
              <button
                className={`${styles.btn} ${styles["google__btn--wrapper"]}`}
              >
                <figure className={styles["google__icon--mask"]}>
                  <img src="/assets/google.png" alt="google icon" />
                </figure>
                <div>Login with Google</div>
              </button>
              <div className={styles.auth__separator}>
                <span className={styles["auth__separator--text"]}>or</span>
              </div>
              <form
                action=""
                className={`${styles["auth__main--form"]} ${styles["AVAST_PAM_loginform"]}}`}
              >
                <input
                  className={styles["auth__main--input"]}
                  type="email"
                  placeholder="Email Address"
                />
                <input
                  className={styles["auth__main--input"]}
                  type="password"
                  placeholder="Password"
                />
                <button className={styles.btn}>
                  <span>Login</span>
                </button>
              </form>
            </div>
            <div
              className={styles["auth__forgot--password"]}
              onClick={() => setMode("forgot")}
            >
              Forgot your password?
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => setMode("signup")}
            >
              Don't have an account?
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
              }}
            >
              <RiCloseLargeFill />
            </div>
          </>
        )}
        {mode === "forgot" && (
          <>
            <div className={styles.auth__content}>
              <div className={styles.auth__title}>Reset your password</div>
              <form className={styles["auth__main--form"]}>
                <input
                  className={styles["auth__main--input"]}
                  type="email"
                  placeholder="Email address"
                />
                <button className={styles.btn}>
                  <span>Send reset password link</span>
                </button>
              </form>
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => setMode("login")}
            >
              Go to login
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
              }}
            >
              <RiCloseLargeFill />
            </div>
          </>
        )}
        {mode === "signup" && (
          <>
            <div className={styles.auth__content}>
              <div className={styles.auth__title}>Log in to Summarist</div>
              <button
                className={`${styles.btn} ${styles["google__btn--wrapper"]}`}
              >
                <figure className={styles["google__icon--mask"]}>
                  <img src="/assets/google.png" alt="google icon" />
                </figure>
                <div>Sign up with Google</div>
              </button>
              <div className={styles.auth__separator}>
                <span className={styles["auth__separator--text"]}>or</span>
              </div>
              <form
                action=""
                className={`${styles["auth__main--form"]} ${styles["AVAST_PAM_loginform"]}}`}
              >
                <input
                  className={styles["auth__main--input"]}
                  type="email"
                  placeholder="Email Address"
                />
                <input
                  className={styles["auth__main--input"]}
                  type="password"
                  placeholder="Password"
                />
                <button className={styles.btn}>
                  <span>Sign up</span>
                </button>
              </form>
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => setMode("login")}
            >
              Already have an account?
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
              }}
            >
              <RiCloseLargeFill />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
