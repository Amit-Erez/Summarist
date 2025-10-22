import styles from "@/components/Sidebar/Sidebar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { TfiMarkerAlt } from "react-icons/tfi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";

export default function Sidebar() {
  return (
    <>
      <div
        className={`${styles.sidebar__overlay} ${styles["sidebar__overlay--hidden"]}`}
      ></div>
      <div className={`${styles.sidebar} ${styles["sidebar--closed"]}`}>
        <div className={styles.sidebar__logo}>
          <img className={styles.nav__img} src="/assets/logo.png" alt="logo" />
        </div>
        <div className={styles.sidebar__wrapper}>
          <div className={styles.sidebar__top}>
            <a className={styles["sidebar__link--wrapper"]} href="/for-you">
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <AiOutlineHome />
              </div>
              <div className={styles["sidebar__link--text"]}>For you</div>
            </a>
            <a className={styles["sidebar__link--wrapper"]} href="/library">
              <div className={styles["sidebar__link--line"]}></div>
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
          </div>
          <div className={styles.sidebar__bottom}>
            <a className={styles["sidebar__link--wrapper"]} href="/settings">
              <div className={styles["sidebar__link--line"]}></div>
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
            <div className={styles["sidebar__link--wrapper"]}>
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <MdLogout />
              </div>
              <div className={styles["sidebar__link--text"]}>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
