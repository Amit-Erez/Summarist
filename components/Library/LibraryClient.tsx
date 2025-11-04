"use client";

import styles from "../../app/(dashboard)/library/library.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Saved from "@/components/Saved/Saved";
import Finished from "@/components/Finished/Finished";
import LibraryLogin from "@/components/Library/LibraryLogin";

export default function Library() {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) return null;

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        {!user.isLoggedIn ? (
          <LibraryLogin />
        ) : (
          <>
            <Saved />
            <Finished />
          </>
        )}
      </div>
    </div>
  );
}
