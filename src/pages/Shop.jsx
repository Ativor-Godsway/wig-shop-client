import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/productsApi";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";

const categories = ["all", "raw", "blend", "frontal", "luxury"];

const Shop = () => {
  const [category, setCategory] = useState("all");
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data || [];

  if (isLoading)
    return (
      <div className="min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 pt-10">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex  flex-col gap-4">
            <div className="skeleton w-[47vw] md:w-[23vw] aspect-square"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        ))}
      </div>
    );

  if (error) return <div>Error loading products</div>;

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div className="border min-h-screen px-1 py-2 pb-10 pt-16 ">
        <div className="flex justify-start gap-5  mb-10 overflow-x-auto ">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`btn px-4 rounded-md border w-auto no-wrap ${
                category === cat ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        {/* <p>Your next favorite piece might be someone else’s if you hesitate.</p> */}
        <div>
          {filteredProducts.length === 0 ? (
            <p>No {category} found. Browser other categories.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
              {filteredProducts.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Shop;
