import styles from "../Nav/Nav.module.css";
import NavClient from "./NavClient";

export default function Nav() {

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__wrapper}>
        <figure className={styles["nav__img--mask"]}>
          <img className={styles.nav__img} src="/assets/logo.png" alt="logo" />
        </figure>
        <NavClient />
      </div>
    </nav>
  );
}
