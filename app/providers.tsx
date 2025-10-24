"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { setUser, clearUser } from "@/slices/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/store/store";

function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const stored = localStorage.getItem("guestProfile");
        const guest = stored ? JSON.parse(stored) : null;

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ?? guest?.email ?? null,
            plan: guest?.plan ?? null,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(clearUser())
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}><AuthListener />{children}</Provider>;
}
