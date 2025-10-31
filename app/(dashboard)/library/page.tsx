import styles from "./library.module.css";
import Saved from "@/components/Saved/Saved";
import Finished from "@/components/Finished/Finished";

export default function Library() {

  return (
    <div className={styles.row}>
      <div className={styles.container}>
            <Saved />
            <Finished />
      </div>
    </div>
  );
}
