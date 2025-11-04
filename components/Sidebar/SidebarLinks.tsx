"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { TfiMarkerAlt } from "react-icons/tfi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./Sidebar.module.css";

export default function SidebarLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/for-you", label: "For you", icon: <AiOutlineHome /> },
    { href: "/library", label: "My Library", icon: <CiBookmark /> },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={styles["sidebar__link--wrapper"]}
        >
          <div
            className={`${styles["sidebar__link--line"]} ${
              pathname === link.href ? styles["active--tab"] : ""
            }`}
          ></div>
          <div className={styles["sidebar__icon--wrapper"]}>{link.icon}</div>
          <div className={styles["sidebar__link--text"]}>{link.label}</div>
        </Link>
      ))}

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
    </>
  );
}
