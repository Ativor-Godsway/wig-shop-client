import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddOrderMutation } from "../redux/OrderApi";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { clearCart } from "../redux/CartSlice";
import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const Checkout = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addOrder] = useAddOrderMutation();
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleModalClose = () => {
    navigate("/");
    dispatch(clearCart());
  };

  const payWithPaystack = (data) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_f5ebc24b7f0fba1265b731363118277b61c3958d", // your public key
      amount: Number(totalPrice.toFixed(2)) * 100, // in kobo
      email: data.email, // customer's email
      onSuccess: async (transaction) => {
        try {
          // 1️⃣ Create the order immediately with "pending"
          const order = {
            name: data.name,
            email: data.email,
            contact: data.contact,
            products: cartItems.map((item) => ({
              product: item._id,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
              image: item.images?.image1.url,
            })),
            totalPrice: Number(totalPrice.toFixed(2)),
            status: "paid", // ✅ pending first
            reference: transaction.reference, // ✅ save Paystack reference
            ...data,
          };

          await addOrder(order).unwrap();

          // 2️⃣ Verify payment with backend
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/paystack/verify/${
              transaction.reference
            }`
          );
          const result = await response.json();

          if (result.status && result.data.status === "success") {
            document.getElementById("my_modal_2").showModal();
          } else {
            toast.error("Payment could not be verified ❌");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error processing order!");
        }
      },

      onCancel: () => {
        toast.warning("Payment cancelled ❌");
      },
    });
  };

  const onSubmit = (data) => {
    if (!deliveryMethod) {
      toast.error("Please choose a delivery method");
      return;
    }
    payWithPaystack(data);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center gap-7 p-3 mt-14">
        <div className="w-full md:w-[50vw]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">Name</label>

              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">Email</label>

              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Contact */}
            <div className="form-control">
              <label className="label">Contact</label>
              <input
                type="tel"
                {...register("contact", { required: "Contact is required" })}
                placeholder="Phone number"
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <span className="text-red-500 text-sm">
                  {errors.contact.message}
                </span>
              )}
            </div>

            {/* Delivery Method */}
            <div className="form-control">
              <label className="label">Delivery Method</label>
              <select
                {...register("deliveryMethod", {
                  required: "Select a delivery method",
                })}
                className=" select w-full"
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="">-- Select Delivery Method --</option>
                <option value="pick-up">Pick Up</option>
                <option value="delivery">Delivery</option>
              </select>
              {errors.deliveryMethod && (
                <span className="text-red-500 text-sm">
                  {errors.deliveryMethod.message}
                </span>
              )}
            </div>

            {deliveryMethod === "delivery" && (
              <fieldset className="border p-3 rounded-lg space-y-4">
                <legend className="label">Delivery Info</legend>
                {/* Location */}
                <div className="form-control">
                  <label className="label">City</label>
                  <input
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="Your Delivery Location"
                    className="input input-bordered w-full"
                  />
                  {errors.location && (
                    <span className="text-red-500 text-sm">
                      {errors.location.message}
                    </span>
                  )}
                </div>

                {/* Country */}
                <div className="form-control">
                  <label className="label">Country</label>
                  <input
                    type="text"
                    defaultValue={"Ghana"}
                    {...register("country", {
                      required: "Country is required",
                    })}
                    placeholder="Your country"
                    className="input input-bordered w-full"
                  />
                  {errors.country && (
                    <span className="text-red-500 text-sm">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <p>
                  NOTE: Your delivery charge would be determined when you
                  product is about to be sent out .
                </p>
              </fieldset>
            )}
            {deliveryMethod === "pick-up" && (
              <div>
                <label>Kindly pick-up your order form our legon branch</label>
              </div>
            )}

            {/* Submit */}
            <button
              className={`btn bg-black text-white hover:bg-[#6d6d6d] rounded-full w-full py-2 my-5 mt-5 text-[1.2rem] `}
            >
              Place Order
            </button>
          </form>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-2xl font-serif flex gap-3 items-center ">
                <IoIosCheckmarkCircle className="text-green-600 size-10" />{" "}
                Order Succesful!
              </h3>
              <p className="py-4">
                Your order has been placed successfully! Our sales
                representative will contact you as soon as your order is ready
                for delivery or you can drop buy anytime to pick it up.
              </p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleModalClose}>close</button>
            </form>
          </dialog>
        </div>
        {/* Summary Section */}
        <div className="border rounded-xl h-fit p-3 w-full md:w-[30vw]">
          <h2 className="text-[1.6rem] md:text-3xl">Summary</h2>
          <p className="flex justify-between items-center my-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Estimated Delivery</span>
            <span className="text-green-600">FREE</span>
          </p>
          <hr />
          <p className="flex justify-between items-center text-2xl font-semibold py-4">
            <span>Total</span>
            <span className="text-2xl font-semibold italic">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <hr />
          <div className="max-h-[50vh] overflow-auto">
            <h3 className="text-2xl font-serif mt-4 ">Orders</h3>
            {cartItems.map((product) => (
              <div key={product._id} className="flex gap-3 my-3">
                <img
                  src={product.images?.image1.url}
                  alt={product.name}
                  className="w-[30%] aspect-square object-cover rounded "
                />
                <div>
                  <p className="text-[#5b5b5b]">Size : {product.size}</p>
                  <p className="text-[#5b5b5b]">
                    Quantity : {product.quantity}
                  </p>
                  <p className="text-[1.1rem] font-serif italic">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <div className="mt-2 text-[#6f6e6e] ">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
