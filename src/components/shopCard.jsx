import React from "react";
import { Link } from "react-router-dom";

const ShopCard = ({ category }) => {
  return (
    <div
      className={`flex flex-col justify-end items-start p-4 h-[40vh]  w-full   bg-top text-white rounded-2xl relative  `}
      style={{
        backgroundImage: `url(${category.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="h-[50%] w-full  absolute  bottom-0 left-0 bg-gradient-to-t from-[#000000a1] rounded-2xl   to-transparent"></div>

      <h1 className="text-lg z-10">{category.name}</h1>

      <Link to={`/${category.category}`} className="z-10">
        <button className=" bg-white text-black border border-black px-5 py-0  rounded-full hover:bg-[#c1c1c1] ">
          Shop
        </button>
      </Link>
    </div>
  );
};

export default ShopCard;
