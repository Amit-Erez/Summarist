"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { setUser, clearUser, finishLoading } from "@/slices/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/store/store";


function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const stored = localStorage.getItem("authUser");
        const storedUser = stored ? JSON.parse(stored) : null;

        dispatch(
          setUser({
            uid: user.uid,
            email: storedUser.email ?? user?.email ?? null,
            plan: storedUser?.plan ?? null,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    const timeout = setTimeout(() => dispatch(finishLoading()), 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      {children}
    </Provider>
  );
}
