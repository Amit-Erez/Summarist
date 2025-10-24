"use client"

import Features from "@/components/Features/Features";
import Landing from "@/components/Landing/Landing";
import Nav from "@/components/Nav/Nav";
import Reviews from "@/components/Reviews/Reviews";
import Numbers from "@/components/Numbers/Numbers";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";

export default function Home() {

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.isLoggedIn) {
      router.replace("/for-you")
    }
  },[user.isLoggedIn, router])

  return (
      <>
      <Nav />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
      </>
  );
}
