import Features from "@/components/Features/Features";
import Landing from "@/components/Landing/Landing";
import Nav from "@/components/Nav/Nav";
import Reviews from "@/components/Reviews/Reviews";
import Numbers from "@/components/Numbers/Numbers";
import Footer from "@/components/Footer/Footer";

export default function Home() {
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
