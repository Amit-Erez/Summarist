"use client";

import { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/firebase/firebase";
import { setUser, finishPlanLoading } from "@/slices/userSlice";
import { RootState } from "@/store/store";

export default function useSubscriptionListener() {
  const dispatch = useDispatch();
  const { uid, isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!uid || !isLoggedIn) {
      // if logged out, make sure UI won't hang forever:
      dispatch(setUser({ plan: null }));
      dispatch(finishPlanLoading());
      return;
    }

    const subsRef = collection(db, "customers", uid, "subscriptions");

    const unsubscribe = onSnapshot(subsRef, (snap) => {
      // default assumption, if we find nothing active:
      let detectedPlan: string | null = "basic";

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.status === "active") {
          const nickname = data.items?.[0]?.plan?.nickname?.toLowerCase();
          if (nickname?.includes("plus")) {
            detectedPlan = "premium_plus";
          } else if (nickname?.includes("premium")) {
            detectedPlan = "premium";
          }
        }
      });

      // 1. Update Redux user.plan
      dispatch(setUser({ plan: detectedPlan }));

      // 2. Mark plan as loaded so UI can render without flicker
      dispatch(finishPlanLoading());

      // 3. Sync to localStorage, optional
      const stored = localStorage.getItem("authUser");
      const prev = stored ? JSON.parse(stored) : {};
      localStorage.setItem(
        "authUser",
        JSON.stringify({ ...prev, plan: detectedPlan })
      );
    });

    return () => unsubscribe();
  }, [uid, isLoggedIn, dispatch]);
}
