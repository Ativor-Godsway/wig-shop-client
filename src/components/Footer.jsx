import { IoLogoInstagram } from "react-icons/io";
import { BiLogoTiktok } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white flex flex-col items-center gap-3 md:flex-row w-[100vw] justify-between text-[black]  p-4">
      <div className="flex items-center justify-center gap-3">
        <p>+233 241181076</p>
      </div>
      <p>© 2024 Just Admire Me. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
