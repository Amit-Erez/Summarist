"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import {
  resizeSmall,
  resizeMedium,
  resizeLarge,
  resizeXlarge,
} from "@/slices/fontSizeSlice";
import { RiFontSize } from "react-icons/ri";
import styles from "./Sidebar.module.css";

export default function SidebarFontSize() {
  const dispatch = useDispatch<AppDispatch>();
  const fontActive = useSelector((state: RootState) => state.fontSize.fontSize);

  const buttons = [
    { size: "small", action: resizeSmall, className: styles["sidebar__font--size-icon-small"] },
    { size: "medium", action: resizeMedium, className: styles["sidebar__font--size-icon-medium"] },
    { size: "large", action: resizeLarge, className: styles["sidebar__font--size-icon-large"] },
    { size: "xlarge", action: resizeXlarge, className: styles["sidebar__font--size-icon-xlarge"] },
  ] as const;

  return (
    <div
      className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__font--size-wrapper"]}`}
    >
      {buttons.map((btn) => (
        <div
          key={btn.size}
          className={`${styles["sidebar__link--text"]} ${styles["sidebar__font--size-icon"]} ${
            fontActive === btn.size ? styles["sidebar__font--size-icon--active"] : ""
          }`}
          onClick={() => dispatch(btn.action())}
        >
          <RiFontSize className={btn.className} />
        </div>
      ))}
    </div>
  );
}





