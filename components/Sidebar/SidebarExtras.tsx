"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";


export default function SidebarExtras({ activePath }: { activePath: string }) {
  return (
    <div>
      <Link
        href="/settings"
        className={styles["sidebar__link--wrapper"]}
      >
        <div
          className={`${styles["sidebar__link--line"]} ${
            activePath === "/settings" ? styles["active--tab"] : ""
          }`}
        ></div>
        <div className={styles["sidebar__icon--wrapper"]}>
          <CiSettings />
        </div>
        <div className={styles["sidebar__link--text"]}>Settings</div>
      </Link>

      <div
        className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
      >
        <div className={styles["sidebar__link--line"]}></div>
        <div className={styles["sidebar__icon--wrapper"]}>
          <IoMdHelpCircleOutline />
        </div>
        <div className={styles["sidebar__link--text"]}>Help & Support</div>
      </div>
    </div>
  );
}
