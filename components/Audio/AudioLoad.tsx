import styles from "./Audio.module.css";
import { RiReplay10Line, RiForward10Line } from "react-icons/ri";
import { RiPlayLargeFill } from "react-icons/ri";

export default function AudioLoad() {
    return (
        <div className={styles.audio__wrapper}>
      <div className={styles["audio__track--wrapper"]}>
        <figure className={styles["audio__track--image-mask"]}>
          <div className={styles["book__image--wrapper-skl"]}>
            
          </div>
        </figure>
        <div className={styles["audio__track--details-wrapper"]}>
          <div className={styles["audio__track--title-skl"]}></div>
          <div className={styles["audio__track--author-skl"]}></div>
        </div>
      </div>
      <div className={styles["audio__controls--wrapper"]}>
        <div className={styles.audio__controls}>
          <button className={styles["audio__controls--btn"]}>
            <RiReplay10Line />
          </button>
          <button
            className={`${styles["audio__controls--btn"]} ${styles["audio__controls--btn-play"]}`}
          >
            <RiPlayLargeFill />
          </button>
          <button className={styles["audio__controls--btn"]}>
            <RiForward10Line />
          </button>
        </div>
      </div>
      <div className={styles["audio__progress--wrapper"]}>
        <div className={styles.audio__time}>00:00</div>
        <input type="range" className={styles["audio__progress--bar"]}/>
        <div className={styles.audio__time}>00:00</div>
      </div>
    </div>
    )
}