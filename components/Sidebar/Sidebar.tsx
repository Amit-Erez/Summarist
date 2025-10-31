"use client";

import styles from "@/components/Sidebar/Sidebar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { TfiMarkerAlt } from "react-icons/tfi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { RootState } from "@/store/store";
import { openLogin } from "@/slices/uiLoginSlice";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { clearUser } from "@/slices/userSlice";
import { resizeSmall, resizeMedium, resizeLarge, resizeXlarge } from "@/slices/fontSizeSlice";
import { useState } from "react";

export default function Sidebar() {
  const [fontActive, setFontActive] = useState<
    "small" | "medium" | "large" | "xlarge"
  >("small");
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleAuthClick = async () => {
    if (user.isLoggedIn) {
      try {
        await signOut(auth);
        dispatch(clearUser());
        console.log("User logged out");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      dispatch(openLogin());
    }
  };

  return (
    <>
      <div
        className={`${styles.sidebar__overlay} ${styles["sidebar__overlay--hidden"]}`}
      ></div>
      <div className={`${styles.sidebar} ${styles["sidebar--closed"]}`}>
        <div className={styles.sidebar__logo}>
          <img className={styles.nav__img} src="/assets/logo.png" alt="logo" />
        </div>
        <div className={`${styles.sidebar__wrapper} ${isPlayerPage ? styles.player : null}`}>
          <div className={styles.sidebar__top}>
            <a className={styles["sidebar__link--wrapper"]} href="/for-you">
              <div
                className={`${styles["sidebar__link--line"]} ${
                  pathname === "/for-you" && styles["active--tab"]
                }`}
              ></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <AiOutlineHome />
              </div>
              <div className={styles["sidebar__link--text"]}>For you</div>
            </a>
            <a className={styles["sidebar__link--wrapper"]} href="/library">
              <div
                className={`${styles["sidebar__link--line"]} ${
                  pathname === "/library" && styles["active--tab"]
                }`}
              ></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <CiBookmark />
              </div>
              <div className={styles["sidebar__link--text"]}>My Library</div>
            </a>
            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <TfiMarkerAlt />
              </div>
              <div className={styles["sidebar__link--text"]}>Highlights</div>
            </div>
            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <FaMagnifyingGlass />
              </div>
              <div className={styles["sidebar__link--text"]}>Search</div>
            </div>
                  { isPlayerPage &&
                  
            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__font--size-wrapper"]}`}
            >
              <div
                className={`${styles["sidebar__link--text"]} ${
                  styles["sidebar__font--size-icon"]
                } ${
                  fontActive === "small" &&
                  styles["sidebar__font--size-icon--active"]
                }`}
                onClick={() => {
                  setFontActive("small");
                  dispatch(resizeSmall())
                }}
              >
                <RiFontSize
                  className={styles["sidebar__font--size-icon-small"]}
                />
              </div>
              <div
                className={`${styles["sidebar__link--text"]} ${
                  styles["sidebar__font--size-icon"]
                } ${
                  fontActive === "medium" &&
                  styles["sidebar__font--size-icon--active"]
                }`}
                onClick={() => {
                  setFontActive("medium");
                  dispatch(resizeMedium())
                }}
              >
                <RiFontSize
                  className={styles["sidebar__font--size-icon-medium"]}
                />
              </div>
              <div
                className={`${styles["sidebar__link--text"]} ${
                  styles["sidebar__font--size-icon"]
                } ${
                  fontActive === "large" &&
                  styles["sidebar__font--size-icon--active"]
                }`}
                onClick={() => {
                  setFontActive("large");
                  dispatch(resizeLarge())
                }}
              >
                <RiFontSize
                  className={styles["sidebar__font--size-icon-large"]}
                />
              </div>
              <div
                className={`${styles["sidebar__link--text"]} ${
                  styles["sidebar__font--size-icon"]
                } ${
                  fontActive === "xlarge" &&
                  styles["sidebar__font--size-icon--active"]
                }`}
                onClick={() => {
                  setFontActive("xlarge");
                  dispatch(resizeXlarge())
                }}
              >
                <RiFontSize
                  className={styles["sidebar__font--size-icon-xlarge"]}
                />
              </div>
            </div>
                  }

          </div>
          <div className={styles.sidebar__bottom}>
            <a className={styles["sidebar__link--wrapper"]} href="/settings">
              <div
                className={`${styles["sidebar__link--line"]} ${
                  pathname === "/settings" && styles["active--tab"]
                }`}
              ></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <CiSettings />
              </div>
              <div className={styles["sidebar__link--text"]}>Settings</div>
            </a>
            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <IoMdHelpCircleOutline />
              </div>
              <div className={styles["sidebar__link--text"]}>
                Help & Support
              </div>
            </div>
            <div className={styles["sidebar__link--wrapper"]}
            onClick={handleAuthClick}>
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <MdLogout />
              </div>
              <div
                className={styles["sidebar__link--text"]}
                
              >
                {user.isLoggedIn ? "Logout" : "Login"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
