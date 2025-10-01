import { TfiTrash } from "react-icons/tfi";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex  justify-between w-full">
        <div>
          <figure className="flex gap-3">
            <img
              src={product?.images.image1.url}
              alt="Thrift Product image"
              className="w-32 aspect-square object-contain object-center rounded "
            />
            <div>
              <p className="text-[#525252]">{product.category}</p>
              <p>
                Size{" : "}
                <span className="underline text-[0.9rem]">{product.size}</span>
              </p>
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
            </div>
          </figure>
          <div className="flex gap-5 py-2 px-4 border rounded-full w-32 items-center justify-center mt-3 ">
            {product.quantity === 1 ? (
              <TfiTrash onClick={() => dispatch(removeFromCart(product._id))} />
            ) : (
              <LuMinus
                onClick={() => dispatch(decreaseQuantity(product._id))}
              />
            )}
            <div>
              <p>{product.quantity}</p>
            </div>
            <LuPlus onClick={() => dispatch(addToCart(product))} />
          </div>
        </div>
        <p className="text-[1.1rem] font-semibold">
          ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
      <hr className="mb-5 mt-2" />
    </div>
  );
};

export default CartItem;
