"use client";

import styles from "@/components/Sidebar/Sidebar.module.css";
import { usePathname } from "next/navigation";
import SidebarLinks from "./SidebarLinks";
import SidebarFontSize from "./SidebarFontSize";
import SidebarAuth from "./SidebarAuth";
import SidebarExtras from "./SidebarExtras";

export default function Sidebar() {
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return (
    <>
      <div
        className={`${styles.sidebar__overlay} ${styles["sidebar__overlay--hidden"]}`}
      ></div>
      <div className={`${styles.sidebar} ${styles["sidebar--closed"]}`}>
        <div className={styles.sidebar__logo}>
          <img className={styles.nav__img} src="/assets/logo.png" alt="logo" />
        </div>
        <div
          className={`${styles.sidebar__wrapper} ${
            isPlayerPage ? styles.player : null
          }`}
        >
          <div className={styles.sidebar__top}>
            <SidebarLinks />
            {isPlayerPage && <SidebarFontSize />}
          </div>
          <div className={styles.sidebar__bottom}>
            <SidebarExtras activePath={pathname} />
            <SidebarAuth />    
          </div>
        </div>
      </div>
    </>
  );
}
