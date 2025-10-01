import BestSelling from "../components/BestSelling";
import Booking from "../components/Booking";
import Collection from "../components/collection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Shop from "./Shop";

const HomePage = () => {
  return (
    <main>
      <img
        src="/bg.jpeg"
        alt=""
        className="fixed inset-0 -z-10 w-screen h-screen"
      />
      <div className="fixed inset-0 -z-10 w-screen h-screen bg-[#0000007e]"></div>
      <Hero />
      <Collection />
      <Services />
      <Booking />
      <Footer />
    </main>
  );
};

export default HomePage;
