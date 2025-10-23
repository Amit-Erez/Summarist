import styles from "@/app/(dashboard)/for-you/foryou.module.css"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { TfiMarkerAlt } from "react-icons/tfi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";


export default function Foryou() {
  return (
    <>
      <div className={styles.row}>
        <h1>For you</h1>
      </div>
    </>
  );
}
