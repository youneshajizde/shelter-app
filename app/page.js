import About from "@/components/about/About";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Houses from "@/components/houses/Houses";
import Navbar from "@/components/Navbar";
import Products from "@/components/products/Products";
import Testimonials from "@/components/testimonials/Testimonials";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-[90%] mx-auto flex flex-col space-y-16 pt-[30px]">
        <Header />
        <Houses title={"Top-rated big cottages"} />
        <About />
        <Products />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
