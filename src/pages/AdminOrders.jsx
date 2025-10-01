import React from "react";
import { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/OrderApi";
import toast from "react-hot-toast";
import { TfiTrash } from "react-icons/tfi";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const categories = ["all", "pick-up", "delivery"];

const AdminOrders = () => {
  const [expanded, setExpanded] = useState(null);
  const [category, setCategory] = useState("all");

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const { data, error } = useGetOrdersQuery();
  const orders = data ? data : [];

  const filteredOrders =
    category === "all"
      ? orders
      : orders.filter((order) => order.deliveryMethod === category);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleDelete = async (id) => {
    try {
      deleteOrder(id);
      toast.success("Deleted Product");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting order.");
    }
  };

  return (
    <div className="overflow-x-auto  md:mx-3 w-full">
      <h2 className="text-3xl font-serif font-semibold mb-5">Orders</h2>
      <div className="flex justify-start gap-5  ml-2 mb-10 overflow-x-auto ">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn px-4 rounded-md border w-auto no-wrap ${
              category === cat ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {filteredOrders.length === 0 ? (
        <div className="w-[100vw] md:w-[74vw] flex-col h-[90vh] flex items-center justify-center ">
          <CiNoWaitingSign size={70} />
          <p className="text-3xl">No Orders Yet</p>
        </div>
      ) : (
        <table className="table w-[100vw] md:w-full border">
          {/* Table Head */}
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Products</th>
              <th>Total Price</th>
              <th className="hidden md:flex">Contact</th>
              <th className="hidden md:table-cell">Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredOrders.map((order, index) => (
              <React.Fragment key={index}>
                {/* Summary Row */}
                <tr className="">
                  <td className="align-top">
                    <div className="flex flex-col md:flex-row gap-1">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-success"
                        checked={order.status === "completed"}
                        onChange={() =>
                          updateOrderStatus({
                            id: order._id,
                            status:
                              order.status === "paid" ? "completed" : "paid",
                          })
                        }
                      />
                      <strong>{order.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="grid ">
                      {order.products.map((p, i) => (
                        <div
                          key={i}
                          className="border-2 border-black rounded-lg p-1 m-1 w-fit"
                        >
                          <img
                            src={`${p.image}`}
                            alt="product image"
                            className="w-10 h-10 rounded object-cover inline-block mr-2"
                          />{" "}
                          <span className="text-[black] underline ">
                            S:{p.size}
                          </span>{" "}
                          × <span>{p.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="align-top">${order.totalPrice}</td>
                  <td className="hidden md:flex">{order.contact}</td>
                  <td className="align-top hidden md:table-cell">
                    <span
                      className={`badge ${
                        order.status === "paid"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="align-top">
                    <div className="flex gap-2 items-center">
                      <TfiTrash
                        size={20}
                        onClick={() => handleDelete(order._id)}
                        className="md:block hidden"
                      />
                      <button className="" onClick={() => toggleExpand(index)}>
                        {expanded === index ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expanded === index && (
                  <tr>
                    <td colSpan="5" className="  p-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(order.createdAt).toLocaleString("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.email}
                        </p>
                        <p>
                          <strong>Delivery Method:</strong>{" "}
                          {order.deliveryMethod}
                        </p>
                        {order.deliveryMethod === "delivery" && (
                          <p>
                            <strong>Location:</strong> {order.location}
                          </p>
                        )}
                        {order.deliveryMethod === "delivery" && (
                          <p>
                            <strong>Country:</strong> {order.country}
                          </p>
                        )}

                        <p className="block md:hidden">
                          <strong>Contact:</strong> {order.contact}
                        </p>

                        <p className="block md:hidden">
                          <strong>Status:</strong>{" "}
                          <span
                            className={`badge ${
                              order.status === "pending"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                        <TfiTrash
                          size={30}
                          onClick={() => handleDelete(order._id)}
                          className="block md:hidden"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
