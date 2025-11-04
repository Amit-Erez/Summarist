"use client";

import styles from "./Sidebar.module.css";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { openLogin } from "@/slices/uiLoginSlice";
import { clearUser } from "@/slices/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function SidebarAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

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
    <div
      className={styles["sidebar__link--wrapper"]}
      onClick={handleAuthClick}
      role="button"
    >
      <div className={styles["sidebar__link--line"]}></div>
      <div className={styles["sidebar__icon--wrapper"]}>
        <MdLogout />
      </div>
      <div className={styles["sidebar__link--text"]}>
        {user.isLoggedIn ? "Logout" : "Login"}
      </div>
    </div>
  );
}
