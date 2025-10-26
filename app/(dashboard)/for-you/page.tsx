import styles from "@/app/(dashboard)/for-you/foryou.module.css";
import Recommended, {
  RecommendedSkeleton,
} from "@/components/Recommended/Recommended";
import Selected, { SelectedSkeleton } from "@/components/Selected/Selected";
import Suggested, { SuggestedSkeleton } from "@/components/Suggested/Suggested";
import { Suspense } from "react";

export default function Foryou() {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles["for-you__wrapper"]}>
            <Suspense fallback={<SelectedSkeleton />}>
              <Selected />
            </Suspense>
            <Suspense fallback={<RecommendedSkeleton />}>
              <Recommended />
            </Suspense>
            <Suspense fallback={<SuggestedSkeleton />}>
              <Suggested />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
