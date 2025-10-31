"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { setUser, clearUser, finishLoading } from "@/slices/userSlice";
import { useEffect, useRef } from "react";
import { AppDispatch } from "@/store/store";
import useSubscriptionListener from "@/utilities/useSubscriptionListener";

function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();
  const hasPreloaded = useRef(false); // track if we loaded from localStorage

  useEffect(() => {
    // 1️⃣ Try to preload user from localStorage immediately
    const stored = localStorage.getItem("authUser");
    const storedUser = stored ? JSON.parse(stored) : null;

    if (storedUser) {
      hasPreloaded.current = true;
      dispatch(
        setUser({
          uid: storedUser.uid,
          email: storedUser.email,
          plan: storedUser.plan,
          isLoggedIn: true,
        })
      );
    }

    // 2️⃣ Firebase listener for real auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && hasPreloaded.current) {
        // ⛔ User just logged out — remove stale data
        localStorage.removeItem("authUser");
        hasPreloaded.current = false;
        dispatch(clearUser());
        dispatch(finishLoading());
        return;
      }

      if (user) {
        // ✅ Logged in
        dispatch(
          setUser({
            uid: user.uid,
            email: storedUser?.email || user.email || "guest@summarist.com",
            plan: storedUser?.plan ?? null,
            isLoggedIn: true,
          })
        );

        // Sync latest info into localStorage
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            plan: storedUser?.plan ?? null,
          })
        );
      } else {
        // 🧹 Full logout
        localStorage.removeItem("authUser");
        dispatch(clearUser());
      }

      // ✅ Mark auth as finished loading
      dispatch(finishLoading());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

function SubscriptionListener() {
  useSubscriptionListener();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <SubscriptionListener />
      {children}
    </Provider>
  );
}
