import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/details/${product._id}`}>
      <div className="card flex flex-col gap-2 w-[47vw] md:w-[23vw] m-auto border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-1 ">
        <img
          src={product.images?.image1.url}
          alt={product.name}
          className="w-full aspect-square object-cover object-center"
        />
        <div className="pl-1">
          <h3 className="text-[1.2rem] md:text-[1.5rem] font-semibold">
            {product.name}
          </h3>
          <p className="text-[#727272] font-light text-[1rem]">
            {product.description?.length > 20
              ? product.description.slice(0, 50) + "..."
              : product.description}
          </p>

          <p className="font-semibold text-[1.2rem] md:text-[1.4rem] italic">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
