import styles from "@/app/(dashboard)/for-you/foryou.module.css";
import Recommended from "@/components/Recommended/Recommended";
import Selected from "@/components/Selected/Selected";
import Suggested from "@/components/Suggested/Suggested";



export default function Foryou() {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles["for-you__wrapper"]}>
            <Selected />
            <Recommended />
            <Suggested />
          </div>
        </div>
      </div>
    </>
  );
}
