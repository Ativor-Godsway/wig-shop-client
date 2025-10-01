import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero px-3 h-screen flex flex-col  items-center justify-end pb-14 md:pb-20 text-white bg-cover  bg-center bg-[url('/banner2.jpg')] lg:bg-[url('/banner4.jpg')] relative"
      style={{
        backgroundImage: `url(banner.jpeg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <div className="h-[50%] w-full absolute  bottom-0 left-0 bg-gradient-to-t from-[#000000bf]  to-transparent"></div>
      <h1 className="text-5xl z-10 font-serif mb-2 ">Just Admire Me</h1>
      <p className="text-center text-[#d1d1d1] text-lg md:text-2xl z-10">
        Confidence starts with the perfect crown.
      </p>
      <Link to={"/shop"} className="z-10 mb-10">
        <button className="btn bg-white text-[1.2rem] text-black border border-black px-5 py-1 mt-5 rounded-full hover:bg-[#c1c1c1] ">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default Hero;
