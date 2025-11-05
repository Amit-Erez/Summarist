"use client";

import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from "@/slices/uiLoginSlice";
import { handleAuth } from "@/utilities/handleAuth";
import type { RootState } from "@/store/store";
import type { AppDispatch } from "@/store/store";
import {
  signInAnonymously,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [reset, setReset] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.uiLogin.isLoginOpen);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGuestLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;
      await updateProfile(user, { displayName: "Guest User" });

      handleAuth(
        {
          uid: user.uid,
          email: "amit@summarist.com",
          plan: "premium",
        },
        dispatch
      );

      router.push("/for-you");
    } catch (error) {
      console.log("Guest login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isHydrated) return;
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      handleAuth(
        {
          uid: user.uid,
          email: user.email,
          plan: "basic",
        },
        dispatch
      );
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      handleAuth(
        {
          uid: user.uid,
          email: user.email,
          plan: "basic",
        },
        dispatch
      );

      router.push("/for-you");
    } catch (error: any) {
      console.error("Email login failed:", error);
      setError(error.message);
    }
  };

  const handleEmailSignup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      handleAuth(
        {
          uid: user.uid,
          email: user.email,
          plan: "basic",
        },
        dispatch
      );

      router.push("/for-you");
    } catch (error: any) {
      console.error("Signup failed:", error);
      setError(error.message);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      if (!email) {
        setReset(false);
        setError("Please enter your email address.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setReset(true);
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.auth__wrapper}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeLogin());
          setMode("login");
          setReset(false);
        }
      }}
    >
      <div className={styles.auth}>
        {mode === "login" && (
          <>
            <div className={styles.auth__content}>
              <div className={styles.auth__title}>Log in to Summarist</div>
              {error && 
              
              <div className={styles.auth__error}>{error}</div>
              }
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
                onClick={handleGoogleLogin}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={styles["auth__main--input"]}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => handleEmailLogin(email, password)}
                >
                  <span>Login</span>
                </button>
              </form>
            </div>
            <div
              className={styles["auth__forgot--password"]}
              onClick={() => {
                setEmail("");
                setPassword("");
                setMode("forgot");
                setError(null);
              }}
            >
              Forgot your password?
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => {
                setEmail("");
                setPassword("");
                setMode("signup");
                setError(null);
              }}
            >
              Don't have an account?
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
                setError(null);
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
              {reset === true && (
                <div className={styles.auth__success}>
                  Your reset email has been sent!
                </div>
              )}
              {error && 
              
              <div className={styles.auth__error}>{error}</div>
              }
              <form className={styles["auth__main--form"]}>
                <input
                  className={styles["auth__main--input"]}
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => handlePasswordReset(email)}
                >
                  <span>Send reset password link</span>
                </button>
              </form>
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => {
                setEmail("");
                setPassword("");
                setMode("login");
                setReset(false);
                setError(null);
              }}
            >
              Go to login
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
                setReset(false);
                setError(null);
              }}
            >
              <RiCloseLargeFill />
            </div>
          </>
        )}
        {mode === "signup" && (
          <>
            <div className={styles.auth__content}>
              <div className={styles.auth__title}>Sign up to Summarist</div>
              {error && 
              
              <div className={styles.auth__error}>{error}</div>
              }
              <button
                className={`${styles.btn} ${styles["google__btn--wrapper"]}`}
                onClick={handleGoogleLogin}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={styles["auth__main--input"]}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => handleEmailSignup(email, password)}
                >
                  <span>Sign up</span>
                </button>
              </form>
            </div>
            <button
              className={styles["auth__switch--btn"]}
              onClick={() => {
                setEmail("");
                setPassword("");
                setMode("login");
                setError(null);
              }}
            >
              Already have an account?
            </button>
            <div
              className={styles["auth__close--btn"]}
              onClick={() => {
                dispatch(closeLogin());
                setMode("login");
                setError(null);
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
