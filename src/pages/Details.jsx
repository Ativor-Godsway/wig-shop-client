import { Link, useNavigate, useParams } from "react-router-dom";
import { products, useGetProductQuery } from "../redux/productsApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import toast from "react-hot-toast";

const Details = () => {
  const [size, setSize] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const { id } = useParams();
  const { data } = useGetProductQuery(id);
  const product = data ? data : {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sizes = product?.sizes
    ? product.sizes.split("/").map((size) => size.trim())
    : [];

  const handleAddToCart = (product) => {
    if (sizes.length !== 0 && size === 0) {
      return setSizeError(true);
    }
    setSizeError(false);
    const item = { ...product, size: size };
    dispatch(addToCart(item));
    toast.success("Added");
  };

  const handleBuyNow = (product) => {
    if (sizes.length !== 0 && size === 0) {
      return setSizeError(true);
    }
    setSizeError(false);
    const item = { ...product, size: size };
    dispatch(addToCart(item));
    toast.success("Added");
    navigate("/cart");
  };

  //Image
  const [image, setImage] = useState("image1");

  return (
    <div className="flex flex-col md:flex-row mt-16 justify-center gap-5 p-2 pb-10">
      <img
        src={product?.images?.[image].url}
        alt={product.name}
        className="w-full md:w-[45vw] aspect-square object-contain object-center"
      />
      <div className=" p-5 md:p-10 w-full md:w-[40vw]">
        <p className="text-[#6f6e6e] ">{product.category}</p>
        <div className="flex gap-2">
          <img
            src={product?.images?.image1.url}
            alt=""
            className={`max-w-20 aspect-square object-cover object-center rounded-xl ${
              image === "image1" && " border-[red] border-2 "
            } `}
            onClick={() => setImage("image1")}
          />
          <img
            src={product?.images?.image2.url}
            alt=""
            className={`max-w-20 aspect-square object-cover object-center rounded-xl ${
              image === "image2" && " border-[red] border-2 "
            } `}
            onClick={() => setImage("image2")}
          />
          <img
            src={product?.images?.image3.url}
            alt=""
            className={`max-w-20 aspect-square object-cover object-center rounded-xl ${
              image === "image3" && " border-[red] border-2 "
            } `}
            onClick={() => setImage("image3")}
          />
        </div>
        <p className="text-3xl mt-4">${product.price}</p>
        <div>
          {sizes.length === 0 ? (
            ""
          ) : (
            <div className="mt-5">
              {sizeError && (
                <p className="text-[red]">Select your preferred size</p>
              )}
              <h3 className=" text-[1.2rem]">Select Size:</h3>
              <div className="grid grid-cols-2 mt-2 ">
                {sizes.map((sizeOption) => (
                  <button
                    disabled={product.category === "accessories"}
                    key={sizeOption}
                    className={`border  px-4 py-2 m-1 rounded hover:bg-gray-200 ${
                      size === sizeOption
                        ? "border-black border-2"
                        : "border-gray-400"
                    }  ${
                      product.category === "accessories"
                        ? "border-gray-400 text-gray-400 cursor-not-allowed "
                        : ""
                    }`}
                    onClick={() => setSize(sizeOption)}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 text-[#6f6e6e] self-end">
          {product.pickupLocation === "East Legon Outlet" ? (
            <a
              href={"https://maps.app.goo.gl/WVGcFetSUwTX6WZ79"}
              target="_blank"
            >
              <p>Pick-up: {product.pickupLocation}</p>
            </a>
          ) : (
            <a
              href={"https://maps.app.goo.gl/iZ8fLa1JEHTYGmxF7"}
              target="_blank"
            >
              <p>Pick-up: {product.pickupLocation}</p>
            </a>
          )}
          <p>Delivery : Worldwide</p>
        </div>
        <div className="mt-2">
          <button
            className="btn bg-black text-white text-[1.2rem] w-full py-2 hover:bg-[#373737] hover:shadow-lg rounded-full"
            onClick={() => handleAddToCart(product)}
          >
            Add To Cart
          </button>

          <button
            className="btn mt-4 bg-white text-black border border-[#707070] text-[1.2rem] hover:shadow-lg  w-full py-2 hover:border-[black] rounded-full"
            onClick={() => handleBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
