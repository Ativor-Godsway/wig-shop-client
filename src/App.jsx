import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className=" flex flex-col min-h-screen justify-between">
      <Toaster />
      <Navbar />
      <main className="">
        <ScrollToTop />
        <Outlet />
      </main>
    </main>
  );
};

export default App;
