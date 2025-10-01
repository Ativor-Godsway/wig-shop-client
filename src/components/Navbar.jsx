import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className=" fixed top-0  mt-2 w-[100vw] z-50 bg-white/20 backdrop-blur-md border-b border-white/30 rounded-full"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-serif">Just Admire Me</h1>
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <a href="#services" className="hover:text-pink-500">
              Services
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:text-pink-500">
              Gallery
            </a>
          </li>
          <li>
            <a href="#booking" className="hover:text-pink-500">
              Book
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-pink-500">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex gap-3">
          <Link to={"/cart"}>
            <div className="indicator">
              <CiShoppingCart className="size-7" />
              <span className="badge badge-sm indicator-item bg-black text-white">
                {totalQuantity}
              </span>
            </div>
          </Link>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" border-none  bg-transparent m-1"
            >
              <RxHamburgerMenu className="text-black size-5" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a href="#services" className="hover:text-pink-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-pink-500">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-pink-500">
                  Book
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-pink-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
