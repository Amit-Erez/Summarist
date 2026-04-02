"use client";
import React from "react";
import styles from "@/components/MobileMenuModal/MobileMenuModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { RiCloseLargeFill } from "react-icons/ri";
import {toggleMobileMenu} from "@/slices/mobileMenuSlice";
import { useRouter } from "next/navigation";
import { openLogin } from "@/slices/uiLoginSlice";
import { clearUser } from "@/slices/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const MobileMenuModal = () => {
    const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isMobileMenuOpen,
  );

  if (!isMobileMenuOpen) return null;

  const routes = [
    { name: "For You", path: "/for-you" },
    { name: "My Library", path: "/library" },
    { name: "Highlights", path: "/highlights", disabled: true },    
    { name: "Settings", path: "/settings" },
    { name: "Help & Support", path: "/help-support", disabled: true },
  ]

  const handleRouteClick = (path: string) => {
      router.push(path);
  };


  const handleAuthClick = async () => {
    if (user.isLoggedIn) {
      try {
        await signOut(auth);
        dispatch(clearUser());
        console.log("User logged out");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      dispatch(openLogin());
    }
  };

  return (
    <div className={styles["menu__modal-wrapper"]}>
      <ul className={styles["menu__modal-list"]}>
        {routes.map((route) => (
          <li
            key={route.name}
            className={`${styles["menu__modal-item"]} ${route.disabled ? styles["noentry"] : ""}`}
            onClick={() => {
              if (!route.disabled) {
                  handleRouteClick(route.path);
                  dispatch(toggleMobileMenu());
              }
            }}
          >
            {route.name}
          </li>
        ))}
        <li
          className={styles["menu__modal-item"]}
          onClick={() => {handleAuthClick();
            dispatch(toggleMobileMenu());
          }}
        >
          {user.isLoggedIn ? "Logout" : "Login"}
        </li>
      </ul>
      <figure
        className={styles["menu__modal-close"]}
        onClick={() => dispatch(toggleMobileMenu())}
      >
        <RiCloseLargeFill />
      </figure>
    </div>
  );
};

export default MobileMenuModal;
